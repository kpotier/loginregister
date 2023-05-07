package smtp_test

import (
	"github.com/kpotier/loginregister/pkg/smtp"
	"encoding/base64"
	"net"
	"net/textproto"
	"strings"
	"testing"
)

func TestSMTP_Send(t *testing.T) {
	username := "myusername"
	password := "mypassword"
	sender := "test@test.fr"
	rcv := []string{"bob@boby.fr", "chat@cat.com"}

	server := []string{
		"220 HI",
		"250-localhost",
		"250 AUTH LOGIN PLAIN",
		"235 ACCEPTED",
		"250 OK SENDER",
		"250 OK RCV",
		"250 OK RCV",
		"354 READING",
		".",
		".",
		".",
		".",
		"250 OK",
		"221 BYE",
	}

	want := []byte("" + "\x00" + username + "\x00" + password)
	wantBase64 := make([]byte, base64.StdEncoding.EncodedLen(len(want)))
	base64.StdEncoding.Encode(wantBase64, want)
	client := []string{
		"EHLO localhost",
		"",
		"AUTH PLAIN " + string(wantBase64),
		"MAIL FROM:<" + sender + ">",
		"RCPT TO:<" + rcv[0] + ">",
		"RCPT TO:<" + rcv[1] + ">",
		"DATA",
		"From: " + sender,
		"To: " + rcv[0] + "," + rcv[1],
		"Subject: code",
		"",
		"yo mycode",
		".",
		"QUIT",
	}

	l, err := net.Listen("tcp", "localhost:0")
	if err != nil {
		panic(err)
	}
	addr := l.Addr().String()
	portIDX := strings.LastIndexByte(addr, ':')
	host := addr[:portIDX]
	port := addr[portIDX+1:]

	go func() {
		conn, err := l.Accept()
		if err != nil {
			t.Errorf("l.Accept() err = %v", err)
		}
		defer conn.Close()

		tp := textproto.NewConn(conn)
		defer tp.PrintfLine("221 Goodbye")

		for i, s := range server {
			if s[0] != '.' {
				err := tp.PrintfLine(s)
				if err != nil {
					t.Errorf("unexpected print error: %v", err)
				}
				if s[3] == '-' {
					continue
				}
			}
			l, err := tp.ReadLine()
			if err != nil {
				t.Errorf("unexpected error: %v", err)
				return
			}
			if l != client[i] {
				t.Errorf("got %v, want %v", l, client[i])
			}
		}
	}()

	s := smtp.New(host, port, username, password, sender)
	err = s.Send("Subject: code\n\nyo {{code}}", map[string]string{"code": "mycode"}, rcv)
	if err != nil {
		t.Error(err)
	}
}
