import * as cp from "child_process";
import { credentials } from "grpc";
import { HelloRequest } from "./helloworld_pb";
import { GreeterClient } from "./helloworld_grpc_pb";

interface SpawnedService {
	status: "undefined" | "running" | "stopped" | "failed";
	pid: number;
	lastStdout: string;
	process: cp.ChildProcess;
}

export class MiddlewareClient {
	service: SpawnedService;
	port?: number;
	client?: GreeterClient;

	constructor();
	constructor(service?: SpawnedService) {
		if (!service) {
			service = this.startService();
		}
		this.service = service;
		this.bindServiceHandlers(this.service);
		this.startClient(50051);
	}
	private startService(): SpawnedService {
		const process = cp.spawn(
			"/Users/pavel.savchenko/go/bin/greeter_server"
			// "/Users/pavel.savchenko/.pyenv/versions/3.6.8/bin/python3",
			// ["greeter_server.py"],
			// { cwd: "/Users/pavel.savchenko/github/grpc/examples/python/helloworld" }
		);
		if (process.killed) {
			console.error(
				"[x] service could not start:",
				process.stderr.read(),
				process.stdout.read(),
				process.pid
			);
			throw Error("Greeter server service cannot be started");
		}
		const service: SpawnedService = {
			status: "running",
			lastStdout: "",
			pid: process.pid,
			process: process
		};
		console.info("[v] service started:", service);
		return service;
	}
	private startClient(port: number) {
		this.client = new GreeterClient(`localhost:${port}`, credentials.createInsecure());
	}
	private bindServiceHandlers(service: SpawnedService) {
		// since we're using "this" in the handler, we have to bind to our instance
		console.info("[v] Attaching handlers to service");
		service.process.on("error", this.onProcessError.bind(this));
		service.process.on("close", this.onServiceClose.bind(this));
		service.process.stderr.on("data", this.onStdOut.bind(this));
		service.process.stdout.on("data", this.onStdOut.bind(this));
	}
	private onServiceClose(code: number, signal: string) {
		console.info(`[x] service closed with code: ${code}, signal: ${signal}`);
		if (code !== 0) {
			this.service.status = "failed";
		} else {
			this.service.status = "stopped";
		}
	}
	private onStdOut(data: Buffer) {
		const output = data.toString();
		console.info("[+] received data from service on stdout:", output);
		if (this.port) {
			console.warn("client already running, killing it first");
			this.client = undefined;
		}
		try {
			this.port = Number(output);
			this.startClient(this.port);
		} catch (error) {
			switch (error.constructor) {
				case TypeError:
					return console.error("Invalid port returned!");
				default:
					throw error;
			}
		}
		this.service.lastStdout = output;
	}
	// private onGRPC(data: Buffer) {}
	private onProcessError(err: Error) {
		console.error("[x] error occurred:", err);
	}

	getStatus() {
		if (!this.client) {
			throw Error("MiddlwareClient hasn't established connection yet");
		}
		const request = new HelloRequest();
		request.setName("Foobar");
		this.client.sayHello(request, function(err, response) {
			if (err) {
				console.error("Error:", err);
				throw err;
			}
			if (response) {
				console.log("Greeting:", response.getMessage());
			}
		});
		const request2 = new HelloRequest();
		this.client.sayHello(request2, function(err, response) {
			if (err) {
				console.error("Error:", err);
				throw err;
			}
			if (response) {
				console.log("Greeting:", response.getMessage());
			}
		});
	}
	getLastOutput(): string {
		return this.service.lastStdout;
	}
	isRunning(): boolean {
		console.info("Checking the status of the server: ", this.service.status);
		return this.service.status === "running";
	}
}
