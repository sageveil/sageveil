# Repository Guidelines

## About

sageveil is a minimalist low-contrast, green-tinted colorscheme organized as an Nx + pnpm monorepo. It generates theme files for terminals, editors, and other tools from a shared palette using templates.

## Project Structure & Module Organization

- `packages/palette`: shared color tokens and helpers; exports the `sageveil` palette.
- `tools/scripts`: shared build/render scripts used by Nx targets.
- `packages/ports/<port>`: port-specific templates and assets (for example `nvim`, `tmux`).
- `packages/nx`: custom Nx generator (`@sageveil/nx:port`) for new port packages.
- `packages/site`: React + Tailwind showcase site.
- `assets`: repo images and preview assets.
- `dist/ports/<port>`: generated artifacts from `generate` targets; not committed.

## Build, Test, and Development Commands

Run commands from the repo root.

- `pnpm install`: install workspace dependencies (Node >= 24.10.0, pnpm >= 10.18.3).
- `pnpm nx run <port>:generate`: build a port (example: `pnpm nx run tmux:generate`).
- `pnpm nx run <project>:test`: run tests for a project.
- `pnpm nx run <project>:test --testFile=src/lib/<name>.spec.ts`: run one test file.
- `pnpm nx run <project>:lint`: ESLint checks for code-bearing projects.
- `pnpm nx run <project>:typecheck`: TypeScript typecheck for a project.
- `pnpm nx g @sageveil/nx:port --name <port>`: generate a new port.
- `pnpm nx run-many -t test` / `pnpm nx run-many -t lint`: run targets across projects.
- See `docs/npm-publishing.md` when making a port publishable to npm.

## Architecture

### Packages

- `packages/palette`: single source of truth for colors. Exports `sageveil` with `ansi.base`, `ansi.bright`, and `extras` (`surface`, `overlay`, `highlight`, `border`, `muted`, `dim`, `cursor`, `cursor_text`).
- `tools/scripts/render.mjs`: Eta-based rendering engine. `render()` takes a `RenderJob`, injects the full `sageveil` palette as template context, and writes output to the target directory. `.eta` suffixes are stripped from output filenames.
- `packages/ports/*`: template-only packages. Templates live in `templates/`. The `generate` Nx target runs `tools/scripts/build-port.ts`, discovers templates, renders them, and writes output to `dist/ports/<name>/`.

### Port structure

```text
packages/ports/<name>/
  templates/
    sageveil.<ext>[.eta]
  package.json
```

Port `package.json` files include `sageveil` metadata such as `displayName`, `description`, and `tags`.

### Template context

Templates receive the full `sageveil` palette object:

- `it.ansi.base.<color>`: base ANSI colors (`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`).
- `it.ansi.bright.<color>`: bright ANSI variants.
- `it.extras.*`: extra UI colors.

### Build pipeline

The `generate` target invokes `tools/scripts/build-port.mjs <projectRoot>`, which:

1. Sets the output directory to `dist/ports/<abbreviatedName>`.
2. Auto-discovers templates in `templates/` and renders them through `tools/scripts/render.mjs`.
3. Passes the port `version` from `package.json` as template context.
4. Copies `README.md` and `assets/` to the output directory if present.

## Coding Style & Naming Conventions

- Use TypeScript/ESM modules as shown in `packages/*/src`.
- Format with Prettier (single quotes). Use Nx lint targets for packages with TS/JS logic.
- Nx enforces module boundaries; prefer importing through package entry points.
- Tests use `*.spec.ts` or `*.test.ts` naming under `src/`.
- Port folders are lowercase and match their target app name.

## Testing Guidelines

Vitest is configured per code-bearing package via `vite.config.ts`.

- Place tests in package-local test directories for code-bearing packages.
- Run with `pnpm nx test <project>` or `pnpm nx run <project>:test` where a test target exists.
- Coverage output, when enabled, goes to `<package>/test-output/vitest/coverage`.
- Port packages are content-only and currently do not carry package-local tests.

## Release

Releases use `nx release` with conventional commits. Per-package version bumps land as `{projectName}@{version}` tags in the monorepo. Each release cycle is wrapped in one umbrella `vX.Y.Z` GitHub release whose body aggregates changed ports' changelog entries; the umbrella bump is derived from the largest port bump. After the umbrella release, `release.yml` publishes changed port assets to downstream repos under `https://github.com/sageveil/<port>`. Prereleases push to an orphan commit downstream so `main` only moves for stable versions.

## Commit & Pull Request Guidelines

Commits follow Conventional Commits with scopes enforced by commitlint.

- Examples: `feat(nvim): add new highlight group`, `fix(palette): correct ANSI token`.
- Scopes should match Nx projects (for example `palette`, `nx`, `site`, `ports/<port>`) or `release`.
- PRs should describe affected ports, key design changes, and generated artifacts.

## Security & Configuration Tips

- Keep Node/pnpm versions aligned with `package.json` engines.
- Avoid committing secrets; use environment variables for local tooling.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

## General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->
