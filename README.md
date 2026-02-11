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

