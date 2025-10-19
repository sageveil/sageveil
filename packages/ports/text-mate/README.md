<p align="center">
    <img src="../../../assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/text-mate</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/text-mate

## Overview

This sageveil port ships a TextMate theme (`.tmTheme`) that keeps bat’s syntax highlighting consistent with the rest of the palette.
It’s perfect for pairing with the Alacritty and tmux ports in the same terminal session.

## Build from the monorepo

All sageveil ports will be distributed in their dedicated repos (comming soon). Until then they must be built from source.

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run text-mate:generate` (append `-- --skip-archive` to skip the `.tar.gz` bundle)
3. The files land in `dist/ports/text-mate/<version>/`

Each build includes a manifest with SHA-256 hashes for integrity checks.

## Apply sageveil

1. Copy `sageveil.tmTheme` to your bat theme directory, for example:

   ```bash
   mkdir -p ~/.config/bat/themes
   cp sageveil.tmTheme ~/.config/bat/themes/
   ```

2. Rebuild bat’s theme cache: `bat cache --build`
3. Set the theme (temporarily with `BAT_THEME=sageveil bat <file>` or permanently in your shell rc)

The theme name inside the file is `sageveil`, so make sure your `BAT_THEME` matches the capitalization.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/nvim](https://github.com/sageveil/nvim) is used only for easy distribution of the ready-to-use nvim colorscheme plugin.
