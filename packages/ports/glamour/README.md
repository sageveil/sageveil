<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/glamour</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/glamour

## Overview

The sageveil Glamour port provides a calm terminal palette that matches the rest of the ecosystem.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/glamour>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run glamour:generate`
3. The files land in `dist/ports/glamour/`

## Generated files

- `sageveil` – Glamour theme file

## Apply sageveil

Glamour themes are JSON files. Point your app at the generated file.

### glab

1. Set the theme path:

   ```bash
   glab config set glamour_style /absolute/path/to/dist/ports/glamour/sageveil.json
   ```

2. Verify:

   ```bash
   glab config get glamour_style
   ```

3. Temporary override:

   ```bash
   GLAMOUR_STYLE=/absolute/path/to/dist/ports/glamour/sageveil.json glab <command>
   ```

> [!note]
> Glamour styles only apply to Markdown rendering. `glab --help` output is not themed.

Adjust the theme path or name if you keep themes elsewhere.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/glamour](https://github.com/sageveil/glamour) is used only for easy distribution of the ready-to-use Glamour colorscheme.
