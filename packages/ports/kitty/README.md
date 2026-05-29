<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/kitty</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/kitty

## Overview

The sageveil kitty port provides a low-contrast, green-tinted terminal palette tuned for long sessions.

## Get the theme

### Prebuilt releases

Grab the ready-to-use theme from the dedicated repository: <https://github.com/sageveil/kitty>. Download the latest release and drop `sageveil.conf` wherever you keep kitty themes.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run kitty:generate`
3. Find the rendered assets under `dist/ports/kitty/`

## Apply sageveil

1. Copy `sageveil.conf` into your kitty config directory (for example `~/.config/kitty/themes/sageveil.conf`).
2. Reference it from your main `kitty.conf`:

   ```conf
   include themes/sageveil.conf
   ```

3. Reload kitty (`ctrl+shift+f5`) or restart your terminal session.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/kitty](https://github.com/sageveil/kitty) is used only for easy distribution of the ready-to-use kitty colorscheme.
