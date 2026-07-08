<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/starship</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/starship

## Overview

sageveil’s Starship port provides a calm, minimal prompt configuration with a green-tinted palette.

![Sageveil Starship prompt](https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/packages/ports/starship/assets/starship.png)

## Get the theme

### Prebuilt releases

Download the latest ready-to-use config from <https://github.com/sageveil/starship>. Releases ship `sageveil.toml`.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run starship:generate`
3. Grab `dist/ports/starship/sageveil.toml`

## Apply sageveil

Copy or symlink `sageveil.toml` to your Starship config path:

```sh
mkdir -p ~/.config
cp sageveil.toml ~/.config/starship.toml
```

Or preview it without replacing your config:

```sh
STARSHIP_CONFIG=/path/to/sageveil.toml starship prompt
```

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/starship](https://github.com/sageveil/starship) is used only for easy distribution of the ready-to-use Starship config.
