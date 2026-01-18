<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/ghostty</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/ghostty

## Overview

The sageveil Ghostty port provides a calm terminal palette that matches the rest of the ecosystem.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/ghostty>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run ghostty:generate`
3. The files land in `dist/ports/ghostty/`

## Generated files

- `sageveil` – Ghostty theme file

## Apply sageveil

1. Copy `sageveil` into your Ghostty themes directory (for example `~/.config/ghostty/themes/`).
2. Reference the theme from your Ghostty config, for example:

   ```ini
   theme = "sageveil"
   ```

3. Reload Ghostty to apply the theme.

Adjust the theme path or name if you keep themes elsewhere.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/ghostty](https://github.com/sageveil/ghostty) is used only for easy distribution of the ready-to-use Ghostty colorscheme.
