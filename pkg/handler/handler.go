package handler

import (
	"context"

	"github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus/ctxlogrus"
	"github.com/grpc-ecosystem/go-grpc-middleware/logging/zap/ctxzap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var LogErrFromCtx func(ctx context.Context, err error) = LogrusLogErrFromCtx

var LogrusLogErrFromCtx = func(ctx context.Context, err error) {
	l := ctxlogrus.Extract(ctx)
	if l != nil {
		l.Error(err.Error())
	}
}

var ZapLogErrFromCtx = func(ctx context.Context, err error) {
	l := ctxzap.Extract(ctx)
	if l != nil {
		l.Error(err.Error())
	}
}

func logError(ctx context.Context, err error, code codes.Code, msg string) error {
	LogErrFromCtx(ctx, err)
	return status.Error(code, msg)
}
