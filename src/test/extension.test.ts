//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as myExtension from "../extension";

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {
	// Defines a Mocha unit test
	test("Call hello world", function() {
		vscode.commands.executeCommand("extension.helloWorld");
		assert.equal(-1, [1, 2, 3].indexOf(0));
	});
});
