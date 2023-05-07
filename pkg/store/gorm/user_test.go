package gorm_test

import (
	"github.com/kpotier/loginregister/pkg/store"
	"github.com/kpotier/loginregister/pkg/store/gorm"
	"errors"
	"reflect"
	"sort"
	"testing"
	"time"
)

var us = []*store.User{
	{
		Email:    "bob@sad.com",
		Password: []byte("hashed"),
		Admin:    true,
		Salt:     []byte("some salt"),
	},
	{
		Email:    "marley@lol.fr",
		Password: []byte("hashed2"),
		Admin:    false,
		Salt:     []byte("salty"),
	},
}

var rs = []*store.UserRefresh{
	{
		Token:     []byte("refresh token"),
		UserID:    1,
		CreatedAt: time.Now().Add(15 * time.Second),
		Exp:       time.Now().Add(5 * time.Minute),
		Addr:      "127.0.0.1",
	},
	{
		Token:  []byte("second refresh"),
		UserID: 2,
		Exp:    time.Now().Add(10 * time.Minute),
		Addr:   "128.9.2.1",
	},
	{
		Token:     []byte("third refresh"),
		UserID:    1,
		CreatedAt: time.Now().Add(30 * time.Minute).UTC(),
		Exp:       time.Now().Add(3 * time.Hour),
		Addr:      "127.19.2.1",
	},
}

var cs = []*store.UserCode{
	{
		Code:  "first",
		Type:  store.UserCodeType_InviteSignUp,
		Email: "0",
		Exp:   time.Now().Add(-5 * time.Minute).UTC(),
	},
	{
		Code:  "second",
		Type:  store.UserCodeType_ResetPwd,
		Email: "0",
		Exp:   time.Now().Add(10 * time.Minute),
	},
	{
		Code:  "third",
		Type:  store.UserCodeType_InviteSignUp,
		Email: "0",
		Exp:   time.Now().Add(-15 * time.Minute).UTC(),
	},
}

func TestUserStore_UserSet(t *testing.T) {
	s := newUserStore(t)
	uunique := &store.User{Email: us[0].Email}
	if err := s.UserSet(uunique); err == nil {
		t.Fatalf("s.UserSet() err = email should be unique, wantErr %v", true)
	}
	uunique = &store.User{ID: us[0].ID}
	if err := s.UserSet(uunique); err == nil {
		t.Fatalf("s.UserSet() err = id should be unique, wantErr %v", true)
	}
}

func TestUserStore_UserGet(t *testing.T) {
	s := newUserStore(t)
	for i, u := range us {
		gu, err := s.UserGet(u.ID)
		checkUser(t, gu, u, i, err, "id")
	}
}

func TestUserStore_UserGetByEmail(t *testing.T) {
	s := newUserStore(t)
	for i, u := range us {
		gu, err := s.UserGetByEmail(u.Email)
		checkUser(t, gu, u, i, err, "email")
	}
}

func checkUser(t *testing.T, gu *store.User, u *store.User, i int, err error, typ string) {
	if err != nil {
		t.Fatalf("s.UserGet(%v, %v) err = %v, wantErr %v", i, typ, err, false)
	}
	if !gu.CreatedAt.Equal(u.CreatedAt) || !gu.UpdatedAt.Equal(u.UpdatedAt) {
		t.Fatalf("s.UserGet(%v, %v), err = time not updated or created, wantErr %v", i, typ, false)
	}
	u.CreatedAt = gu.CreatedAt
	u.UpdatedAt = gu.UpdatedAt
	if !reflect.DeepEqual(u, gu) {
		t.Fatalf("s.UserGet(%v, %v), err = user mismatch, got %#+v, want %#+v", i, typ, gu, u)
	}
}

func TestUserStore_UserUpdate(t *testing.T) {
	s := newUserStore(t)
	updates := &store.User{Admin: false}
	if err := s.UserUpdate(us[0].ID, []string{"Admin"}, updates); err != nil {
		t.Fatalf("s.UserUpdate() err = %v, wantErr %v", err, false)
	}
	us[0].Admin = updates.Admin
	// Get the first user by its ID and checks if it has been modified.
	gu, err := s.UserGet(us[0].ID)
	if err != nil {
		t.Fatalf("s.UserGet() err = %v, wantErr %v", err, false)
	}
	us[0].CreatedAt = gu.CreatedAt
	if !isUpdated(&gu.UpdatedAt, &us[0].UpdatedAt) {
		t.Fatalf("s.UserGet(), err = time not updated or created, wantErr %v", false)
	}
	if !reflect.DeepEqual(gu, us[0]) {
		t.Fatalf("s.UserGet(), err = user mismatch, got %#+v, want %#+v", gu, us[0])
	}

	// Check that we did not updated the second user
	gu, err = s.UserGet(us[1].ID)
	if err != nil {
		t.Fatalf("s.UserGet(u2) err = %v, wantErr %v", err, false)
	}
	us[1].CreatedAt = gu.UpdatedAt
	us[1].UpdatedAt = gu.UpdatedAt
	if !reflect.DeepEqual(gu, us[1]) {
		t.Fatalf("s.UserGet(u2), err = user mismatch, got %#+v, want %#+v", gu, us[1])
	}
}

func TestUserStore_UserDelete(t *testing.T) {
	s := newUserStore(t)
	// Check that the second user is not deleted
	if err := s.UserDelete(us[0].ID); err != nil {
		t.Fatalf("s.UserDelete() err = %v, wantErr %v", err, false)
	}
	if _, err := s.UserGet(us[0].ID); err == nil || !errors.Is(err, store.ErrNotFound) {
		t.Fatalf("s.UserGet() err = %v, wantErr %v", nil, true)
	}
	if _, err := s.UserGet(us[1].ID); err != nil {
		t.Fatalf("s.UserGet(u2) err = %v, wantErr %v", nil, false)
	}
}

func TestUserStore_UserGetAllWithDeleted(t *testing.T) {
	s := newUserStore(t)
	if err := s.UserDelete(us[0].ID); err != nil {
		t.Fatalf("s.UserDelete() err = %v, wantErr %v", err, false)
	}
	var gus []*store.User
	gus, err := s.UserGetAllWithDeleted(10, 0)
	if err != nil || len(gus) != 2 {
		t.Fatalf("cannot find the deleted user: %v", err)
	}
}

func newUserStore(t *testing.T) store.UserStore {
	db := newDB(t)
	s, err := gorm.NewUserStore(db)
	if err != nil {
		t.Fatalf("gorm.NewUserStore() err = %v, wantErr %v", err, false)
	}
	for i, u := range us {
		if err := s.UserSet(u); err != nil {
			t.Fatalf("s.UserSet(%v) err = %v, wantErr %v", i, err, false)
		}
	}
	for i, r := range rs {
		if err := s.RefreshSet(r); err != nil {
			t.Fatalf("s.RefreshSet(%v) err = %v, wantErr %v", i, err, false)
		}
	}
	for i, c := range cs {
		if err := s.CodeSet(c); err != nil {
			t.Fatalf("s.CodeSet(%v) err = %v, wantErr %v", i, err, false)
		}
	}
	return s
}

func TestUserStore_RefreshSet(t *testing.T) {
	s := newUserStore(t)
	err := s.RefreshSet(&store.UserRefresh{Token: rs[0].Token})
	if err == nil {
		t.Fatalf("s.RefreshSet() err = want unique token, wantErr %v", true)
	}
}

func TestUserStore_RefreshGet(t *testing.T) {
	s := newUserStore(t)
	for i, r := range rs {
		gr, err := s.RefreshGet(r.UserID, r.Token)
		if err != nil {
			t.Fatalf("s.RefreshGet(%v) err = %v, wantErr %v", i, err, false)
		}
		if !r.CreatedAt.Equal(gr.CreatedAt) {
			t.Fatalf("s.RefreshGet(%v), err = time not updated or created, wantErr %v", i, false)
		}
		r.Exp = gr.Exp
		r.CreatedAt = gr.CreatedAt
		if !reflect.DeepEqual(r, gr) {
			t.Fatalf("s.RefreshGet(%v), err = token mismatch, got %#+v, want %#+v", i, gr, r)
		}
	}
}

func TestUserStore_RefreshGetAll(t *testing.T) {
	s := newUserStore(t)
	grs, err := s.RefreshGetAll(rs[0].UserID)
	if err != nil {
		t.Fatalf("s.RefreshGetAll() err = %v, wantErr %v", err, false)
	}
	// Check order
	sorted := []*store.UserRefresh{}
	for _, r := range rs {
		if r.UserID == rs[0].UserID {
			sorted = append(sorted, r)
		}
	}
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].CreatedAt.After(sorted[j].CreatedAt)
	})
	for i, r := range grs {
		sorted[i].Exp = r.Exp
		sorted[i].CreatedAt = r.CreatedAt
		if !reflect.DeepEqual(r, sorted[i]) {
			t.Fatalf("s.RefreshGetAll(%v), err = token mismatch, got %#+v, want %#+v", i, r, sorted[i])
		}
	}
}

func TestUserStore_RefreshDelete(t *testing.T) {
	s := newUserStore(t)
	err := s.RefreshDelete(rs[0].UserID, rs[0].Token, rs[2].Token)
	if err != nil {
		t.Fatalf("s.RefreshDelete() err = %v, wantErr %v", err, false)
	}
	if _, err = s.RefreshGet(rs[0].UserID, rs[0].Token); err == nil || !errors.Is(err, store.ErrNotFound) {
		t.Fatalf("s.RefreshDelete(), err = token not deleted")
	}
	if _, err = s.RefreshGet(rs[1].UserID, rs[1].Token); err != nil {
		t.Fatalf("s.RefreshDelete(), err = %v, wantErr %v", err, false)
	}
	if _, err = s.RefreshGet(rs[2].UserID, rs[2].Token); err == nil || !errors.Is(err, store.ErrNotFound) {
		t.Fatalf("s.RefreshDelete(), err = token not deleted")
	}
}

func TestUserStore_RefreshGetAllWithDelete(t *testing.T) {
	s := newUserStore(t)
	if err := s.RefreshDelete(rs[0].UserID, rs[0].Token); err != nil {
		t.Fatalf("s.RefreshDelete() err = %v, wantErr %v", err, false)
	}
	var gus []*store.UserRefresh
	gus, err := s.RefreshGetAllWithDelete(10, 0)
	if err != nil || len(gus) != 3 {
		t.Fatalf("cannot find the deleted refresh: %v", err)
	}
}

func TestUserStore_CodeSet(t *testing.T) {
	s := newUserStore(t)
	uunique := &store.UserCode{Code: cs[0].Code}
	if err := s.CodeSet(uunique); err == nil {
		t.Fatalf("s.CodeSet() err = code should be unique, wantErr %v", true)
	}
}

func TestUserStore_CodeGet(t *testing.T) {
	s := newUserStore(t)
	for i, c := range cs {
		gc, err := s.CodeGet(c.Type, c.Email, c.Code)
		if err != nil {
			t.Fatalf("s.CodeGet(%v) err = %v, wantErr %v", i, err, false)
		}
		if !gc.CreatedAt.Equal(c.CreatedAt) {
			t.Fatalf("s.CodeGet(%v), err = time not updated or created, wantErr %v", i, false)
		}
		c.Exp = gc.Exp
		c.CreatedAt = gc.CreatedAt
		if !reflect.DeepEqual(c, gc) {
			t.Fatalf("s.CodeGet(%v), err = token mismatch, got %#+v, want %#+v", i, gc, c)
		}
	}
}

func TestUserStore_CodeGetType(t *testing.T) {
	s := newUserStore(t)
	gc, err := s.CodeGetAll(store.UserCodeType_ResetPwd, "0")
	if err != nil {
		t.Fatalf("s.CodeGetType() error = %v, wantErr %v", err, false)
	}
	if !gc[0].CreatedAt.Equal(cs[1].CreatedAt) {
		t.Fatalf("s.CodeGetType(), err = time not updated or created, wantErr %v", false)
	}
	cs[1].Exp = gc[0].Exp
	cs[1].CreatedAt = gc[0].CreatedAt
	if !reflect.DeepEqual(cs[1], gc[0]) {
		t.Fatalf("s.CodeGetType(), err = token mismatch, got %#+v, want %#+v", gc, cs[1])
	}
}

func TestUserStore_CodeDelete(t *testing.T) {
	s := newUserStore(t)
	err := s.CodeDelete(cs[1].Type, cs[1].Email, cs[1].Code)
	if err != nil {
		t.Fatalf("s.CodeDelete() error = %v, wantErr %v", err, false)
	}
	// Check other codes
	for i, c := range cs {
		wantErr := false
		if i == 1 {
			wantErr = true
		}
		if _, err := s.CodeGet(c.Type, c.Email, c.Code); (err != nil) != wantErr {
			t.Fatalf("s.CodeGet(%v) err = %v, wantErr %v", i, err, wantErr)
		}
	}
}

func TestUserStore_CodeDeleteExp(t *testing.T) {
	s := newUserStore(t)
	// first and third code will be deleted.
	if err := s.CodeDeleteExp(); err != nil {
		t.Fatalf("s.CodeDeleteExp() err = %v, wantErr %v", err, false)
	}
	for i, c := range cs {
		wantErr := true
		if i == 1 {
			wantErr = false
		}
		if _, err := s.CodeGet(c.Type, c.Email, c.Code); (err != nil) != wantErr {
			t.Fatalf("s.CodeGet(%v) err = %v, wantErr %v", i, err, wantErr)
		}
	}
}

func TestUserStore_CodeDeleteType(t *testing.T) {
	s := newUserStore(t)
	err := s.CodeDeleteAll(store.UserCodeType_InviteSignUp, "0")
	if err != nil {
		t.Fatalf("s.CodeDeleteType() err = %v, wantErr %v", err, false)
	}
	for i, c := range cs {
		wantErr := true
		if i == 1 {
			wantErr = false
		}
		if _, err := s.CodeGet(c.Type, c.Email, c.Code); (err != nil) != wantErr {
			t.Fatalf("s.CodeGet(%v) err = %v, wantErr %v", i, err, wantErr)
		}
	}
}
