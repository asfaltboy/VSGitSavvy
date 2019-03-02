// package: helloworld
// file: helloworld.proto

import * as GRPC from "grpc";
import * as helloworld_pb from "./helloworld_pb";

export = Greeter;
declare namespace Greeter {
  class GreeterClient extends GRPC.Client {
    sayHello(request: helloworld_pb.HelloRequest, options: Partial<GRPC.CallOptions>, metadata: GRPC.Metadata, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHello(request: helloworld_pb.HelloRequest, options: Partial<GRPC.CallOptions>, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHello(request: helloworld_pb.HelloRequest, metadata: GRPC.Metadata, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHello(request: helloworld_pb.HelloRequest, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHelloAgain(request: helloworld_pb.HelloRequest, options: Partial<GRPC.CallOptions>, metadata: GRPC.Metadata, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHelloAgain(request: helloworld_pb.HelloRequest, options: Partial<GRPC.CallOptions>, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHelloAgain(request: helloworld_pb.HelloRequest, metadata: GRPC.Metadata, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
    sayHelloAgain(request: helloworld_pb.HelloRequest, callback: GRPC.requestCallback<helloworld_pb.HelloReply>): GRPC.ClientUnaryCall;
  }

  namespace MethodImplTypes {
    type sayHello = GRPC.handleUnaryCall<helloworld_pb.HelloRequest, helloworld_pb.HelloReply>;
    type sayHelloAgain = GRPC.handleUnaryCall<helloworld_pb.HelloRequest, helloworld_pb.HelloReply>;
  }
  interface MethodImpls {
    sayHello: MethodImplTypes.sayHello;
    sayHelloAgain: MethodImplTypes.sayHelloAgain;
  }
  interface GreeterService extends GRPC.ServiceDefinition<MethodImpls> {
    sayHello: GRPC.MethodDefinition<helloworld_pb.HelloRequest, helloworld_pb.HelloReply>;
    sayHelloAgain: GRPC.MethodDefinition<helloworld_pb.HelloRequest, helloworld_pb.HelloReply>;
  }

}
