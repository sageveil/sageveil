<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/fzf</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/fzf

## Overview

The sageveil fzf port provides shell-specific snippets that configure `FZF_DEFAULT_OPTS` with sageveil colors.
Pick the script that matches your shell and source it during startup to keep fuzzy finder popups aligned with the rest of the palette.

## Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the snippets: `pnpm nx run fzf:generate` 
3. The files land in `dist/ports/fzf/`

## Generated files

- `sageveil.sh` – POSIX shell snippet (bash, zsh, etc.)
- `sageveil.fish` – fish universal variable configuration
- `sageveil.ps1` – PowerShell profile snippet
- `sageveil.nix` – helper for home-manager or NixOS modules

## Apply sageveil

Choose the snippet that matches your environment:

- **POSIX shells**: source the script in your shell rc.

  ```bash
  source /path/to/sageveil.sh
  ```

- **fish**: import the universal variable once.

  ```fish
  source /path/to/sageveil.fish
  ```

- **PowerShell**: dot source the profile helper.

  ```powershell
  . $PSScriptRoot/sageveil.ps1
  ```

- **Nix**: include `sageveil.nix` inside your module and merge the returned options into `programs.fzf` or your own output derivation.

Reload your shell afterwards and confirm `echo $FZF_DEFAULT_OPTS` (or the platform equivalent) shows sageveil colors.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/fzf](https://github.com/sageveil/fzf) is used only for easy distribution of the ready-to-use fzf colorscheme plugin.
