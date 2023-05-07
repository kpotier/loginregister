package store

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID       uint32 `gorm:"primarykey"`
	Email    string `gorm:"uniqueIndex"`
	Password []byte

	Admin  bool
	CatAdd bool `gorm:"default:true"`
	Locale string

	Salt    []byte
	SaltPwd []byte

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

// RefreshToken contains the refresh token as well as its expiration date.
type UserRefresh struct {
	Token  []byte
	UserID uint32
	Addr   string

	Exp       time.Time
	CreatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type UserCode struct {
	Code  string
	Type  UserCodeType
	Email string

	Exp       time.Time
	CreatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type UserCodeType int

const (
	UserCodeType_InviteSignUp UserCodeType = iota
	UserCodeType_VerifySignUp
	UserCodeType_ResetPwd
	UserCodeType_SetEmail
)

type UserStore interface {
	UserSet(user *User) error
	UserGet(id uint32) (*User, error)
	UserGetByEmail(email string) (*User, error)
	UserGetAllWithDeleted(limit int, offset int) ([]*User, error)
	UserUpdate(id uint32, fields []string, u *User) error
	UserDelete(id uint32) error

	RefreshSet(refresh *UserRefresh) error
	RefreshGet(userID uint32, token []byte) (*UserRefresh, error)
	// Ordered by Iss.
	RefreshGetAll(userID uint32) ([]*UserRefresh, error)
	RefreshDelete(userID uint32, tokens ...[]byte) error
	RefreshDeleteAll(userID uint32) error
	RefreshGetAllWithDelete(limit int, offset int) ([]*UserRefresh, error)

	CodeSet(uc *UserCode) error
	CodeGet(t UserCodeType, email string, code string) (*UserCode, error)
	CodeGetAll(t UserCodeType, email string) ([]*UserCode, error)
	CodeDelete(t UserCodeType, email string, code string) error
	CodeDeleteAll(t UserCodeType, email string) error
	CodeDeleteExp() error
}
