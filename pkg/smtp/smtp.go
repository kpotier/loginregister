// Package smtp implements the Simple Mail Transfer Protocol.
package smtp

import (
	"html"
	"net/smtp"
	"strings"
)

// SMTP contains the sender's information required to send emails. It can be
// instanced with the New function.
type SMTP struct {
	host string
	from string
	auth smtp.Auth
}

// New returns an instance of SMTP. It needs the sender's SMTP server host, port,
// username and password. As well as the email of the sender.
func New(host, port, username, pwd, from string) *SMTP {
	return &SMTP{
		host: host + ":" + port,
		from: from,
		auth: smtp.PlainAuth("", username, pwd, host),
	}
}

// Send authenticates to the server and sends an email to addresses to, with
// message msg in the language lang. Parameters contained in the message and of
// the form {{key}} will be replaced by params.
func (s *SMTP) Send(msg string, params map[string]string, to []string) error {
	str := "From: " + s.from + "\n"
	str += "To: " + strings.Join(to, ",") + "\n"
	str += msg
	for n, p := range params {
		str = strings.ReplaceAll(str, "{{"+n+"}}", html.EscapeString(p))
	}
	str = strings.Replace(str, "\n", "\r\n", -1)
	err := smtp.SendMail(s.host, s.auth, s.from, to, []byte(str))
	return err
}
