<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/xfce-terminal</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/xfce-terminal

## Overview

Sageveil colors for XFCE Terminal.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/xfce-terminal>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run xfce-terminal:generate`
3. The generated `sageveil.theme` file lands in `dist/ports/xfce-terminal/`.

## Apply Sageveil

Copy the generated file to XFCE Terminal's user-local colorscheme directory:

```sh
mkdir -p ~/.config/xfce4/terminal/colorschemes
cp sageveil.theme ~/.config/xfce4/terminal/colorschemes/
```

Restart XFCE Terminal, then choose **Edit → Preferences → Colors → Presets → Sageveil**.

The system-wide directory is `/usr/share/xfce4/terminal/colorschemes/`; copying there requires elevated privileges.

## Testing status

This port has not yet been tested in XFCE Terminal. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/xfce-terminal](https://github.com/sageveil/xfce-terminal) is used only for easy distribution of the ready-to-use XFCE Terminal colorscheme.
