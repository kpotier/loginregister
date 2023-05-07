// Package token provides a tool to generate and verify access tokens as well as
// refresh tokens.
package token

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"google.golang.org/grpc/metadata"
)

// Token allows to create and verify access tokens as well as refresh tokens.
// This package does not provide a New function so the struct must be instanced
// by hand.
type Token struct {
	Secret []byte
}

// Refresh holds a refresh token. It contains the IP address of the issuer as
// well as the expiration date.
type Refresh struct {
	Token  []byte
	UserID uint32
	Addr   string
	Exp    time.Time
	Iss    time.Time
}

// User holds information about the user that will be encoded in each access
// token.
type User struct {
	ID     uint32 `json:"id"`
	Admin  bool   `json:"admin"`
	CatAdd bool   `json:"catAdd"`
	Locale string `json:"locale"`
}

// AccessClaims are the claims of each access token generated.
type AccessClaims struct {
	jwt.RegisteredClaims
	User User `json:"user"`
}

// Access creates a new access token for the given user and signs it.
func (t Token) Access(user User, duration time.Duration) (string, error) {
	claims := AccessClaims{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(duration)),
		},
		User: user,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(t.Secret)
}

// CheckAccess checks the access token and returns the claims if it is valid.
func (t Token) CheckAccess(token string) (*AccessClaims, error) {
	j, err := jwt.ParseWithClaims(token, &AccessClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return t.Secret, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := j.Claims.(*AccessClaims); ok && j.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid access token")
}

// CheckAccessMetadata checks the access token from gRPC metadata. The key must
// be "authorization".
func (t Token) CheckAccessMetadata(ctx context.Context) (*AccessClaims, error) {
	m, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, errors.New("no metadata")
	}
	v := m.Get("authorization")
	if len(v) == 0 {
		return nil, errors.New("no authorization metadata")
	}
	return t.CheckAccess(v[0])
}

// Refresh creates a new refresh token that is 16 bytes long.
func (t Token) Refresh(userID uint32, addr string, duration time.Duration) *Refresh {
	rt := uuid.New()
	now := time.Now()
	return &Refresh{Token: rt[:], UserID: userID, Iss: now, Exp: now.Add(duration), Addr: addr}
}

// IsExpiredRefresh reports whether the refresh token is expired.
func (t Token) IsExpiredRefresh(exp time.Time) bool {
	return exp.Before(time.Now())
}
