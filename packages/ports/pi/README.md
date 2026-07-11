<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/pi</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/pi

## Overview

The sageveil Pi Coding Agent port provides a calm dark TUI theme and matching statusline. The statusline shows the repository root name (or current folder outside Git), Git branch and file-status counts, context usage, and active model. Statuses from other extensions appear on a separate line.

## Get the theme

## Install

```bash
npm install -g @sageveil/pi
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
- `extensions/sageveil-statusline.ts` – matching statusline extension
- `package.json` – Pi package manifest declaring both resources

## Apply sageveil

### Pi package

1. Install the package:

   ```bash
   npm install -g @sageveil/pi
   # or: pi install git:github.com/sageveil/pi
   ```

2. The statusline loads automatically. Select **sageveil** from `/settings`, or set it in `~/.pi/agent/settings.json`:

   ```json
   {
     "theme": "sageveil"
   }
   ```

### Statusline

Reasoning models include the current thinking level beside the model name. To add cumulative token usage, cache statistics, and cost on a detail line, start Pi with:

```bash
SAGEVEIL_STATUSLINE=detailed pi
```

The default compact view omits that detail line and only shows context usage after it exceeds 75%.

### Local theme file

Copy or symlink the generated theme and extension into Pi's global directories:

```bash
mkdir -p ~/.pi/agent/{extensions,themes}
cp dist/ports/pi/themes/sageveil.json ~/.pi/agent/themes/sageveil.json
cp dist/ports/pi/extensions/sageveil-statusline.ts ~/.pi/agent/extensions/sageveil-statusline.ts
```

Then select `sageveil` from `/settings`.

To load the generated file without installing it, pass it on startup and then select `sageveil` from `/settings`:

```bash
pi --theme dist/ports/pi/themes/sageveil.json
```

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/pi](https://github.com/sageveil/pi) is used only for easy distribution of the ready-to-use Pi Coding Agent colorscheme.
