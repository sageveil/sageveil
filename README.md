<p align="center">
    <img src="assets/sageveil-logo.png" width="80" />
    <h2 align="center">Sageveil</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

## Ports

- `packages/ports/alacritty`
- `packages/ports/fzf`
- `packages/ports/k9s`
- `packages/ports/nvim`
- `packages/ports/tmux` – full configuration reference lives in its README.

Each port renders assets from the shared palette in `packages/palette`. Documentation for additional ports will grow as they stabilize.

## Get the builds

1. Install dependencies once: `pnpm install`
2. Generate a port: `pnpm nx run <port>:generate` (for example `pnpm nx run tmux:generate`)
3. Find the rendered artifacts under `dist/ports/<port>/<version>/`

### Prebuilt artifacts

Every port will also be published in a dedicated repository with ready-to-use assets (links TBD). You can either clone those standalone repos or consume the builds generated from this monorepo—the port-specific READMEs outline both flows once links are available.

## Contributing

Sageveil is still under active development, so expect changes. If you want to help:

- Run `pnpm test <port>` to execute a port's Vitest suite.
- Use `pnpm nx run <port>:clean` before regenerating artefacts when testing changes.
- Check the port README for any additional setup notes.

Thanks for growing the garden 🌱
