import * as vscode from "vscode";

let statusBarWorkspaceLabel: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	updateLabelProperties();
	context.subscriptions.push(statusBarWorkspaceLabel);
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(updateLabelProperties));

	context.subscriptions.push(vscode.commands.registerCommand("workspaceInStatusBar.click", () => {
		vscode.commands.executeCommand("workbench.view.explorer");
		vscode.commands.executeCommand("workbench.files.action.collapseExplorerFolders");
	}));

}

function updateLabelProperties() {
	let alignment: vscode.StatusBarAlignment = vscode.StatusBarAlignment.Left;
	let priority: number = 99999999999999999999;
	let text: string = vscode.workspace.name || "";
	let tooltip: string = "Current Workspace";
	let command: string = "workspaceInStatusBar.click";
	let color: vscode.ThemeColor = new vscode.ThemeColor("workspaceInStatusBar.text");
	let displayFolderIcon: boolean = true;
	let uppercaseName: boolean = false;
	let removeWorkspacePostfix: boolean = true;

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

	if (config.has("removeWorkspacePostfix")) {
		removeWorkspacePostfix = config.get("removeWorkspacePostfix") || false;
	}

	if (config.has("clickCommand")) {
		command = config.get("clickCommand") || command;
	}

	const currentLocale: string = (vscode && vscode.env && vscode.env.language) ? vscode.env.language : "en";
	const workspacePostfixes: {[index: string]: string} = {
		de: " (Arbeitsbereich)",
		en: " (Workspace)",
		es: " (área de trabajo)",
		fr: " (Espace de travail)",
		it: " (Area di lavoro)"
	};
	
	let workspacePostfix = workspacePostfixes[currentLocale] ? workspacePostfixes[currentLocale] : workspacePostfixes.en;
	let isWorkspace = text.endsWith(workspacePostfix);

	if (removeWorkspacePostfix) {
		if (isWorkspace) {
			text = text.substr(0, text.length - workspacePostfix.length);
		}
	}

	if (uppercaseName) {
		text = text.toLocaleUpperCase();
	}

	if (displayFolderIcon) {
		if (isWorkspace) {
			text = "$(folder-active) " + text;
		} else {
			text = "$(folder) " + text;
		}
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
