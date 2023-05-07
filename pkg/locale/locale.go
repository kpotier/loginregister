// Package locale provides tools to manage content that may vary by country
// and/or language.
package locale

import (
	"database/sql/driver"
	"fmt"
	"strings"
)

// Locale is a BCP 47 language tag.
type Locale string

// List of locale tags.
const (
	ENUS Locale = "en-US"
	FRFR Locale = "fr-FR"
)

// Message contains content translated in multiple languages.
type Message map[Locale]string

var sep = "<go:NewLanguageContent>"

// Scan implements the sql.Scanner interface.
func (m *Message) Scan(value interface{}) error {
	val, ok := value.(string)
	if !ok {
		return fmt.Errorf("wrong type %v", value)
	}
	split := strings.Split(val, sep)
	*m = make(Message, len(split))
	for _, s := range split {
		idx := strings.IndexRune(s, ':')
		if idx < 0 {
			return fmt.Errorf("cannot find lang code: %v", s)
		}
		if idx+1 < len(s) {
			(*m)[Locale(s[:idx])] = s[idx+1:]
		}
	}
	return nil
}

// Value implements the sql.Valuer interface.
func (m Message) Value() (driver.Value, error) {
	var str string
	for c, s := range m {
		str += string(c) + ":"
		str += s
		str += sep
	}
	if len(m) > 0 {
		str = str[:len(str)-len(sep)]
	}
	return str, nil
}

// String returns the text in the selected language. It returns an empty string
// if the text in the language AND in the default language doesn't exist.
func (m Message) String(locale Locale, def Locale) string {
	c, ok := m[locale]
	if ok {
		return c
	}
	// W
	c, ok = m[def]
	if ok {
		return c
	}
	panic("default language is not set")
}
