package store

import (
	"time"

	"github.com/kpotier/loginregister/pkg/locale"
)

type Config struct {
	ID uint8 `gorm:"primarykey;check:id=1"`

	Domain string

	ConfigCacheDuration time.Duration

	DefaultLocale string

	InviteOnlySignUp bool

	AccessDuration  time.Duration
	RefreshDuration time.Duration
	RefreshLimit    uint8

	CodeDurationInvite  time.Duration
	CodeDuration        time.Duration
	CodeDurationBetween time.Duration

	UpdatedAt time.Time
}

type ConfigEmail struct {
	Type      ConfigEmailType `gorm:"primarykey"`
	Content   locale.Message
	UpdatedAt time.Time
}

type ConfigEmailType int

const (
	ConfigEmailType_InviteSignUp ConfigEmailType = iota + 1
	ConfigEmailType_VerifySignUp
	ConfigEmailType_ResetPwd
	ConfigEmailType_SetEmail
)

type ConfigStore interface {
	ConfigGet() (*Config, error)
	ConfigUpdate(cfg *Config) error

	EmailGetAll() ([]*ConfigEmail, error)
	EmailGet(t ConfigEmailType) (*ConfigEmail, error)
	EmailUpdate(t ConfigEmailType, content locale.Message) error
}

func DefaultConfig() *Config {
	return &Config{ID: 1,
		Domain:              "localhost",
		ConfigCacheDuration: 1 * time.Hour,
		DefaultLocale:       "en-US",
		InviteOnlySignUp:    false,
		AccessDuration:      5 * time.Minute,
		RefreshDuration:     24 * time.Hour * 30,
		RefreshLimit:        50,
		CodeDuration:        30 * time.Minute,
		CodeDurationInvite:  24 * time.Hour * 7,
		CodeDurationBetween: 2 * time.Minute,
	}
}

func DefaultConfigEmail() []*ConfigEmail {
	frtext := "Subject: votre code\n\nBonjour, voici le code associé à {{email}} : {{code}}"
	entext := "Subject: your code\n\nHi, this is the code associated to {{email}}: {{code}}"
	return []*ConfigEmail{
		{Type: ConfigEmailType_InviteSignUp, Content: locale.Message{locale.FRFR: frtext, locale.ENUS: entext}},
		{Type: ConfigEmailType_VerifySignUp, Content: locale.Message{locale.FRFR: frtext, locale.ENUS: entext}},
		{Type: ConfigEmailType_ResetPwd, Content: locale.Message{locale.FRFR: frtext, locale.ENUS: entext}},
		{Type: ConfigEmailType_SetEmail, Content: locale.Message{locale.FRFR: frtext, locale.ENUS: entext}},
	}
}
