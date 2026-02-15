<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/ish</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/ish

## Overview

The sageveil ish port provides a calm terminal palette that matches the rest of the ecosystem.

## Get the theme

### Prebuilt releases

Download the theme from the dedicated repository: <https://github.com/sageveil/ish>.

### Build from the monorepo

1. Install dependencies once: `pnpm install`
2. Render the theme: `pnpm nx run ish:generate`
3. The files land in `dist/ports/ish/`

## Generated files

- `sageveil.json` – ish theme file

## Apply sageveil

### 1. Create and mount the iSH theme directory

```sh
mkdir -p /mnt/themes
mount -t real "$(cat /proc/ish/documents)/themes" /mnt/themes
```

### 2. Copy the theme file into the mounted folder

If you downloaded a prebuilt release, copy the JSON file from the repo checkout:

```sh
cp /path/to/sageveil.json /mnt/themes
```

If you generated the theme locally, copy it from the build output:

```sh
cp dist/ports/ish/sageveil.json /mnt/themes
```

You can also download the JSON file manually to the iSH theme directory without cloning the repository.

### 3. Activate the theme in `Settings > Appearance > Theme`

Adjust the theme path or name if you keep themes elsewhere.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/ish](https://github.com/sageveil/ish) is used only for easy distribution of the ready-to-use ish colorscheme.
