<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/pi</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/pi

## Overview

The sageveil Pi Coding Agent port provides a calm dark TUI theme for Pi's chat UI, markdown rendering, tool boxes, diffs, syntax highlighting, thinking-level borders, and HTML export.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/pi>.

You can also install the repository as a Pi package:

```bash
pi install git:github.com/sageveil/pi
```

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run pi:generate`
3. The files land in `dist/ports/pi/`

## Generated files

- `themes/sageveil.json` – Pi theme file
- `package.json` – Pi package manifest declaring the theme

## Apply sageveil

### Pi package

1. Install the package:

   ```bash
   pi install git:github.com/sageveil/pi
   ```

2. Select **sageveil** from `/settings`, or set it in `~/.pi/agent/settings.json`:

   ```json
   {
     "theme": "sageveil"
   }
   ```

### Local theme file

Copy or symlink the generated theme into Pi's global theme directory:

```bash
mkdir -p ~/.pi/agent/themes
cp dist/ports/pi/themes/sageveil.json ~/.pi/agent/themes/sageveil.json
```

Then select `sageveil` from `/settings`.

To load the generated file without installing it, pass it on startup and then select `sageveil` from `/settings`:

```bash
pi --theme dist/ports/pi/themes/sageveil.json
```

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/pi](https://github.com/sageveil/pi) is used only for easy distribution of the ready-to-use Pi Coding Agent colorscheme.
