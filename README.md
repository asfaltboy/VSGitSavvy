# VSGitSavvy (working name)

A POC extension communicating with our Git Grpc middleware application.

# Build gRPC client

Follow official protobuf README to install the base `protoc` compiler. Then, install the node & typescript plugins:

    yarn
    brew install grpc
    protoc --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" --plugin="protoc-gen-grpc-ts=./node_modules/.bin/protoc-gen-grpc-ts" --plugin="protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin" --plugin="protoc-gen-grpc=/usr/local/bin/grpc_node_plugin" --js_out="import_style=commonjs,binary:out/client" --ts_out="src/client" --grpc-ts_out="src/client" --grpc_out="out/client" helloworld.proto

References:

- https://github.com/grpc/grpc
- https://grpc.io/docs/tutorials/basic/node.html
- https://www.npmjs.com/package/grpc_tools_node_protoc_ts

## Features

A fully featured Git interface for VSCode, modeled after the excellent GitSavvy for sublime.

TODO: add animated gifs showcasing features.

## Release notes

### 0.1

Initial release
