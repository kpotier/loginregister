package main

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"flag"
	"net"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"time"

	"github.com/kpotier/loginregister/internal/npmbuild"
	"github.com/kpotier/loginregister/pkg/handler"
	"github.com/kpotier/loginregister/pkg/pb"
	"github.com/kpotier/loginregister/pkg/smtp"
	"github.com/kpotier/loginregister/pkg/token"

	gorm_store "github.com/kpotier/loginregister/pkg/store/gorm"

	"github.com/sirupsen/logrus"
	gormv2logrus "github.com/thomas-tacquet/gormv2-logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_logrus "github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus"
	"github.com/grpc-ecosystem/go-grpc-middleware/ratelimit"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"golang.org/x/time/rate"
)

var (
	log        *logrus.Entry
	staticPath string
	dev        bool

	cfgFile = "config.json"
	dbFile  = "db.sqlite"
	distDir = "dist"

	devEnvSrc = "BANKING_DEV_SRC"
	devEnvOut = "BANKING_DEV_OUT"
	devSrc    = "./static/src"
	devOut    = "./static/dist"
)

type Config struct {
	ServeAddrStatic string `json:"serve_addr_static"`
	ServeAddrAPI    string `json:"serve_addr_api"`
	TokenSecret     string `json:"token_secret"`
	SMTPHost        string `json:"smtp_host"`
	SMTPPort        string `json:"smtp_port"`
	SMTPUsername    string `json:"smtp_username"`
	SMTPPassword    string `json:"smtp_password"`
	SMTPFrom        string `json:"smtp_from"`
}

type Limiter struct {
	*rate.Limiter
}

func (l *Limiter) Limit() bool {
	err := l.Wait(context.Background())
	return err != nil
}

func main() {
	flag.Parse()

	os.Mkdir(staticPath, os.ModePerm)

	// Read config file or create it
	var cfg Config
	configPath := filepath.Join(staticPath, cfgFile)
	if _, err := os.Stat(configPath); errors.Is(err, os.ErrNotExist) {
		log.Info("could not find config file, creating it")
		f, err := os.Create(configPath)
		if err != nil {
			log.Fatalln("cfg create:", err)
		}
		enc := json.NewEncoder(f)
		enc.SetIndent("", "\t")

		secret := make([]byte, 16)
		_, err = rand.Read(secret)
		if err != nil {
			log.Fatalln("cfg create:", err)
		}
		cfg = Config{
			ServeAddrStatic: ":80",
			ServeAddrAPI:    ":8080",
			TokenSecret:     string(secret),
		}
		err = enc.Encode(&cfg)
		if err != nil {
			f.Close()
			log.Fatalln("cfg encode:", err)
		}
		f.Close()
	} else if err != nil {
		log.Fatalln("cfg stat:", err)
	}
	f, err := os.Open(configPath)
	if err != nil {
		log.Fatalln("cfg open:", err)
	}
	err = json.NewDecoder(f).Decode(&cfg)
	if err != nil {
		f.Close()
		log.Fatalln("cfg decode:", err)
	}
	f.Close()

	// Open sqlite database
	gormLogger := gormv2logrus.NewGormlog(gormv2logrus.WithLogrusEntry(log))
	db, err := gorm.Open(sqlite.Open(filepath.Join(staticPath, dbFile)), &gorm.Config{
		Logger: gormLogger,
	})
	if err != nil {
		log.Fatalln("gorm.Open:", err)
	}

	// Needed packages
	userStore, err := gorm_store.NewUserStore(db)
	if err != nil {
		log.Fatalln("NewUserStore:", err)
	}
	configStore, err := gorm_store.NewConfigStore(db)
	if err != nil {
		log.Fatalln("NewConfigStore:", err)
	}
	smtp := smtp.New(cfg.SMTPHost, cfg.SMTPPort, cfg.SMTPUsername, cfg.SMTPPassword, cfg.SMTPFrom)
	token := token.Token{Secret: []byte(cfg.TokenSecret)}

	// Server
	limiter := &Limiter{rate.NewLimiter(rate.Every(1*time.Second), 5)}
	opts := []grpc_logrus.Option{grpc_logrus.WithLevels(grpc_logrus.DefaultClientCodeToLevel)}
	server := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_logrus.UnaryServerInterceptor(log, opts...),
			ratelimit.UnaryServerInterceptor(limiter),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_logrus.StreamServerInterceptor(log, opts...),
			ratelimit.StreamServerInterceptor(limiter),
		),
	)

	// Register gRPC server.
	auth := handler.NewAuthServer(userStore, configStore, smtp, token)
	auth.Register(server)

	// Serve gRPC server.
	go func() {
		l, err := net.Listen("tcp", cfg.ServeAddrAPI)
		if err != nil {
			log.Fatalln("listen gRPC:", err)
		}
		err = server.Serve(l)
		if err != nil {
			log.Fatalln("serve gRPC:", err)
		}
	}()

	// Dev mode
	if dev {
		go func() {
			src, ok := os.LookupEnv(devEnvSrc)
			if !ok {
				src = devSrc
			}
			out, ok := os.LookupEnv(devEnvOut)
			if !ok {
				out = devOut
			}
			err := npmbuild.Watch(src, out, filepath.Join(staticPath, distDir))
			log.Fatalln("dev:", err)
		}()
	}

	// Register REST API.
	restMux := runtime.NewServeMux(
		runtime.WithIncomingHeaderMatcher(runtime.DefaultHeaderMatcher),
	)
	restCtx := context.Background()
	restOpts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
	pb.RegisterAuthHandlerFromEndpoint(restCtx, restMux, cfg.ServeAddrAPI, restOpts)

	// Launch REST API and static.
	mux := http.NewServeMux()
	mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		r.URL.Path = r.URL.Path[4:]
		restMux.ServeHTTP(w, r)
	})
	fs := http.Dir(filepath.Join(staticPath, distDir))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		name := path.Clean(r.URL.Path)
		serve(w, r, name, fs, true)
	})
	err = http.ListenAndServe(cfg.ServeAddrStatic, mux)
	if err != nil {
		log.Fatalln("serve static:", err)
	}
}

func serve(w http.ResponseWriter, r *http.Request, name string, fs http.FileSystem, redirect bool) {
	f, err := fs.Open(name)
	if err != nil {
		serveRedirectIndex(w, r, fs, redirect)
		return
	}
	defer f.Close()
	d, err := f.Stat()
	if err != nil {
		serveInternalError(w)
		return
	}
	if d.IsDir() {
		serveRedirectIndex(w, r, fs, redirect)
		return
	}
	http.ServeContent(w, r, d.Name(), d.ModTime(), f)
}

func serveRedirectIndex(w http.ResponseWriter, r *http.Request, fs http.FileSystem, redirect bool) {
	if redirect {
		serve(w, r, "/index.html", fs, false)
	} else {
		serveInternalError(w)
	}
}

func serveInternalError(w http.ResponseWriter) {
	http.Error(w,
		"500 Internal Server Error",
		http.StatusInternalServerError)
}

func init() {
	hdir, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}
	flag.StringVar(&staticPath, "path", filepath.Join(hdir, ".banking"), "path of static files and database")
	flag.BoolVar(&dev, "dev", false, "dev mode (will build "+devEnvSrc+" if it detects changes. It then copy output"+
		"files from "+devEnvOut+" to [-path]. By default "+devEnvSrc+" is `"+devSrc+"` and "+devEnvOut+" is `"+devOut+"`."+
		" Be aware that this option won't generate API files. It also won't refresh automatically the page you are currently viewing.")

	logrus.SetLevel(logrus.InfoLevel)
	log = logrus.NewEntry(logrus.StandardLogger())
	grpc_logrus.ReplaceGrpcLogger(log)
}
