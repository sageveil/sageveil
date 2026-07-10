<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/terminal-app</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/terminal-app

## Overview

Sageveil profile colors for macOS Terminal.

## Get the theme

Download the prebuilt profile from <https://github.com/sageveil/terminal-app>.

Or generate it from the monorepo:

```sh
pnpm nx run terminal-app:generate
```

The profile is written to `dist/ports/terminal-app/sageveil.terminal`.

## Install

Double-click `sageveil.terminal`, or use **Terminal → Settings → Profiles → … → Import**.

Select **Sageveil** after importing and, if wanted, click **Default**. Importing adds the profile only; making it the default is a separate choice.

## Testing status

This port has not yet been tested in Terminal.app. Please report any issues.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/terminal-app](https://github.com/sageveil/terminal-app) distributes the ready-to-use Terminal.app profile.
