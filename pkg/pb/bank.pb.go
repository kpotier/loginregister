// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        v3.21.12
// source: bank.proto

package pb

import (
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type SyncRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	AESKey []byte `protobuf:"bytes,1,opt,name=AES_key,json=AESKey,proto3" json:"AES_key,omitempty"`
}

func (x *SyncRequest) Reset() {
	*x = SyncRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bank_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SyncRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SyncRequest) ProtoMessage() {}

func (x *SyncRequest) ProtoReflect() protoreflect.Message {
	mi := &file_bank_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SyncRequest.ProtoReflect.Descriptor instead.
func (*SyncRequest) Descriptor() ([]byte, []int) {
	return file_bank_proto_rawDescGZIP(), []int{0}
}

func (x *SyncRequest) GetAESKey() []byte {
	if x != nil {
		return x.AESKey
	}
	return nil
}

type QuestionAnswer struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Code     string `protobuf:"bytes,1,opt,name=code,proto3" json:"code,omitempty"`
	Question string `protobuf:"bytes,2,opt,name=question,proto3" json:"question,omitempty"`
}

func (x *QuestionAnswer) Reset() {
	*x = QuestionAnswer{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bank_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *QuestionAnswer) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*QuestionAnswer) ProtoMessage() {}

func (x *QuestionAnswer) ProtoReflect() protoreflect.Message {
	mi := &file_bank_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use QuestionAnswer.ProtoReflect.Descriptor instead.
func (*QuestionAnswer) Descriptor() ([]byte, []int) {
	return file_bank_proto_rawDescGZIP(), []int{1}
}

func (x *QuestionAnswer) GetCode() string {
	if x != nil {
		return x.Code
	}
	return ""
}

func (x *QuestionAnswer) GetQuestion() string {
	if x != nil {
		return x.Question
	}
	return ""
}

type SyncResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	// Types that are assignable to Response:
	//	*SyncResponse_Error_
	//	*SyncResponse_Position
	//	*SyncResponse_Question
	Response isSyncResponse_Response `protobuf_oneof:"response"`
}

func (x *SyncResponse) Reset() {
	*x = SyncResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bank_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SyncResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SyncResponse) ProtoMessage() {}

func (x *SyncResponse) ProtoReflect() protoreflect.Message {
	mi := &file_bank_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SyncResponse.ProtoReflect.Descriptor instead.
func (*SyncResponse) Descriptor() ([]byte, []int) {
	return file_bank_proto_rawDescGZIP(), []int{2}
}

func (x *SyncResponse) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (m *SyncResponse) GetResponse() isSyncResponse_Response {
	if m != nil {
		return m.Response
	}
	return nil
}

func (x *SyncResponse) GetError() *SyncResponse_Error {
	if x, ok := x.GetResponse().(*SyncResponse_Error_); ok {
		return x.Error
	}
	return nil
}

func (x *SyncResponse) GetPosition() int64 {
	if x, ok := x.GetResponse().(*SyncResponse_Position); ok {
		return x.Position
	}
	return 0
}

func (x *SyncResponse) GetQuestion() *QuestionAnswer {
	if x, ok := x.GetResponse().(*SyncResponse_Question); ok {
		return x.Question
	}
	return nil
}

type isSyncResponse_Response interface {
	isSyncResponse_Response()
}

type SyncResponse_Error_ struct {
	Error *SyncResponse_Error `protobuf:"bytes,2,opt,name=error,proto3,oneof"`
}

type SyncResponse_Position struct {
	Position int64 `protobuf:"varint,3,opt,name=position,proto3,oneof"`
}

type SyncResponse_Question struct {
	Question *QuestionAnswer `protobuf:"bytes,4,opt,name=question,proto3,oneof"`
}

func (*SyncResponse_Error_) isSyncResponse_Response() {}

func (*SyncResponse_Position) isSyncResponse_Response() {}

func (*SyncResponse_Question) isSyncResponse_Response() {}

type SyncResponse_Error struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ErrCode string `protobuf:"bytes,1,opt,name=err_code,json=errCode,proto3" json:"err_code,omitempty"`
	Err     string `protobuf:"bytes,2,opt,name=err,proto3" json:"err,omitempty"`
}

func (x *SyncResponse_Error) Reset() {
	*x = SyncResponse_Error{}
	if protoimpl.UnsafeEnabled {
		mi := &file_bank_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SyncResponse_Error) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SyncResponse_Error) ProtoMessage() {}

func (x *SyncResponse_Error) ProtoReflect() protoreflect.Message {
	mi := &file_bank_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SyncResponse_Error.ProtoReflect.Descriptor instead.
func (*SyncResponse_Error) Descriptor() ([]byte, []int) {
	return file_bank_proto_rawDescGZIP(), []int{2, 0}
}

func (x *SyncResponse_Error) GetErrCode() string {
	if x != nil {
		return x.ErrCode
	}
	return ""
}

func (x *SyncResponse_Error) GetErr() string {
	if x != nil {
		return x.Err
	}
	return ""
}

var File_bank_proto protoreflect.FileDescriptor

var file_bank_proto_rawDesc = []byte{
	0x0a, 0x0a, 0x62, 0x61, 0x6e, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x04, 0x62, 0x61,
	0x6e, 0x6b, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x61,
	0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x26, 0x0a,
	0x0b, 0x53, 0x79, 0x6e, 0x63, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07,
	0x41, 0x45, 0x53, 0x5f, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0c, 0x52, 0x06, 0x41,
	0x45, 0x53, 0x4b, 0x65, 0x79, 0x22, 0x40, 0x0a, 0x0e, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f,
	0x6e, 0x41, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x12, 0x12, 0x0a, 0x04, 0x63, 0x6f, 0x64, 0x65, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x63, 0x6f, 0x64, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0xe8, 0x01, 0x0a, 0x0c, 0x53, 0x79, 0x6e, 0x63,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65,
	0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x30, 0x0a, 0x05,
	0x65, 0x72, 0x72, 0x6f, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x62, 0x61,
	0x6e, 0x6b, 0x2e, 0x53, 0x79, 0x6e, 0x63, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e,
	0x45, 0x72, 0x72, 0x6f, 0x72, 0x48, 0x00, 0x52, 0x05, 0x65, 0x72, 0x72, 0x6f, 0x72, 0x12, 0x1c,
	0x0a, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x03,
	0x48, 0x00, 0x52, 0x08, 0x70, 0x6f, 0x73, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x32, 0x0a, 0x08,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14,
	0x2e, 0x62, 0x61, 0x6e, 0x6b, 0x2e, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e, 0x41, 0x6e,
	0x73, 0x77, 0x65, 0x72, 0x48, 0x00, 0x52, 0x08, 0x71, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f, 0x6e,
	0x1a, 0x34, 0x0a, 0x05, 0x45, 0x72, 0x72, 0x6f, 0x72, 0x12, 0x19, 0x0a, 0x08, 0x65, 0x72, 0x72,
	0x5f, 0x63, 0x6f, 0x64, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x65, 0x72, 0x72,
	0x43, 0x6f, 0x64, 0x65, 0x12, 0x10, 0x0a, 0x03, 0x65, 0x72, 0x72, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x03, 0x65, 0x72, 0x72, 0x42, 0x0a, 0x0a, 0x08, 0x72, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x32, 0xab, 0x01, 0x0a, 0x04, 0x42, 0x61, 0x6e, 0x6b, 0x12, 0x46, 0x0a, 0x04, 0x53,
	0x79, 0x6e, 0x63, 0x12, 0x11, 0x2e, 0x62, 0x61, 0x6e, 0x6b, 0x2e, 0x53, 0x79, 0x6e, 0x63, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x12, 0x2e, 0x62, 0x61, 0x6e, 0x6b, 0x2e, 0x53, 0x79,
	0x6e, 0x63, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x15, 0x82, 0xd3, 0xe4, 0x93,
	0x02, 0x0f, 0x22, 0x0d, 0x2f, 0x76, 0x31, 0x2f, 0x62, 0x61, 0x6e, 0x6b, 0x2f, 0x73, 0x79, 0x6e,
	0x63, 0x30, 0x01, 0x12, 0x5b, 0x0a, 0x0a, 0x53, 0x79, 0x6e, 0x63, 0x41, 0x6e, 0x73, 0x77, 0x65,
	0x72, 0x12, 0x14, 0x2e, 0x62, 0x61, 0x6e, 0x6b, 0x2e, 0x51, 0x75, 0x65, 0x73, 0x74, 0x69, 0x6f,
	0x6e, 0x41, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22,
	0x1f, 0x82, 0xd3, 0xe4, 0x93, 0x02, 0x19, 0x22, 0x14, 0x2f, 0x76, 0x31, 0x2f, 0x62, 0x61, 0x6e,
	0x6b, 0x2f, 0x73, 0x79, 0x6e, 0x63, 0x2f, 0x61, 0x6e, 0x73, 0x77, 0x65, 0x72, 0x3a, 0x01, 0x2a,
	0x42, 0x10, 0x5a, 0x0e, 0x62, 0x61, 0x6e, 0x6b, 0x69, 0x6e, 0x67, 0x2f, 0x70, 0x6b, 0x67, 0x2f,
	0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_bank_proto_rawDescOnce sync.Once
	file_bank_proto_rawDescData = file_bank_proto_rawDesc
)

func file_bank_proto_rawDescGZIP() []byte {
	file_bank_proto_rawDescOnce.Do(func() {
		file_bank_proto_rawDescData = protoimpl.X.CompressGZIP(file_bank_proto_rawDescData)
	})
	return file_bank_proto_rawDescData
}

var file_bank_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_bank_proto_goTypes = []interface{}{
	(*SyncRequest)(nil),        // 0: bank.SyncRequest
	(*QuestionAnswer)(nil),     // 1: bank.QuestionAnswer
	(*SyncResponse)(nil),       // 2: bank.SyncResponse
	(*SyncResponse_Error)(nil), // 3: bank.SyncResponse.Error
	(*emptypb.Empty)(nil),      // 4: google.protobuf.Empty
}
var file_bank_proto_depIdxs = []int32{
	3, // 0: bank.SyncResponse.error:type_name -> bank.SyncResponse.Error
	1, // 1: bank.SyncResponse.question:type_name -> bank.QuestionAnswer
	0, // 2: bank.Bank.Sync:input_type -> bank.SyncRequest
	1, // 3: bank.Bank.SyncAnswer:input_type -> bank.QuestionAnswer
	2, // 4: bank.Bank.Sync:output_type -> bank.SyncResponse
	4, // 5: bank.Bank.SyncAnswer:output_type -> google.protobuf.Empty
	4, // [4:6] is the sub-list for method output_type
	2, // [2:4] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_bank_proto_init() }
func file_bank_proto_init() {
	if File_bank_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_bank_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SyncRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_bank_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*QuestionAnswer); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_bank_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SyncResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_bank_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SyncResponse_Error); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_bank_proto_msgTypes[2].OneofWrappers = []interface{}{
		(*SyncResponse_Error_)(nil),
		(*SyncResponse_Position)(nil),
		(*SyncResponse_Question)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_bank_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_bank_proto_goTypes,
		DependencyIndexes: file_bank_proto_depIdxs,
		MessageInfos:      file_bank_proto_msgTypes,
	}.Build()
	File_bank_proto = out.File
	file_bank_proto_rawDesc = nil
	file_bank_proto_goTypes = nil
	file_bank_proto_depIdxs = nil
}