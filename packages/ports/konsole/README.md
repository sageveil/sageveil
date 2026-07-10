<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/konsole</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/konsole

## Overview

Sageveil colors for the KDE Konsole terminal.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/konsole>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run konsole:generate`
3. The generated `sageveil.colorscheme` file lands in `dist/ports/konsole/`.

## Apply Sageveil

Copy the generated file to your user-local Konsole colorscheme directory:

```sh
mkdir -p ~/.local/share/konsole
cp sageveil.colorscheme ~/.local/share/konsole/
```

Activate it in **Settings → Manage Profiles → Edit Profile → Appearance → Sageveil**.

## Testing status

This port has not yet been tested in Konsole. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/konsole](https://github.com/sageveil/konsole) is used only for easy distribution of the ready-to-use Konsole colorscheme.
