<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/alacritty</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/alacritty

## Overview

The sageveil alacritty port provides a low-contrast, green-tinted terminal palette tuned for long sessions.

## Build from the monorepo

All sageveil ports will be distributed in their dedicated repos (comming soon). Until then they must be built from source.

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run alacritty:generate` 
3. Find the rendered assets under `dist/ports/alacritty/`

Each build includes a manifest with SHA-256 hashes you can use to verify downloads.

## Apply sageveil

1. Copy `sageveil.toml` into your Alacritty config directory (for example `~/.config/alacritty/themes/sageveil.toml`).
2. Reference it from your main `alacritty.toml`:

   ```toml
   import = ["~/.config/alacritty/themes/sageveil.toml"]
   ```

3. Reload Alacritty or restart your terminal session.

Adjust the `import` path if you keep themes elsewhere.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/alacritty](https://github.com/sageveil/alacritty) is used only for easy distribution of the ready-to-use alacritty colorscheme plugin.

