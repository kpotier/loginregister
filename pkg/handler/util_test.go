package handler

import (
	"testing"
)

func Test_password(t *testing.T) {
	t.Run("good pwd", func(t *testing.T) {
		tests := []string{"hello", "hi", "password"}
		for _, tt := range tests {
			t.Run("crypt pwd "+tt, func(t *testing.T) {
				got, salt := passwordHash(tt)
				if ok := passwordCompare([]byte(got), tt, salt); !ok {
					t.Errorf("passwordCompare() err = passwords do not match, wantErr %v", false)
				}
			})
		}
	})

	t.Run("error compare", func(t *testing.T) {
		ok := passwordCompare([]byte("badhash"), "mypassword", []byte("randomsalt"))
		if !ok {
			t.Errorf("passwordCompare() err = %v, wantErr %v", "passwords do not match", true)
		}
	})
}

func Test_passwordValidate(t *testing.T) {
	tests := []struct {
		name string
		args string
		want bool
	}{
		{"good pwd", "ànoU%1l", true},
		{"good pwd 2", "abCdef-g1", true},
		{"8 bytes", "!B1c", false},
		{"72 bytes", string(make([]byte, 73)), false},
		{"no special", "aBc1defghik", false},
		{"no upper", "noupper!1d", false},
		{"no lower", "ABC1!DEFH", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := passwordValidate(tt.args); got != tt.want {
				t.Errorf("passwordValidate() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_emailValidate(t *testing.T) {
	var utf8chars []rune
	for i := 0; i < 254; i++ {
		utf8chars = append(utf8chars, 'à')
	}
	utf8chars[20] = '@'

	tests := []struct {
		name string
		args string
		want bool
	}{
		{"good email", "fiabo@lol.fr", true},
		{"bad email", "notemail", false},
		{"254 chars", string(make([]byte, 255)), false},
		{"254 chars utf8", string(utf8chars), true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := emailValidate(tt.args); got != tt.want {
				t.Errorf("emailValidate() = %v, want %v", got, tt.want)
			}
		})
	}
}

func Test_newSalt(t *testing.T) {
	t.Run("length", func(t *testing.T) {
		got := newSalt()
		if len(got) != 16 {
			t.Errorf("newSalt() len = %v, want %v", len(got), 16)
		}
	})

	t.Run("uniqueness", func(t *testing.T) {
		list := [][]byte{}
		for i := 0; i < 300; i++ {
			got := newSalt()
			for _, s := range list {
				if string(s) == string(got) {
					t.Fatalf("newSalt(), error = not unique")
				}
			}
			list = append(list, got)
		}
	})
}

func Test_newCode(t *testing.T) {
	list := []string{}
	for i := 0; i < 300; i++ {
		got := newCode()
		for _, s := range list {
			if s == got {
				t.Fatalf("newCode(), error = not unique")
			}
		}
		list = append(list, got)
	}
}
