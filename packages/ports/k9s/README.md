<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/k9s</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/k9s

## Overview

🚧 The sageveil k9s port is a work in progress. The scaffolding is in place, but the actual theme templates still need to be implemented so k9s can inherit the palette inside its TUI.

If you rely on k9s and want to help shape the port, contributions are welcome—see the notes below.

## Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Run the scaffolded build: `pnpm nx run k9s:generate`
3. Inspect `dist/ports/k9s/<version>/`

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/k9s](https://github.com/sageveil/k9s) is used only for easy distribution of the ready-to-use k9s colorscheme plugin.
