// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.12
// source: bank.proto

package pb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// BankClient is the client API for Bank service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type BankClient interface {
	Sync(ctx context.Context, in *SyncRequest, opts ...grpc.CallOption) (Bank_SyncClient, error)
	SyncAnswer(ctx context.Context, in *QuestionAnswer, opts ...grpc.CallOption) (*emptypb.Empty, error)
}

type bankClient struct {
	cc grpc.ClientConnInterface
}

func NewBankClient(cc grpc.ClientConnInterface) BankClient {
	return &bankClient{cc}
}

func (c *bankClient) Sync(ctx context.Context, in *SyncRequest, opts ...grpc.CallOption) (Bank_SyncClient, error) {
	stream, err := c.cc.NewStream(ctx, &Bank_ServiceDesc.Streams[0], "/bank.Bank/Sync", opts...)
	if err != nil {
		return nil, err
	}
	x := &bankSyncClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type Bank_SyncClient interface {
	Recv() (*SyncResponse, error)
	grpc.ClientStream
}

type bankSyncClient struct {
	grpc.ClientStream
}

func (x *bankSyncClient) Recv() (*SyncResponse, error) {
	m := new(SyncResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

func (c *bankClient) SyncAnswer(ctx context.Context, in *QuestionAnswer, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/bank.Bank/SyncAnswer", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// BankServer is the server API for Bank service.
// All implementations must embed UnimplementedBankServer
// for forward compatibility
type BankServer interface {
	Sync(*SyncRequest, Bank_SyncServer) error
	SyncAnswer(context.Context, *QuestionAnswer) (*emptypb.Empty, error)
	mustEmbedUnimplementedBankServer()
}

// UnimplementedBankServer must be embedded to have forward compatible implementations.
type UnimplementedBankServer struct {
}

func (UnimplementedBankServer) Sync(*SyncRequest, Bank_SyncServer) error {
	return status.Errorf(codes.Unimplemented, "method Sync not implemented")
}
func (UnimplementedBankServer) SyncAnswer(context.Context, *QuestionAnswer) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SyncAnswer not implemented")
}
func (UnimplementedBankServer) mustEmbedUnimplementedBankServer() {}

// UnsafeBankServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to BankServer will
// result in compilation errors.
type UnsafeBankServer interface {
	mustEmbedUnimplementedBankServer()
}

func RegisterBankServer(s grpc.ServiceRegistrar, srv BankServer) {
	s.RegisterService(&Bank_ServiceDesc, srv)
}

func _Bank_Sync_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(SyncRequest)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(BankServer).Sync(m, &bankSyncServer{stream})
}

type Bank_SyncServer interface {
	Send(*SyncResponse) error
	grpc.ServerStream
}

type bankSyncServer struct {
	grpc.ServerStream
}

func (x *bankSyncServer) Send(m *SyncResponse) error {
	return x.ServerStream.SendMsg(m)
}

func _Bank_SyncAnswer_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(QuestionAnswer)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(BankServer).SyncAnswer(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bank.Bank/SyncAnswer",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(BankServer).SyncAnswer(ctx, req.(*QuestionAnswer))
	}
	return interceptor(ctx, in, info, handler)
}

// Bank_ServiceDesc is the grpc.ServiceDesc for Bank service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Bank_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bank.Bank",
	HandlerType: (*BankServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "SyncAnswer",
			Handler:    _Bank_SyncAnswer_Handler,
		},
	},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Sync",
			Handler:       _Bank_Sync_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "bank.proto",
}