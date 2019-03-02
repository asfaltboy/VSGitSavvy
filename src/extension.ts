// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { MiddlewareClient } from "./client/MiddlewareClient";

let server: MiddlewareClient;

export function activate(context: vscode.ExtensionContext) {
	console.info('[v] extension "vsgitsavvy" is active, versions:', process.versions);

	let runServer = vscode.commands.registerCommand("extension.runServer", async () => {
		server = new MiddlewareClient();
	});

	let getLastOutput = vscode.commands.registerCommand("extension.getLastOutput", () => {
		if (!server) {
			vscode.window.showErrorMessage("Server failed to start, check log!");
		}
		vscode.window.showInformationMessage(server.getLastOutput());
	});

	let gitStatus = vscode.commands.registerCommand("extension.gitStatus", () => {
		if (!server) {
			vscode.window.showErrorMessage("Server failed to start, check log!");
		}
		const status = server.getStatus();
		vscode.window.showInformationMessage(`git status: ${status}`);
	});

	context.subscriptions.push(runServer, gitStatus, getLastOutput);
}

// this method is called when your extension is deactivated
export function deactivate() {}
