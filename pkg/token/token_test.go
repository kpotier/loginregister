package token_test

import (
	"context"
	"errors"
	"net"
	"reflect"
	"testing"
	"time"

	"github.com/kpotier/loginregister/pkg/token"

	"github.com/golang-jwt/jwt/v4"
	"google.golang.org/grpc/metadata"
)

func TestAccess(t *testing.T) {
	t.Run("ok access", func(t *testing.T) {
		j := token.Token{Secret: []byte("test-secret")}
		var u token.User
		u.ID = 4
		u.Admin = true
		token, err := j.Access(u, 5*time.Minute)
		if err != nil {
			t.Fatalf("j.Access() err = %v, wantErr %v", err, false)
		}
		claims, err := j.CheckAccess(token)
		if err != nil {
			t.Fatalf("j.CheckAccess() err = %v, wantErr %v", err, false)
		}
		if claims.User.ID != u.ID || claims.User.Admin != u.Admin {
			t.Errorf("j.CheckAccess(), err = claims do not match, claims %v", claims)
		}
		// Test from metadata
		md := metadata.New(map[string]string{"authorization": token})
		ctx := metadata.NewIncomingContext(context.Background(), md)
		claims, err = j.CheckAccessMetadata(ctx)
		if err != nil {
			t.Fatalf("j.CheckAccessMetadata() err = %v, wantErr %v", err, false)
		}
		if claims.User.ID != u.ID || claims.User.Admin != u.Admin {
			t.Errorf("j.CheckAccessMetadata(), err = claims do not match, claims %v", claims)
		}
	})

	t.Run("expired acces", func(t *testing.T) {
		j := token.Token{Secret: []byte("test-secret")}
		token, err := j.Access(token.User{}, 0)
		if err != nil {
			t.Fatalf("j.Access() err = %v, wantErr %v", err, false)
		}
		_, err = j.CheckAccess(token)
		if err == nil || (err != nil && !errors.Is(err, jwt.ErrTokenExpired)) {
			t.Fatalf("j.CheckAccess() err = %v, want %v", err, jwt.ErrTokenExpired)
		}
	})
}

func TestRefresh(t *testing.T) {
	t.Run("ok refresh", func(t *testing.T) {
		ip := net.ParseIP("127.0.0.1").String()
		id := uint32(2)
		duration := 5 * time.Minute
		j := token.Token{}
		token := j.Refresh(id, ip, duration)
		if j.IsExpiredRefresh(token.Exp) {
			t.Errorf("j.IsExpiredRefresh() = %v, want %v", true, false)
		}
		if !reflect.DeepEqual(token.Addr, ip) || token.UserID != id {
			t.Errorf("j.Refresh(), err = ip or id mismatch, wantErr false")
		}
		if float64(time.Until(token.Iss).Abs()) > float64(1*time.Second) {
			t.Errorf("j.Refresh(), err = Iss out of time window, wantErr false")
		}
		if float64(token.Exp.Sub(time.Now().Add(duration)).Abs()) > float64(1*time.Second) {
			t.Errorf("j.Refresh(), err = exp out of time window, wantErr false")
		}
	})

	t.Run("expired refresh", func(t *testing.T) {
		var j token.Token
		if j.IsExpiredRefresh(time.Time{}) == false {
			t.Errorf("j.IsExpiredRefresh() = %v, want %v", false, true)
		}
	})
}
