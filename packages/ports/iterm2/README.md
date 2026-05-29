<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/iterm2</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/iterm2

## Overview

The sageveil iTerm2 port provides a low-contrast, green-tinted terminal palette tuned for long sessions.

## Get the theme

### Prebuilt releases

Grab the ready-to-use theme from the dedicated repository: <https://github.com/sageveil/iterm2>. Download the latest release and import `sageveil.itermcolors` into iTerm2.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Generate the theme: `pnpm nx run iterm2:generate`
3. Find the rendered assets under `dist/ports/iterm2/`

## Apply sageveil

1. Double-click `sageveil.itermcolors` to import it into iTerm2, or import via **Preferences → Profiles → Colors → Color Presets… → Import…**.
2. With the colorscheme imported, select **sageveil** from the **Color Presets…** dropdown.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/iterm2](https://github.com/sageveil/iterm2) is used only for easy distribution of the ready-to-use iTerm2 colorscheme.
