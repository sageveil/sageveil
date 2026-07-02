<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">sageveil</h2>
</p>

<p align="center">
    <a href="https://github.com/sageveil/sageveil/actions/workflows/gh-pages.yml">
        <img src="https://github.com/sageveil/sageveil/actions/workflows/gh-pages.yml/badge.svg" alt="Deploy site" />
    </a>
</p>

<p align="center"><b>A minimalist, low-contrast, green-tinted colorscheme.</b><br/>Easy on the eyes. Quiet by design. Grown from one palette, ported everywhere. 🌱</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-preview.png" width="90%" />
</p>

## 🎨 The palette

One source of truth. Every port grows from these colors.

| | Base | | Bright |
| --- | --- | --- | --- |
| ![](https://placehold.co/14/101310/101310.png) `black` | `#101310` | ![](https://placehold.co/14/262F26/262F26.png) `black` | `#262F26` |
| ![](https://placehold.co/14/9A6B6B/9A6B6B.png) `red` | `#9A6B6B` | ![](https://placehold.co/14/B08585/B08585.png) `red` | `#B08585` |
| ![](https://placehold.co/14/959C70/959C70.png) `green` | `#959C70` | ![](https://placehold.co/14/9C9F7F/9C9F7F.png) `green` | `#9C9F7F` |
| ![](https://placehold.co/14/A69966/A69966.png) `yellow` | `#A69966` | ![](https://placehold.co/14/C6B67E/C6B67E.png) `yellow` | `#C6B67E` |
| ![](https://placehold.co/14/8A8493/8A8493.png) `blue` | `#8A8493` | ![](https://placehold.co/14/A39DAC/A39DAC.png) `blue` | `#A39DAC` |
| ![](https://placehold.co/14/876F7F/876F7F.png) `magenta` | `#876F7F` | ![](https://placehold.co/14/947E8D/947E8D.png) `magenta` | `#947E8D` |
| ![](https://placehold.co/14/7F9476/7F9476.png) `cyan` | `#7F9476` | ![](https://placehold.co/14/9AAB90/9AAB90.png) `cyan` | `#9AAB90` |
| ![](https://placehold.co/14/A8AFA6/A8AFA6.png) `white` | `#A8AFA6` | ![](https://placehold.co/14/C3CDC0/C3CDC0.png) `white` | `#C3CDC0` |

## 🌿 Ports

Sageveil already grows in **19** places:

`alacritty` · `css` · `fzf` · `ghostty` · `glamour` · `helix` · `ish` · `iterm2` · `k9s` · `kitty` · `nvim` · `obsidian` · `pi` · `slack` · `text-mate` · `tmux` · `vscode` · `wezterm` · `zed`

Don't see your tool? [Grow a new one](#create-a-new-port). 🪴

## 🏡 How it's grown

A monorepo where every theme sprouts from one palette:

- 🎨 shared color palette in `packages/palette` — the seed
- ⚙️ shared render scripts in `tools/scripts` — the soil
- 🌱 ports in `packages/ports/*` — what blooms

## 📦 Get the builds

### Prebuilt artifacts

Each port lives in its own repository, ready to clone:

`https://github.com/sageveil/<port>`

Grab the repo for your target port and you're done — no build step.

### Build from source

1. Install dependencies once:

   ```bash
   pnpm install
   ```

   Or via `just`:

   ```bash
   just init
   ```

2. Generate artifacts for a port:

   ```bash
   pnpm nx run <port>:generate
   ```

   Or via `just`:

   ```bash
   just generate <port>
   ```

3. Find rendered artifacts under:

   ```bash
   dist/ports/<port>
   ```

Note: build artifacts in `dist/ports/*` are not committed to this monorepo.
Distribution happens via dedicated port repositories.

### 🪴 Create a new port

Generate a new port package with Sageveil defaults:

```bash
pnpm nx g @sageveil/nx:port --name <port>
```

Or via `just`:

```bash
just new-port <port>
```

What the generator does:

- creates a new port under `packages/ports/<port>`
- scaffolds a flat template-only package with `templates/`
- adds `sageveil` metadata in the port `package.json`
- runs `pnpm install` after generation (unless skipped)

Optional metadata and template customization:

```bash
pnpm nx g @sageveil/nx:port --name <port> --displayName "<Display Name>" --description "<description>" --tags terminal --tags emulator --templateFile sageveil.eta
```

Useful flags:

- `--skipInstall` to skip running `pnpm install`
- `--skipFormat` to skip formatting generated files

Generator options:

| Option           | Type       | Default        | Description                                                                                   |
| ---------------- | ---------- | -------------- | --------------------------------------------------------------------------------------------- |
| `--name`         | `string`   | required       | Port name used for directory and package name.                                                |
| `--displayName`  | `string`   | `<port>`       | Human-readable name stored in `package.json` under `sageveil.displayName`.                    |
| `--description`  | `string`   | none           | Optional description stored in `package.json` under `sageveil.description`.                   |
| `--tags`         | `string[]` | none           | Optional `sageveil.tags` values. Pass multiple times, e.g. `--tags terminal --tags emulator`. |
| `--templateFile` | `string`   | `sageveil.eta` | Template filename created in `templates/`.                                                    |
| `--skipInstall`  | `boolean`  | `false`        | Skip the post-generation dependency install.                                                  |
| `--skipFormat`   | `boolean`  | `false`        | Skip formatting generated files.                                                              |

## 🤝 Contributing

sageveil is under active development, and contributions are welcome — new ports especially.

To contribute:

1. Open an issue describing the change, bug, or new port.
2. Make your update in the relevant package under `packages/*`.
3. Run checks before opening a PR:
   - `pnpm nx run <project>:lint` for code-bearing projects
   - `pnpm nx run <project>:typecheck`
   - `pnpm nx run <project>:test` (if applicable for non-port code packages)
4. Do not commit generated artifacts from `dist/ports/*` to this monorepo.

Available `just` recipes from the repo root:

```bash
just --list

Available recipes:
    clean port             # Clean generated artifacts for a port project.
    clean-all              # Clean generated artifacts for all port projects.
    default
    generate port          # Generate artifacts for a port project.
    generate-all           # Generate artifacts for all ports. [alias: g]
    init                   # Install workspace dependencies.
    lint project           # Run lint for a single project.
    lint-all               # Run lint for all projects.
    new-port name *args='' # Create a new port package.
    projects               # Show available Nx projects.
    site-build             # Build the site.
    site-dev               # Start the site dev server.
    site-generate-ports    # Generate the site port manifest.
    site-preview           # Preview the site production build.
    test project           # Run tests for a single project.
    test-all               # Run all tests.
    typecheck project      # Run typecheck for a single project.
```

Thanks for growing the garden 🌱
