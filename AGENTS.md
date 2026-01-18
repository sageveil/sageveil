# Repository Guidelines

## Project Structure & Module Organization
This is an Nx + pnpm monorepo for the Sageveil color scheme.

- `packages/palette`: shared color tokens and helpers.
- `packages/templater`: rendering engine used by ports.
- `packages/ports/<port>`: port-specific templates and assets (e.g. `nvim`, `tmux`).
- `assets`: repo images and preview assets.
- `tools/scripts`: shared build/clean scripts used by Nx targets.
- `dist/ports/<port>`: generated artifacts from `generate` targets.

## Build, Test, and Development Commands
Run commands from the repo root.

- `pnpm install`: install workspace dependencies (Node >= 24.10.0, pnpm >= 10.18.3).
- `pnpm nx run <port>:generate`: build a port (example: `pnpm nx run tmux:generate`).
- `pnpm nx run <project>:lint`: ESLint checks for a project.
- `pnpm nx run <project>:typecheck`: TypeScript typecheck for a project.
- `pnpm nx run templater:test`: run Vitest tests for the templater package.

## Coding Style & Naming Conventions
- Use TypeScript/ESM modules as shown in `packages/*/src`.
- Format with Prettier (single quotes) and lint via `nx ...:lint`.
- Nx enforces module boundaries; prefer importing via package entry points.
- Tests use `*.spec.ts` or `*.test.ts` naming under `src/`.
- Port folders are lowercase and match their target app name.

## Testing Guidelines
Vitest is configured per package via `vite.config.ts` (for example `packages/ports/ghostty/vite.config.ts`).

- Place tests in `src/**/*.{spec,test}.{ts,tsx,js,jsx}` within the package.
- Run with `pnpm nx test <project>` or `pnpm nx run <project>:test`.
- Coverage output (when enabled) goes to `<package>/test-output/vitest/coverage`.

## Commit & Pull Request Guidelines
Commits follow Conventional Commits with scopes enforced by commitlint.

- Examples: `feat(nvim): add new highlight group`, `fix(templater): handle empty input`.
- Scopes should match Nx projects (e.g. `palette`, `templater`, `ports/<port>`) or `release`.
- PRs should describe the port(s) affected, key design changes, and any generated artifacts.

## Security & Configuration Tips
- Keep Node/pnpm versions aligned with `package.json` engines.
- Avoid committing secrets; use environment variables for local tooling.
