<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/k9s</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/k9s

## Overview

The sageveil k9s port ships a skin file that aligns k9s with the rest of the palette.

## Get the skin

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/k9s>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the skin: `pnpm nx run k9s:generate`
3. The files land in `dist/ports/k9s/`

## Generated files

- `sageveil.yaml` – k9s skin file

## Apply sageveil

1. Copy `sageveil.yaml` into your k9s skins directory (for example `~/.config/k9s/skins/`).
2. Reference the skin from your k9s config:

   ```yaml
   k9s:
     skin: sageveil
   ```

3. Reload k9s to apply the theme.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/k9s](https://github.com/sageveil/k9s) is used only for easy distribution of the ready-to-use k9s colorscheme plugin.
