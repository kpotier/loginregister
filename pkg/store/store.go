// Package store contains the model as well as the stores. Each store has, at
// least, one implementation.
package store

import (
	"errors"
)

var ErrNotFound = errors.New("record not found")
