<p align="center">
    <img src="../../assets/sageveil-logo.png" width="80" />
    <h2 align="center">Sageveil</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# templater

## Overview

`@sageveil/templater` is the thin rendering layer shared by every port. It wraps the [Eta](https://eta.js.org/) template engine, injects the Sageveil palette, and writes the rendered files to the build output directory.

The executable entry point lives in `src/index.ts`; Nx targets call it with `OUTPUT_DIR` set by `tools/scripts/build-port.mjs`.

## Usage

```ts
import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  templateFiles: ['sageveil.toml'],
  // ctx is available for future overrides but currently unused.
});
```

- Each template file is resolved relative to `templateDir`.
- `.eta` suffixes are stripped automatically; clean filenames fall straight into the dist folder.
- `OUTPUT_DIR` **must** point at a writable directory before calling `render` (set by the build tool when running `nx run <port>:generate`).

## Development

- Run `pnpm test templater` to exercise the Vitest suite.
- When adding new helpers or template parameters, extend the tests so downstream ports retain coverage.
