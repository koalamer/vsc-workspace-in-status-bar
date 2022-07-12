# workspace-in-status-bar README

A simple extension that displays the workspace name in the status bar.

The problem it tries to solve is that in full screen mode the workspace name
does not have a constant place on the UI. Only the Explorer panel displays the
workspace name, and that panel is not constantly visible.

## Features

Settings are available to customize label placement and appearance.

When you click the label, the explorer view is opened with collapsed folders.

## Extension Settings

This extension contributes the following settings:

* `workspaceInStatusBar.alignment`: where to alignt the label, left or right
* `workspaceInStatusBar.priority`: alignment priority, greater number means more to the left
* `workspaceInStatusBar.displayFolderIcon`: controls whether to display an icon next to the label text
* `workspaceInStatusBar.uppercase`: makes the workspace name uppercase
* `workspaceInStatusBar.removeWorkspacePostfix`: remove the '(Workspace)' string from the end of workspace names

To set the color of the label, use:

* `workspaceInStatusBar.text`

in your color customization settings.

In the settings JSON you can set this color globally but you can also target a specific theme by putting it into a correctly named entry like this:

```
"workbench.colorCustomizations": {
    "[Monokai]": {
      "workspaceInStatusBar.text": "#7cd5f1"`
    }
}
```
