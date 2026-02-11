<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">sageveil</h2>
</p>

<p align="center">
    <a href="https://github.com/sageveil/sageveil/actions/workflows/gh-pages.yml">
        <img src="https://github.com/sageveil/sageveil/actions/workflows/gh-pages.yml/badge.svg" alt="Deploy site" />
    </a>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-preview.png" width="90%" />
</p>

sageveil is organized as a monorepo with:

- a shared color palette in `packages/palette`
- a rendering engine in `packages/templater`
- ports in `packages/ports/*`

## Get the builds

### Prebuilt artifacts

Each port is published in its own repository at:

`https://github.com/sageveil/<port>`

Clone the repository for your target port if you want ready-to-use assets.

### Build from source

1. Install dependencies once:

   ```bash
   pnpm install
   ```

2. Generate artifacts for a port:

   ```bash
   pnpm nx run <port>:generate
   ```

3. Find rendered artifacts under:

   ```bash
   dist/ports/<port>
   ```

Note: build artifacts in `dist/ports/*` are not committed to this monorepo.
Distribution happens via dedicated port repositories.

### Create a new port

Generate a new port package with Sageveil defaults:

```bash
pnpm nx g @sageveil/nx:port --name <port>
```

What the generator does:

- creates a new port under `packages/ports/<port>`
- scaffolds source files, tests, and a template in `src/lib/templates/`
- adds `sageveil` metadata in the port `package.json`
- updates root `tsconfig.json` references
- runs `pnpm install` after generation (unless skipped)

Optional metadata and template customization:

```bash
pnpm nx g @sageveil/nx:port --name <port> --displayName "<Display Name>" --description "<description>" --tags terminal --tags emulator --templateFile sageveil.eta
```

Useful flags:

- `--skipInstall` to skip running `pnpm install`
- `--skipFormat` to skip formatting generated files

Generator options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | `string` | required | Port name used for directory and package name. |
| `--displayName` | `string` | `<port>` | Human-readable name stored in `package.json` under `sageveil.displayName`. |
| `--description` | `string` | none | Optional description stored in `package.json` under `sageveil.description`. |
| `--tags` | `string[]` | none | Optional `sageveil.tags` values. Pass multiple times, e.g. `--tags terminal --tags emulator`. |
| `--templateFile` | `string` | `sageveil.eta` | Template filename created in `src/lib/templates/`. |
| `--skipInstall` | `boolean` | `false` | Skip the post-generation dependency install. |
| `--skipFormat` | `boolean` | `false` | Skip formatting generated files. |


## Contributing

sageveil is under active development, and contributions are welcome.

To contribute:

1. Open an issue describing the change, bug, or new port.
2. Make your update in the relevant package under `packages/*`.
3. Run checks before opening a PR:
   - `pnpm nx run <project>:lint`
   - `pnpm nx run <project>:typecheck`
   - `pnpm nx run <project>:test` (if applicable)
4. Do not commit generated artifacts from `dist/ports/*` to this monorepo.

Thanks for growing the garden 🌱

