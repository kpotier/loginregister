package handler

import (
	"crypto/rand"
	"crypto/subtle"
	"math/big"
	"strings"
	"time"
	"unicode"
	"unicode/utf8"

	"github.com/google/uuid"
	"golang.org/x/crypto/argon2"
)

// passwordHash hashes the password with the bcrypt algorithm.
func passwordHash(pwd string) (hash []byte, salt []byte) {
	salt = newSalt()
	hash = argon2.IDKey([]byte(pwd), salt, 1, 64*1024, 4, 32)
	return
}

// passwordCompare compares a bcrypt hashed password with its possible
// plaintext equivalent.
func passwordCompare(hash []byte, pwd string, salt []byte) bool {
	hash2 := argon2.IDKey([]byte(pwd), salt, 1, 64*1024, 4, 32)
	return subtle.ConstantTimeCompare(hash, hash2) == 1
}

// passwordValidate checks if the password is valid (at least 8 characters, max
// 72 chars, at least one digit, one upper character, one lower character
// and a special character).
func passwordValidate(pwd string) bool {
	var (
		hasDigit, hasUpper   bool
		hasLower, hasSpecial bool
		characters           int
	)
	for _, r := range pwd {
		switch {
		case unicode.IsDigit(r):
			hasDigit = true
		case unicode.IsUpper(r):
			hasUpper = true
		case unicode.IsLower(r):
			hasLower = true
		case unicode.IsPunct(r) || unicode.IsSymbol(r):
			hasSpecial = true
		}
		characters++
	}
	if characters < 8 || !hasDigit || !hasUpper || !hasLower || !hasSpecial || characters > 72 {
		return false
	}
	return true
}

// emailValidate checks if the email is valid (maximum of 254 characters and
// contains @).
func emailValidate(email string) bool {
	return strings.IndexRune(email, '@') > 0 && utf8.RuneCountInString(email) <= 254
}

// newSalt generates a random salt of 16 bytes.
func newSalt() []byte {
	const length = 16
	s := make([]byte, length)
	if _, err := rand.Read(s); err != nil {
		panic(err) // should never fail.
	}
	return s
}

// newCode generates a universal unique identifier.
func newCode() string {
	return uuid.NewString() // should never fail.
}

// Secure function will execute a function and wait if it completes in less than
// d.
func secureFunction(d time.Duration, fn func()) {
	now := time.Now().Add(d)
	fn()
	time.Sleep(time.Until(now))
}

// formatEmail by lowercasing it.
func emailFormat(email string) string {
	return strings.ToLower(email)
}

func newHumanCode() string {
	const letters = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789-@!^*#$%"
	var s strings.Builder
	s.Grow(8)
	for i := 0; i < 8; i++ {
		idx, err := rand.Int(rand.Reader, big.NewInt(int64(len(letters))))
		if err != nil {
			panic(err)
		}
		s.WriteByte(letters[idx.Int64()])
	}
	return s.String()
}
