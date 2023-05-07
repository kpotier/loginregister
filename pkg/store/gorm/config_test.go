package gorm_test

import (
	"reflect"
	"testing"

	"github.com/kpotier/loginregister/pkg/locale"
	"github.com/kpotier/loginregister/pkg/store"
	"github.com/kpotier/loginregister/pkg/store/gorm"
)

func TestConfigStore_ConfigGet(t *testing.T) {
	s := newConfigStore(t)
	gc, err := s.ConfigGet()
	if err != nil {
		t.Fatalf("s.ConfigGet() err = %v, wantErr %v", err, false)
	}
	def := store.DefaultConfig()
	if !isUpdated(&gc.UpdatedAt, &def.UpdatedAt) {
		t.Fatalf("s.ConfigGet(), err = time not updated, wantErr %v", false)
	}
	if !reflect.DeepEqual(gc, def) {
		t.Errorf("s.ConfigGet(), err = default values do not correspond, got %v, want %v", gc, def)
	}
}

func TestConfigStore_ConfigUpdate(t *testing.T) {
	t.Run("update change id", func(t *testing.T) {
		s := newConfigStore(t)
		c := &store.Config{ID: 2}
		if err := s.ConfigUpdate(c); err == nil {
			t.Errorf("s.ConfigUpdate() err = want unique row in table, wantErr %v", true)
		}
	})

	t.Run("update and check values", func(t *testing.T) {
		s := newConfigStore(t)
		c := &store.Config{
			ID:               1,
			InviteOnlySignUp: true,
			RefreshLimit:     1,
		}
		if err := s.ConfigUpdate(c); err != nil {
			t.Fatalf("s.ConfigUpdate() err = %v, wantErr %v", err, false)
		}
		gc, err := s.ConfigGet()
		if err != nil {
			t.Fatalf("s.ConfigGet() err = %v, wantErr %v", err, false)
		}
		if !reflect.DeepEqual(gc, c) {
			t.Fatalf("s.ConfigGet(), err = config mismatch, want %v, got %v", c, gc)
		}
	})
}

func TestConfigStore_EmailGetAll(t *testing.T) {
	s := newConfigStore(t)
	ges, err := s.EmailGetAll()
	if err != nil {
		t.Fatalf("s.EmailGetAll() err = %v, wantErr %v", err, false)
	}
	defemail := store.DefaultConfigEmail()
	for i, e := range defemail {
		if !isUpdated(&ges[i].UpdatedAt, &e.UpdatedAt) {
			t.Fatalf("s.EmailGetAll(%v), err = time not updated, wantErr %v", i, false)
		}
	}
	if !reflect.DeepEqual(ges, defemail) {
		t.Fatalf("s.EmailGetAll(), err = default values do not correspond, got %v, want %v", ges, defemail)
	}
}

func TestConfigStore_EmailUpdate(t *testing.T) {
	t.Run("update invalid type", func(t *testing.T) {
		s := newConfigStore(t)
		if err := s.EmailUpdate(999, nil); err != nil {
			t.Fatalf("s.EmailUpdate() err = %v, wantErr %v", err, false)
		}
		if _, err := s.EmailGet(999); err == nil {
			t.Fatalf("s.EmailGet() err = row should not exist, wantErr %v", true)
		}
	})

	t.Run("update", func(t *testing.T) {
		s := newConfigStore(t)
		e := &store.ConfigEmail{
			Type:    store.ConfigEmailType_ResetPwd,
			Content: locale.Message{"EN": "hi"},
		}
		if err := s.EmailUpdate(e.Type, e.Content); err != nil {
			t.Fatalf("s.EmailUpdate() err = %v, wantErr %v", err, false)
		}
		ge, err := s.EmailGet(store.ConfigEmailType_ResetPwd)
		if err != nil {
			t.Fatalf("s.EmailGet() err = %v, wantErr %v", err, false)
		}
		if !isUpdated(&ge.UpdatedAt, &e.UpdatedAt) {
			t.Fatalf("s.EmailGet(), err = time not updated, wantErr %v", false)
		}
		if !reflect.DeepEqual(ge, e) {
			t.Fatalf("s.EmailGet(), err = mismatch, got %v, want %v", ge, e)
		}
		// check that we didn't updated the others
		ge, err = s.EmailGet(store.ConfigEmailType_InviteSignUp)
		if err != nil {
			t.Fatalf("s.EmailGet() err = %v, wantErr %v", err, false)
		}
		if reflect.DeepEqual(ge.Content, e.Content) {
			t.Fatalf("s.EmailGet(), err = same content, got %v, want %v", ge.Content, e.Content)
		}
	})
}

func TestConfigStore_EmailGet(t *testing.T) {
	s := newConfigStore(t)
	if _, err := s.EmailGet(store.ConfigEmailType_InviteSignUp); err != nil {
		t.Fatalf("s.EmailGet() err = %v, wantErr %v", err, false)
	}
}

func newConfigStore(t *testing.T) store.ConfigStore {
	db := newDB(t)
	s, err := gorm.NewConfigStore(db)
	if err != nil {
		t.Fatalf("gorm.NewConfigStore() err = %v, wantErr %v", err, false)
	}
	return s
}
