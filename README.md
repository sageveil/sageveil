<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">sageveil</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

## Ports

- [alacritty](/packages/ports/alacritty/README.md)
- [nvim](/packages/ports/nvim/README.md)
- [tmux](/packages/ports/tmux/README.md)
- [fzf](/packages/ports/fzf/README.md)
- [k9s](/packages/ports/k9s/README.md)
- [text-mate](/packages/ports/text-mate/README.md)

Each port renders assets from the shared palette in `packages/palette`. Documentation for additional ports will grow as they stabilize.

## Get the builds

1. Install dependencies once: `pnpm install`
2. Generate a port: `pnpm nx run <port>:generate` (for example `pnpm nx run tmux:generate`)
3. Find the rendered artifacts under `dist/ports/<port>/<version>/`

### Prebuilt artifacts

Every port will also be published in a dedicated repository with ready-to-use assets (links TBD). You can either clone those standalone repos or consume the builds generated from this monorepo—the port-specific READMEs outline both flows once links are available.

## Contributing

sageveil is still under active development, so expect changes.

TBD

Thanks for growing the garden 🌱
