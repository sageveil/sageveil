<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/palette</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/palette

## Install

```sh
npm install @sageveil/palette
```

## Overview

`@sageveil/palette` exposes the canonical `sageveil` color map used by every port. It contains:

- `ansi.base` and `ansi.bright` – terminal-safe RGB values covering the ANSI 16-color space.
- `extras` – utility swatches for surfaces, overlays, borders, muted text, dim accents, and cursor colors.

These values are consumed by the templater package and rendered into each downstream theme so every port stays visually consistent.
