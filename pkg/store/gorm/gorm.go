package gorm

import (
	"github.com/kpotier/loginregister/pkg/store"
	"errors"

	"gorm.io/gorm"
)

func gormReplaceErr(err error) error {
	// This error is never wrapped.
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return store.ErrNotFound
	}
	return err
}
