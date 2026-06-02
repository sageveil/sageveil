<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/css</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/css

## Overview

The sageveil CSS port ships the palette as CSS custom properties, SCSS variables, a Tailwind v4 theme, and JS/TS design tokens.

## Install

```sh
npm install @sageveil/css
# or: pnpm add @sageveil/css / yarn add @sageveil/css
```

## Usage

### CSS custom properties

Defines `--sv-*` variables on `:root`.

```css
@import '@sageveil/css/css';

body {
  background: var(--sv-black);
  color: var(--sv-white);
  accent-color: var(--sv-green);
}
```

### SCSS variables

Exposes `$sv-*` variables plus a `$sv-colors` map.

```scss
@use '@sageveil/css/scss' as sv;

.button {
  background: sv.$sv-green;
  color: sv.$sv-black;
}
```

### Tailwind v4

Registers `sv-*` colors in the theme (`bg-sv-green`, `text-sv-muted`, `border-sv-border`, …).

```css
@import 'tailwindcss';
@import '@sageveil/css/tailwind';
```

### JS / TS tokens

```ts
import { sageveil } from '@sageveil/css';

console.log(sageveil.ansi.base.green); // #959C70
```

## Available colors

`--sv-{black,red,green,yellow,blue,magenta,cyan,white}`, the `--sv-bright-*` variants, and the extras `--sv-{surface,overlay,highlight,border,muted,dim,cursor,cursor-text}`. SCSS/JS use the same names (`$sv-*` / `sageveil.extras.cursor_text`).

## Prebuilt releases

Also distributed as downloadable assets: <https://github.com/sageveil/css>.

## Development

[sageveil/sageveil](https://github.com/sageveil/sageveil) is the main project monorepo. All development happens there.

[sageveil/css](https://github.com/sageveil/css) is used only for easy distribution of the ready-to-use CSS colorscheme.
