<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/zed</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/zed

## Overview

The sageveil Zed port provides a low-contrast, green-tinted theme with full editor and terminal coverage.

## Get the theme

### Zed extensions registry

Open the Command Palette (`cmd+shift+p`), run **zed: extensions**, search for **Sageveil**, and install.

### Prebuilt releases

Grab the ready-to-use extension bundle from the dedicated repository: <https://github.com/sageveil/zed>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run zed:generate`
3. Find the rendered extension under `dist/ports/zed/` (`extension.toml` manifest + `themes/sageveil.json`).

## Apply sageveil

1. Install the extension via the Zed registry or by symlinking `dist/ports/zed/` into `~/.local/share/zed/extensions/installed/sageveil/`.
2. Open the theme selector (`cmd+k cmd+t`) and pick **Sageveil**.

Alternatively, drop just `themes/sageveil.json` into `~/.config/zed/themes/` and select it from the theme picker.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/zed](https://github.com/sageveil/zed) is used only for easy distribution of the ready-to-use Zed extension.
