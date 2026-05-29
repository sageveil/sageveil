<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/vscode</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/vscode

## Overview

The sageveil Visual Studio Code port provides a low-contrast, green-tinted theme with full workbench and syntax coverage.

## Get the theme

### Marketplace

Install from the Visual Studio Marketplace: search for **Sageveil** in the Extensions view (or run `ext install sageveil.sageveil`).

### Prebuilt releases

Grab the ready-to-use extension bundle from the dedicated repository: <https://github.com/sageveil/vscode>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run vscode:generate`
3. Find the rendered extension under `dist/ports/vscode/` (`package.json` manifest + `themes/sageveil-color-theme.json`).

## Apply sageveil

1. Install the extension (marketplace, `.vsix`, or symlink `dist/ports/vscode/` into `~/.vscode/extensions/sageveil.sageveil-*`).
2. Open the Command Palette (`cmd+shift+p` / `ctrl+shift+p`), run **Preferences: Color Theme**, and pick **Sageveil**.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/vscode](https://github.com/sageveil/vscode) is used only for easy distribution of the ready-to-use Visual Studio Code extension.
