<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/pi</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/pi

## Overview

The sageveil Pi Coding Agent port provides a calm dark TUI theme and configurable matching statusline.

![Sageveil Pi Coding Agent](https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/packages/ports/pi/assets/pi.png)

## Get the theme

## Install

```bash
pi install npm:@sageveil/pi
```

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
- `extensions/sageveil-statusline.ts` – statusline extension entrypoint
- `package.json` – Pi package manifest declaring the extension entrypoint and theme

## Apply sageveil

### Pi package

1. Install the package:

   ```bash
   pi install npm:@sageveil/pi
   # or: pi install git:github.com/sageveil/pi
   ```

2. Pi automatically loads the package's statusline extension and makes its theme available. Select **sageveil** from `/settings`, or set it in `~/.pi/agent/settings.json`:

   ```json
   {
     "theme": "sageveil"
   }
   ```

### Statusline

Optional global settings live in `~/.pi/agent/sageveil.json`:

```json
{
  "statusline": {
    "icon": true,
    "directory": true,
    "gitBranch": true,
    "gitStatus": true,
    "context": "auto",
    "model": true,
    "usage": false,
    "extensionStatuses": true
  }
}
```

All fields are optional; omitted fields use these defaults.

The statusline fields only control visibility and retain their displayed order; there is no `statusline.enabled` setting. `gitBranch` and `gitStatus` are independent. `icon` controls the Pi icon; `directory` controls the repository root name (or current folder); `model` includes the thinking level for reasoning models; and `extensionStatuses` controls the separate extension-status line. `usage` shows cumulative input, output, cache, and cost details. `context` accepts `true`, `false`, or `"auto"`: `true` always shows context usage, `false` never does, and `"auto"` shows it above 75%. Invalid known field types emit a warning and use their defaults; valid configured fields remain honored.

### Local theme file

Copy or symlink the generated theme and extension into Pi's global directories:

```bash
mkdir -p ~/.pi/agent/{extensions/sageveil,themes}
cp dist/ports/pi/themes/sageveil.json ~/.pi/agent/themes/sageveil.json
cp dist/ports/pi/extensions/sageveil-statusline.ts ~/.pi/agent/extensions/sageveil/index.ts
```

Then select `sageveil` from `/settings`.

To load the generated file without installing it, pass it on startup and then select `sageveil` from `/settings`:

```bash
pi --theme dist/ports/pi/themes/sageveil.json
```

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/pi](https://github.com/sageveil/pi) is used only for easy distribution of the ready-to-use Pi Coding Agent colorscheme.
