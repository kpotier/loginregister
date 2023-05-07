.PHONY: proto

MODULE := banking

proto:
	protoc \
		--proto_path=./proto \
  		--go_out=. --go_opt=module=${MODULE} \
		--go-grpc_out=. --go-grpc_opt=module=${MODULE} \
		--grpc-gateway_out=. --grpc-gateway_opt=module=${MODULE} \
		--openapiv2_out ./api \
  		./proto/*.proto

	# We will use grpc-web when js_out will output typescript. We also don't use
	# grpc-web as it needs envoy and rollup-commonjs: too much overhead.
	# --js_out=import_style=commonjs:static/src/pb \
	# --grpc-web_out=import_style=commonjs,mode=grpcwebtext:static/src/pb \

swagger:
	swagger-codegen generate -i ./api/auth.swagger.json -l typescript-axios -o static/api

swagger-build:
	# TODO: change package name
	# TODO: change any by [key: string]: any
	cd ./static/api; npm run build;
	npm link ./static/api