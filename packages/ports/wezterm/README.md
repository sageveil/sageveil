<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/wezterm</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/wezterm

## Overview

The sageveil WezTerm port provides a low-contrast, green-tinted terminal palette tuned for long sessions.

## Get the theme

### Prebuilt releases

Grab the ready-to-use theme from the dedicated repository: <https://github.com/sageveil/wezterm>. Download the latest release and drop `sageveil.toml` wherever you keep WezTerm color schemes.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run wezterm:generate`
3. Find the rendered assets under `dist/ports/wezterm/`

## Apply sageveil

1. Copy `sageveil.toml` into your WezTerm color scheme directory (`~/.config/wezterm/colors/sageveil.toml`).
2. Reference it from your `wezterm.lua`:

   ```lua
   config.color_scheme = 'sageveil'
   ```

3. Reload WezTerm (`ctrl+shift+r`) or restart your terminal session.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/wezterm](https://github.com/sageveil/wezterm) is used only for easy distribution of the ready-to-use WezTerm colorscheme.
