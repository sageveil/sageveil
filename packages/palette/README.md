<p align="center">
    <img src="../../assets/sageveil-logo.png" width="80" />
    <h2 align="center">Sageveil</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# palette

## Overview

`@sageveil/palette` exposes the canonical Sageveil color map used by every port. The default export, `sageveil`, contains:

- `ansi.base` and `ansi.bright` – terminal-safe RGB values covering the ANSI 16-color space.
- `extras` – utility swatches for surfaces, overlays, borders, muted text, dim accents, and cursor colors.

These values are consumed by the templater package and rendered into each downstream theme so every port stays visually consistent.

## Development

- Run `pnpm test palette` to execute the Vitest suite.
- The palette is intentionally small — changes to the color constants should be paired with visual review in at least one port before releasing.
