<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/foot</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/foot

## Overview

Sageveil colors for the foot Wayland terminal.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/foot>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run foot:generate`
3. The files land in `dist/ports/foot/`

## Generated files

- `sageveil` – foot theme file

## Apply sageveil

1. Copy `sageveil` to a stable location, for example `~/.config/foot/themes/sageveil`.
2. Add the following to `~/.config/foot/foot.ini`:

   ```ini
   include=~/.config/foot/themes/sageveil
   ```

Adjust the include path if you keep themes elsewhere.

## Testing status

This port has not yet been tested in foot. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/foot](https://github.com/sageveil/foot) is used only for easy distribution of the ready-to-use foot colorscheme.
