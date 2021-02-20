import * as vscode from "vscode";

let statusBarWorkspaceLabel: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	updateLabelProperties();
	context.subscriptions.push(statusBarWorkspaceLabel);
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(updateLabelProperties));
}

function updateLabelProperties() {
	let alignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Left;
	let priority: number = 99999;
	let text: string = vscode.workspace.name || "";
	let tooltip: string = "Current Workspace";
	let command: string = "workbench.view.explorer";
	let color: vscode.ThemeColor = new vscode.ThemeColor("workspaceInStatusBar.text");
	let displayFolderIcon: boolean = false;
	let uppercaseName: boolean = true;

	let config = vscode.workspace.getConfiguration("workspaceInStatusBar");

	if (config.has("alignment")) {
		let v = config.get("alignment");
		if (v === "right") {
			alignment = vscode.StatusBarAlignment.Right;
		}
	}

	if (config.has("priority")) {
		priority = config.get("priority") || priority;
	}

	if (config.has("displayFolderIcon")) {
		displayFolderIcon = config.get("displayFolderIcon") || false;
	}

	if (config.has("uppercase")) {
		uppercaseName = config.get("uppercase") || false;
	}

	if (uppercaseName) {
		text = text.toLocaleUpperCase();
	}

	if (displayFolderIcon) {
		text = "🖿 " + text;
	}

	if (typeof statusBarWorkspaceLabel !== "undefined") {
		statusBarWorkspaceLabel.hide();
		statusBarWorkspaceLabel.dispose();
	}

	// alignment and priority do not update later, have to create new object 
	statusBarWorkspaceLabel = vscode.window.createStatusBarItem(alignment, priority);
	statusBarWorkspaceLabel.text = text;
	statusBarWorkspaceLabel.tooltip = tooltip;
	statusBarWorkspaceLabel.command = command;
	statusBarWorkspaceLabel.color = color;

	if (vscode.workspace.name) {
		statusBarWorkspaceLabel.show();
	} else {
		statusBarWorkspaceLabel.hide();
	}
}