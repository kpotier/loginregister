package locale

import (
	"reflect"
	"testing"
)

func TestLang(t *testing.T) {
	tests := []struct {
		name    string
		l       *Message
		args    interface{}
		wantErr bool
		dontVal bool
	}{
		{
			"one language",
			&Message{FRFR: "hey"},
			"fr-FR:hey",
			false,
			false,
		},
		{
			"multiple languages",
			&Message{"fr-FR": "hey", "en-US": "hi"},
			"fr-FR:hey" + sep + "en-US:hi",
			false,
			false,
		},
		{
			"error code scan",
			&Message{"fr-FR": "hey", "en-US": "hi"},
			"hey" + sep + "EN:hi",
			true,
			true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var l Message
			if err := (&l).Scan(tt.args); (err != nil) != tt.wantErr {
				t.Errorf("Message.Scan() error = %v, wantErr %v", err, tt.wantErr)
			} else if !tt.wantErr && !reflect.DeepEqual(&l, tt.l) {
				t.Errorf("Message.Value(), error = mismatch, want %v, got %v", tt.l, l)
			}

			if tt.dontVal {
				return
			}
			val, err := tt.l.Value()
			if (err != nil) != tt.wantErr {
				t.Errorf("Message.Value() error = %v, wantErr %v", err, tt.wantErr)
			} else if !tt.wantErr && val != tt.args {
				t.Errorf("Message.Value(), error = mismatch, want %v, got %v", tt.args, val.(string))
			}
		})
	}
}

func TestLang_String(t *testing.T) {
	t.Run("ok", func(t *testing.T) {
		l := &Message{"fr-FR": "hey", "en-US": "hi"}
		if l.String(FRFR, ENUS) != "hey" {
			t.Errorf("l.String(FRFR) = %v, want %v", l.String(FRFR, ENUS), "hey")
		}
	})

	t.Run("default language", func(t *testing.T) {
		l := &Message{"en-US": "hi"}
		if l.String(FRFR, ENUS) != "hi" {
			t.Errorf("l.String(FRFR) = %v, want %v", l.String(FRFR, ENUS), "hi")
		}
	})
}
