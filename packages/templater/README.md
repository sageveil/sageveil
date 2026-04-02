<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">@sageveil/templater</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

# @sageveil/templater

## Overview

`@sageveil/templater` is the thin rendering layer shared by every port.
It wraps the [Eta](https://eta.js.org/) template engine, injects the sageveil palette, and writes the rendered files to the build output directory.

The executable entry point lives in `src/index.ts`; Nx targets invoke it through `tools/scripts/build-port.ts`, which sets `OUTPUT_DIR` for port builds.

## Usage

```ts
import { render } from '@sageveil/templater';

await render({
  templateDir: `${import.meta.dirname}/templates`,
  outputDir: 'dist/ports/example',
  templateFiles: ['sageveil.toml', { filename: 'sageveil.sh', executable: true }],
});
```

- Each template file is resolved relative to `templateDir`.
- If `templateFiles` is omitted, `render()` discovers every file under `templateDir` recursively.
- `.eta` suffixes are stripped automatically; clean filenames fall straight into the dist folder.
- `executable: true` sets the file mode to `755`, which is necessary for executable outputs such as tmux scripts.
- `outputDir` can be passed directly; if omitted, `render()` falls back to `OUTPUT_DIR`.
