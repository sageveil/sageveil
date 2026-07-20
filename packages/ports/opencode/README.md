<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/opencode</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/opencode

## Overview

The sageveil OpenCode port provides a calm terminal palette that matches the rest of the ecosystem.

![Sageveil OpenCode](https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/packages/ports/opencode/assets/opencode.png)

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/opencode>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run opencode:generate`
3. The files land in `dist/ports/opencode/`

## Generated files

- `sageveil.json` - OpenCode theme file

## Apply sageveil

1. Copy the generated theme into OpenCode's user theme directory:

   ```bash
   mkdir -p ~/.config/opencode/themes
   cp dist/ports/opencode/sageveil.json ~/.config/opencode/themes/
   ```

2. Select **sageveil** with OpenCode's `/theme` command, or set it in `~/.config/opencode/tui.json`:

   ```json
   {
     "$schema": "https://opencode.ai/tui.json",
     "theme": "sageveil"
   }
   ```

Adjust the theme path or name if you keep themes elsewhere.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/opencode](https://github.com/sageveil/opencode) is used only for easy distribution of the ready-to-use OpenCode colorscheme.
