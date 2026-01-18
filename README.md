<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/sageveil-logo.png" width="80" />
    <h2 align="center">sageveil</h2>
</p>

<p align="center">A minimalist low-contrast, green-tinted colorscheme 🌱</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/assets/nvim-preview.png" width="90%" />
</p>

## Ports

- [alacritty](/packages/ports/alacritty/README.md)
- [nvim](/packages/ports/nvim/README.md)
- [tmux](/packages/ports/tmux/README.md)
- [fzf](/packages/ports/fzf/README.md)
- [ghostty](/packages/ports/ghostty/README.md)
- [k9s](/packages/ports/k9s/README.md)
- [text-mate](/packages/ports/text-mate/README.md)

Each port renders assets using the shared palette from `packages/palette`. Documentation for additional ports will grow as they stabilize.

## Get the builds

### Prebuilt artifacts

Every port ships in a dedicated repository at `https://github.com/sageveil/<port>`.
For example, the tmux port lives at `https://github.com/sageveil/tmux`.
Clone whichever port you need for ready-to-use assets, or generate artifacts directly from this monorepo — the port READMEs cover both workflows.

### Build from source

1. Install dependencies once: `pnpm install`
2. Generate a new port (if needed):

   ```bash
   export PORT_NAME="<name>" && pnpm nx g @nx/js:lib "packages/ports/$PORT_NAME" --bundler none --linter eslint --name "@sageveil/$PORT_NAME" --unitTestRunner vitest
   ```

2. Generate a port: `pnpm nx run <port>:generate` (for example `pnpm nx run tmux:generate`)
3. Find the rendered artifacts under `dist/ports/<port>`


## Contributing

sageveil is still under active development, so expect changes.

TBD

Thanks for growing the garden 🌱
