package handler

import (
	"github.com/kpotier/loginregister/pkg/locale"
	"github.com/kpotier/loginregister/pkg/pb"
	"github.com/kpotier/loginregister/pkg/smtp"
	"github.com/kpotier/loginregister/pkg/store"
	"github.com/kpotier/loginregister/pkg/token"
	"context"
	"crypto/sha1"
	"errors"
	"fmt"
	"time"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/genproto/googleapis/rpc/errdetails"

	"golang.org/x/crypto/pbkdf2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/peer"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// authSecureDuration is the duration of each sensitive function. If it is too
// low, timing attacks may happen. If it is too high, the user may be annoyed.
var authSecureDuration = 150 * time.Millisecond

// AuthServer is the server API for Auth service.
type AuthServer struct {
	pb.UnimplementedAuthServer

	us   store.UserStore
	cs   store.ConfigStore
	smtp *smtp.SMTP

	token token.Token
}

// NewAuthServer returns an instance of AuthServer.
func NewAuthServer(userStore store.UserStore, configStore store.ConfigStore,
	smtp *smtp.SMTP, token token.Token) *AuthServer {
	return &AuthServer{
		us:    userStore,
		cs:    configStore,
		smtp:  smtp,
		token: token,
	}
}

// Register AuthServer to the gRPC server.
func (a *AuthServer) Register(g grpc.ServiceRegistrar) {
	pb.RegisterAuthServer(g, a)
}

// RegisterFromEndpoint registers the http handlers for service Auth to "mux".
// The handlers forward requests to the grpc endpoint.
func (a *AuthServer) RegisterFromEndpoint(ctx context.Context, mux *runtime.ServeMux,
	endpoint string, opts []grpc.DialOption) error {
	return pb.RegisterAuthHandlerFromEndpoint(ctx, mux, endpoint, opts)
}

// SignIn returns an access token as well as a refresh token from an email and a
// password.
func (a *AuthServer) SignIn(ctx context.Context, req *pb.SignInRequest) (*pb.SignInResponse, error) {
	var (
		u   *store.User
		err error
	)
	secureFunction(authSecureDuration*2, func() {
		u, err = a.us.UserGetByEmail(emailFormat(req.GetEmail()))
		if err != nil {
			if !errors.Is(err, store.ErrNotFound) {
				err = logError(ctx, err, codes.Internal, "could not fetch account")
				return
			}
			err = status.Error(codes.InvalidArgument, "incorrect email or password")
			return
		}
		// We compare the passwords.
		if ok := passwordCompare(u.Password, req.GetPwd(), u.SaltPwd); !ok || err != nil {
			err = status.Error(codes.InvalidArgument, "incorrect email or password")
		}
	})
	if err != nil {
		return nil, err
	}

	// Get peer info that will be used to generate an access and refresh token.
	// We also get the configuration.
	p, ok := peer.FromContext(ctx)
	if !ok {
		return nil, status.Error(codes.InvalidArgument, "could not get peer info")
	}
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}

	// Delete expired refresh tokens as well as old refresh tokens (a user
	// cannot hold more than cfg.RefreshLimit tokens at the same time).
	now := time.Now()
	var refreshToDelete [][]byte
	refreshAll, err := a.us.RefreshGetAll(u.ID)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not get refresh tokens")
	}
	for i, r := range refreshAll {
		if r.Exp.Before(now) || i >= int(cfg.RefreshLimit)-1 {
			refreshToDelete = append(refreshToDelete, r.Token)
		}
	}
	if err := a.us.RefreshDelete(u.ID, refreshToDelete...); err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not delete expired tokens")
	}

	// Generate a new refresh token and store it. We try to set it three times
	// in case the token already exists (should be unique within a user).
	var refresh store.UserRefresh
	for i := 0; i < 3; i++ {
		r := a.token.Refresh(u.ID, p.Addr.String(), cfg.RefreshDuration)
		if err != nil {
			return nil, logError(ctx, err, codes.Internal, "could not generate refresh token")
		}
		refresh.Token = r.Token
		refresh.UserID = r.UserID
		refresh.Addr = r.Addr
		refresh.Exp = r.Exp
		refresh.CreatedAt = r.Iss
		err = a.us.RefreshSet(&refresh)
		if err == nil {
			break
		}
	}
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not store generated token")
	}

	// Generate an access token, aes key and send the result.
	access, err := a.token.Access(
		token.User{ID: u.ID, Admin: u.Admin, CatAdd: u.CatAdd, Locale: u.Locale},
		cfg.AccessDuration)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not generate access token")
	}
	aes := pbkdf2.Key([]byte(req.GetPwd()), u.Salt, 4096, 32, sha1.New)
	return &pb.SignInResponse{
		User: &pb.User{
			Id:     u.ID,
			Admin:  u.Admin,
			Locale: u.Locale,
			Email:  u.Email,
		},
		AESKey:      aes,
		AccessToken: access,
		RefreshToken: &pb.RefreshToken{
			UserId: u.ID,
			Token:  refresh.Token[:],
			Exp:    timestamppb.New(refresh.Exp),
		},
	}, nil
}

// CheckSignUp indicates if the site is in "invitation only" mode. If it returns
// true, then everyone can sign-up.
func (a *AuthServer) CheckSignUp(ctx context.Context, req *emptypb.Empty) (*pb.CheckSignUpResponse, error) {
	cfg, err := a.cs.ConfigGet()
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not fetch configuration")
	}
	return &pb.CheckSignUpResponse{Allowed: !cfg.InviteOnlySignUp}, nil
}

// InviteSignUp sends an sign-up invitation code to an email address. Only
// administrators can send such emails.
func (a *AuthServer) InviteSignUp(ctx context.Context, req *pb.InviteSignUpRequest) (*emptypb.Empty, error) {
	claims, err := a.token.CheckAccessMetadata(ctx)
	if err != nil || !claims.User.Admin {
		if err == nil {
			return nil, status.Error(codes.PermissionDenied, "administrators only")
		}
		return nil, logError(ctx, err, codes.PermissionDenied, "administrators only")
	}
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	email := emailFormat(req.GetEmail())
	if exists, err := a.checkEmail(ctx, email); err != nil {
		return nil, err
	} else if exists {
		return nil, status.Error(codes.InvalidArgument, "email already exists")
	}
	a.verify(ctx, email, locale.Locale(req.GetLocale()), locale.Locale(cfg.DefaultLocale),
		store.UserCodeType_InviteSignUp, store.ConfigEmailType_InviteSignUp,
		cfg.CodeDurationInvite, 0, newCode)
	return &emptypb.Empty{}, nil
}

// VerifySignUp sends a verification code to an email address. This verification
// code is required to sign-up. If the site is not in invite-only mode, then
// everyone can send a verification code whatever the invitation code they
// enter.
func (a *AuthServer) VerifySignUp(ctx context.Context, req *pb.VerifySignUpRequest) (*emptypb.Empty, error) {
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	email := emailFormat(req.GetEmail())
	if cfg.InviteOnlySignUp {
		// Secure function is useless for invite codes as the hacker may not
		// know the email address (not the case for verify and resetpwd).
		// TODO: remove secure function
		err = a.checkCode(ctx, cfg, store.UserCodeType_InviteSignUp,
			req.GetInviteCode(), email, "CODE_INVITE")
		if err != nil {
			return nil, err
		}
	}
	userExists, err := a.checkEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	// If the user exists, we send a reset pwd email instead so the hacker
	// doesn't know that this email already exists.
	//
	// NOTICE: What you can also do is set up a captcha here so you can return
	// information such as "email already taken" (instead of sending a reset pwd
	// email). The captcha can also limit the creation of bulk accounts and bulk
	// verification codes. Although, we recommend setting up the site in
	// invite-only mode.
	var et = store.ConfigEmailType_VerifySignUp
	var ct = store.UserCodeType_VerifySignUp
	if userExists {
		et = store.ConfigEmailType_ResetPwd
		ct = store.UserCodeType_ResetPwd
	}
	// Launch verify in a goroutine to avoid timing attacks. All errors are
	// internal and will be logged.
	go a.verify(ctx, email, locale.Locale(req.GetLocale()), locale.Locale(cfg.DefaultLocale),
		ct, et, cfg.CodeDuration, cfg.CodeDurationBetween, newHumanCode)
	return &emptypb.Empty{}, nil
}

// Signup creates a new user IF AND ONLY IF the invitation and activation codes
// are correct. The invitation code is not required if the site IS NOT in
// invite-only mode. The activation code can be obtained through the SendSignUp
// method.
func (a *AuthServer) SignUp(ctx context.Context, req *pb.SignUpRequest) (*pb.SignInResponse, error) {
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}

	// We will redirect the user to ResetPwd after the validation process so
	// that the hacker does not know the validity of the email address.
	var t = store.UserCodeType_VerifySignUp
	var email = emailFormat(req.GetEmail())
	userExists, err := a.isEmailExists(ctx, email)
	if err != nil {
		return nil, err
	}
	if userExists {
		t = store.UserCodeType_ResetPwd
	}

	// Check verify code. We do not check the invite code as it was already
	// verified in VerifySignUp.
	if err = a.checkCode(ctx, cfg, t, req.GetVerifyCode(), email, "CODE_VERIFY"); err != nil {
		return nil, err
	}
	if userExists { // This user is legit, we redirect the request.
		return a.ResetPwd(ctx, &pb.ResetPwdRequest{VerifyCode: req.GetVerifyCode(), Email: req.GetEmail(), Pwd: req.GetPwd()})
	}

	// Is the password valid? If yes, we hash it and generate the AES-256 salt.
	// We do not need to verify the email as it was already checked in the
	// SendSignUp method.
	if !passwordValidate(req.GetPwd()) {
		return nil, status.Error(codes.InvalidArgument, "incorrect pwd")
	}
	hash, saltPwd := passwordHash(req.GetPwd())
	salt := newSalt()

	// Store the new user.
	u := &store.User{
		Email:    req.GetEmail(),
		Password: hash,
		Salt:     salt,
		SaltPwd:  saltPwd,
		Locale:   req.GetLocale(),
	}
	if err := a.us.UserSet(u); err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not create user")
	}

	// Delete activation code and invite code.
	list := map[store.UserCodeType]string{store.UserCodeType_VerifySignUp: req.GetVerifyCode()}
	if cfg.InviteOnlySignUp {
		list[store.UserCodeType_InviteSignUp] = req.GetInviteCode()
	}
	for k, v := range list {
		err = a.us.CodeDelete(k, email, v)
		if err != nil {
			return nil, logError(ctx, err, codes.Internal, fmt.Sprintf("could not delete code %v", k))
		}
	}

	// Sign the user in.
	r, err := a.SignIn(ctx, &pb.SignInRequest{Email: req.GetEmail(), Pwd: req.GetPwd()})
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not sign in")
	}
	return r, nil
}

// VerifyResetPwd sends a code to reset the password to an email address. This
// code must be given to the ResetPwd method.
func (a *AuthServer) VerifyResetPwd(ctx context.Context, req *pb.VerifyResetPwdRequest) (*emptypb.Empty, error) {
	email := emailFormat(req.GetEmail())
	userExists, err := a.checkEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	go func() {
		if userExists {
			cfg, err := a.config(ctx)
			if err != nil {
				return
			}
			a.verify(ctx, email, locale.Locale(req.GetLocale()), locale.Locale(cfg.DefaultLocale),
				store.UserCodeType_ResetPwd, store.ConfigEmailType_ResetPwd,
				cfg.CodeDuration, cfg.CodeDurationBetween, newHumanCode)
		}
	}()
	return &emptypb.Empty{}, nil
}

// CheckResetPwd checks if the code given by VerifyResetPwd is valid.
func (a *AuthServer) CheckResetPwd(ctx context.Context, req *pb.CheckResetPwdRequest) (*emptypb.Empty, error) {
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	email := emailFormat(req.GetEmail())
	if err := a.checkCode(ctx, cfg, store.UserCodeType_ResetPwd,
		req.GetVerifyCode(), email, "CODE_RESETPWD"); err != nil {
		return nil, err
	}
	return &emptypb.Empty{}, nil
}

// ResetPwd resets the password associated to an email address. A code that can
// be obtained through the SendResetPwd must be given in order to verify the
// identity of the user.
func (a *AuthServer) ResetPwd(ctx context.Context, req *pb.ResetPwdRequest) (*pb.SignInResponse, error) {
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}

	email := emailFormat(req.GetEmail())
	// Delete the expired codes and check the given code.
	if err := a.checkCode(ctx, cfg, store.UserCodeType_ResetPwd,
		req.GetVerifyCode(), email, "CODE_RESETPWD"); err != nil {
		return nil, err
	}

	// Hash the new password and generate a new AES-256 salt. We also delete all
	// information that was encrypted with the old password.
	if !passwordValidate(req.GetPwd()) {
		return nil, status.Error(codes.InvalidArgument, "incorrect pwd")
	}
	pwd, saltPwd := passwordHash(req.GetPwd())
	salt := newSalt()

	// Update the user with the new password and salt.
	u, err := a.us.UserGetByEmail(email)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not fetch user")
	}
	err = a.us.UserUpdate(u.ID, []string{"Password", "Salt", "SaltPwd"}, &store.User{Password: pwd, Salt: salt, SaltPwd: saltPwd})
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not update user")
	}

	// Delete all refresh tokens
	err = a.us.RefreshDeleteAll(u.ID)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not delete the refresh tokens")
	}
	// TODO delete banks

	// Delete the reset password code and sign the user in.
	err = a.us.CodeDelete(store.UserCodeType_ResetPwd, email, req.GetVerifyCode())
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not delete code")
	}
	return a.SignIn(ctx, &pb.SignInRequest{Email: req.GetEmail(), Pwd: req.GetPwd()})
}

// NewAccess generates a new access token from a refresh token.
func (a *AuthServer) NewAccess(ctx context.Context, req *pb.NewAccessRequest) (*pb.NewAccessResponse, error) {
	var (
		t   = req.GetRefreshToken()
		r   *store.UserRefresh
		err error
	)
	secureFunction(authSecureDuration, func() {
		r, err = a.us.RefreshGet(t.GetUserId(), t.GetToken())
		if err != nil || a.token.IsExpiredRefresh(r.Exp) {
			if err != nil && !errors.Is(err, store.ErrNotFound) {
				err = logError(ctx, err, codes.Internal, "could not get refresh token")
				return
			}
			err = status.Error(codes.InvalidArgument, "invalid refresh token")
		}
	})
	if err != nil {
		return nil, err
	}

	u, err := a.us.UserGet(r.UserID)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not get user")
	}
	cfg, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	access, err := a.token.Access(
		token.User{ID: u.ID, Admin: u.Admin, CatAdd: u.CatAdd, Locale: u.Locale},
		cfg.AccessDuration)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not generate access token")
	}
	return &pb.NewAccessResponse{AccessToken: access}, nil
}

// SignOut deletes the given refresh token. Warning: the issued access tokens
// remain valid.
func (a *AuthServer) SignOut(ctx context.Context, req *pb.SignOutRequest) (*emptypb.Empty, error) {
	var (
		t   = req.GetRefreshToken()
		r   *store.UserRefresh
		err error
	)
	secureFunction(authSecureDuration, func() {
		r, err = a.us.RefreshGet(t.GetUserId(), t.GetToken())
		if err != nil || r.UserID != req.GetRefreshToken().GetUserId() {
			if !errors.Is(err, store.ErrNotFound) {
				err = logError(ctx, err, codes.Internal, "could not get refresh token")
				return
			}
			err = status.Error(codes.InvalidArgument, "invalid refresh token")
		}
	})
	if err != nil {
		return nil, err
	}
	err = a.us.RefreshDelete(r.UserID, r.Token)
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not delete refresh token")
	}
	return &emptypb.Empty{}, nil
}

// SetLocale replaces the current user locale by another.
func (a *AuthServer) SetLocale(ctx context.Context, req *pb.SetLocaleRequest) (*emptypb.Empty, error) {
	claims, err := a.token.CheckAccessMetadata(ctx)
	if err != nil {
		return nil, logError(ctx, err, codes.PermissionDenied, "not authenticated")
	}
	err = a.us.UserUpdate(claims.User.ID, []string{"Locale"}, &store.User{Locale: req.GetLocale()})
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not update user")
	}
	return &emptypb.Empty{}, nil
}

func (a *AuthServer) SetEmailInvite(ctx context.Context, req *pb.SetEmailInviteRequest) (*emptypb.Empty, error) {
	_, err := a.token.CheckAccessMetadata(ctx)
	if err != nil {
		return nil, logError(ctx, err, codes.PermissionDenied, "not authenticated")
	}
	email := emailFormat(req.GetEmail())
	userExists, err := a.checkEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	go func() {
		if !userExists {
			cfg, err := a.config(ctx)
			if err != nil {
				return
			}
			a.verify(ctx, email, locale.Locale(req.GetLocale()), locale.Locale(cfg.DefaultLocale),
				store.UserCodeType_SetEmail, store.ConfigEmailType_SetEmail,
				cfg.CodeDuration, cfg.CodeDurationBetween, newHumanCode)
		}
	}()

	return &emptypb.Empty{}, nil
}

// verify sends a code to the specified email.
func (a *AuthServer) verify(ctx context.Context,
	email string, loc locale.Locale, def locale.Locale,
	t store.UserCodeType, et store.ConfigEmailType,
	duration time.Duration, durationBetween time.Duration,
	codegen func() string) {
	// Deleted expired codes and check if a code has not been sent recently.
	// Then we delete all other codes related to this email and this type,
	// because we only allow one activation code per email.
	if err := a.us.CodeDeleteExp(); err != nil {
		logError(ctx, err, codes.Internal, "could not delete expired codes")
		return
	}
	c, err := a.us.CodeGetAll(t, email)
	if err != nil && !errors.Is(err, store.ErrNotFound) {
		logError(ctx, err, codes.Internal, "could not get last code")
		return
	}
	for _, v := range c {
		if v.CreatedAt.Add(durationBetween).After(time.Now()) {
			return // A code has been sent recently.
		}
	}
	if err = a.us.CodeDeleteAll(t, email); err != nil {
		logError(ctx, err, codes.Internal, "could not delete expired codes")
		return
	}

	code := codegen()
	err = a.us.CodeSet(&store.UserCode{
		Code:  string(code),
		Type:  t,
		Email: email,
		Exp:   time.Now().Add(duration),
	})
	if err != nil {
		logError(ctx, err, codes.Internal, "could not store the code")
		return
	}

	// We send the email. As mentioned in the store package, every email that
	// uses codes must have an email parameter and a code parameter.
	e, err := a.cs.EmailGet(et)
	if err != nil {
		logError(ctx, err, codes.Internal, "could not get email")
	}
	params := map[string]string{"code": code, "email": email}
	msg := e.Content.String(loc, def)
	err = a.smtp.Send(msg, params, []string{email})
	if err != nil {
		logError(ctx, err, codes.Internal, "could not send email")
	}
}

func (a *AuthServer) config(ctx context.Context) (*store.Config, error) {
	cfg, err := a.cs.ConfigGet()
	if err != nil {
		return nil, logError(ctx, err, codes.Internal, "could not fetch configuration")
	}
	return cfg, nil
}

// checkCode verifies if a code associated to an email is valid. This method
// uses secureFunction. Error returned is a status error.
func (a *AuthServer) checkCode(ctx context.Context, cfg *store.Config, t store.UserCodeType,
	code string, email string, typ string) error {
	var err error
	secureFunction(authSecureDuration, func() {
		if err = a.us.CodeDeleteExp(); err != nil {
			err = logError(ctx, err, codes.Internal, "could not delete expired codes")
			return
		}
		var c *store.UserCode
		c, err = a.us.CodeGet(t, email, code)
		if err != nil || c.Type != t || c.Email != email {
			if !errors.Is(err, store.ErrNotFound) {
				err = logError(ctx, err, codes.Internal, "could not fetch "+typ+" code")
			}
			info := errdetails.ErrorInfo{
				Reason: typ,
				Domain: cfg.Domain,
			}
			var s *status.Status
			s, err = status.New(codes.InvalidArgument, "incorrect "+typ+" code").WithDetails(&info)
			if err != nil {
				panic(err)
			}
			err = s.Err()
		}
	})
	return err
}

// checkEmail checks if it is a valid email address and returns true if it
// already exists. Error returned is a status error.
func (a *AuthServer) checkEmail(ctx context.Context, email string) (exists bool, err error) {
	if !emailValidate(email) {
		return false, status.Error(codes.InvalidArgument, "incorrect email")
	}
	return a.isEmailExists(ctx, email)
}

// isUser returns true if the email exists. Error returned is a status error.
// This method uses secureFunction.
func (a *AuthServer) isEmailExists(ctx context.Context, email string) (exists bool, err error) {
	// This retrieval should not be time dependent. In case it is, we wait until
	// a defined time so the hacker cannot know if it is a valid email address or no.
	secureFunction(authSecureDuration, func() {
		_, err = a.us.UserGetByEmail(email)
	})
	if err != nil && !errors.Is(err, store.ErrNotFound) {
		return false, logError(ctx, err, codes.Internal, "could not fetch account")
	}
	return err == nil, nil
}
