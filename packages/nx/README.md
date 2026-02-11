# @sageveil/nx

Local Nx plugin for the Sageveil monorepo.

## Generators

### `port`

Create a new Sageveil port package under `packages/ports/<port>`.

```bash
pnpm nx g @sageveil/nx:port --name <port>
```

This generator:
- scaffolds the port package and source files
- adds `sageveil` metadata to the port `package.json`
- updates root `tsconfig.json` references
- runs `pnpm install` after generation (unless skipped)

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `--name` | `string` | required | Port name used for directory and package name. |
| `--displayName` | `string` | `<port>` | Human-readable name in `sageveil.displayName`. |
| `--description` | `string` | none | Optional description in `sageveil.description`. |
| `--tags` | `string[]` | none | Optional `sageveil.tags`; pass multiple times. |
| `--templateFile` | `string` | `sageveil.eta` | Template filename created in `src/lib/templates/`. |
| `--skipInstall` | `boolean` | `false` | Skip post-generation dependency install. |
| `--skipFormat` | `boolean` | `false` | Skip formatting generated files. |
