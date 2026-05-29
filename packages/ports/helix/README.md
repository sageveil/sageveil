<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/helix</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/helix

## Overview

The sageveil Helix port provides a low-contrast, green-tinted syntax palette tuned for long sessions.

## Get the theme

### Prebuilt releases

Grab the ready-to-use theme from the dedicated repository: <https://github.com/sageveil/helix>. Download the latest release and drop `sageveil.toml` wherever you keep Helix themes.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run helix:generate`
3. Find the rendered assets under `dist/ports/helix/`

## Apply sageveil

1. Copy `sageveil.toml` into your Helix themes directory (`~/.config/helix/themes/sageveil.toml`).
2. Set it in your `~/.config/helix/config.toml`:

   ```toml
   theme = "sageveil"
   ```

3. Reload Helix or run `:theme sageveil`.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/helix](https://github.com/sageveil/helix) is used only for easy distribution of the ready-to-use Helix colorscheme.
