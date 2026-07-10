<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/qterminal</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/qterminal

## Overview

Sageveil colors for QTerminal and QTermWidget.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/qterminal>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run qterminal:generate`
3. The generated `sageveil.colorscheme` file lands in `dist/ports/qterminal/`.

## Apply Sageveil

Copy the generated file to QTerminal's user-local colorscheme directory:

```sh
mkdir -p ~/.local/share/qterminal/color-schemes
cp sageveil.colorscheme ~/.local/share/qterminal/color-schemes/
```

Select **File → Preferences → Appearance → Color scheme → Sageveil** and apply.

Distribution-dependent system-wide directories are `/usr/share/qtermwidget6/color-schemes/` and `/usr/share/qtermwidget5/color-schemes/`; copying there requires elevated privileges.

## Testing status

This port has not yet been tested in QTerminal. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/qterminal](https://github.com/sageveil/qterminal) is used only for easy distribution of the ready-to-use QTerminal colorscheme.
