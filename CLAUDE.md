# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

sageveil is a minimalist low-contrast, green-tinted colorscheme organized as an Nx monorepo. It generates theme files for various tools (terminal emulators, editors, etc.) from a shared color palette using a templating engine.

## Commands

```bash
# Install dependencies
pnpm install

# Generate artifacts for a specific port
pnpm nx run <port>:generate

# Run tests for a project
pnpm nx run <project>:test

# Run a single test file
pnpm nx run <project>:test --testFile=src/lib/<name>.spec.ts

# Lint a project
pnpm nx run <project>:lint

# Typecheck a project
pnpm nx run <project>:typecheck

# Generate a new port
pnpm nx g @sageveil/nx:port --name <port>

# Run targets across all projects
pnpm nx run-many -t test
pnpm nx run-many -t lint
```

Build artifacts go to `dist/ports/<port>/` and are not committed to this repo.

## Architecture

### Packages

- **`packages/palette`** — Single source of truth for all colors. Exports `sageveil` object with `ansi.base`, `ansi.bright`, and `extras` (surface, overlay, highlight, border, muted, dim, cursor, cursor_text).

- **`packages/templater`** — Rendering engine built on [Eta](https://eta.js.org/). The `render()` function takes a `RenderJob` (template directory + list of files), injects the full `sageveil` palette as template context, and writes output to `$OUTPUT_DIR`. Templates use `.eta` extension by default; the extension is stripped from output filenames.

- **`packages/ports/*`** — Each port is a package that calls `render()` from `@sageveil/templater` with its own templates. The entry point is `src/index.ts`, templates live in `src/lib/templates/`. The `generate` nx target runs `tools/scripts/build-port.mjs` which sets `OUTPUT_DIR` and executes the port's `src/index.ts` via `tsx`.

- **`packages/nx`** — Custom Nx generator (`@sageveil/nx:port`) that scaffolds new port packages with the correct structure, tsconfig references, and metadata.

- **`packages/site`** — React + Tailwind showcase site deployed to GitHub Pages.

### Port structure

Each port follows this pattern:

```
packages/ports/<name>/
  src/
    index.ts                      # Entry: calls render() with templateFiles list
    lib/
      <name>.ts                   # Same as index.ts (actual render call)
      <name>.spec.ts              # Tests: mocks @sageveil/templater and tests template output directly via Eta
      templates/
        sageveil.<ext>[.eta]      # Eta templates; .eta suffix stripped on output
  package.json                    # Contains "sageveil" metadata (displayName, description, tags)
```

### Template context

Templates receive the full `sageveil` palette object:

- `it.ansi.base.<color>` — base ANSI colors (black, red, green, yellow, blue, magenta, cyan, white)
- `it.ansi.bright.<color>` — bright ANSI variants
- `it.extras.*` — surface, overlay, highlight, border, muted, dim, cursor, cursor_text

### Testing pattern

Port tests have two concerns:

1. Mock `@sageveil/templater` and verify `render()` is called with the correct `templateDir` and `templateFiles`
2. Directly instantiate `Eta` with mock palette data and assert the rendered template output contains expected strings

### Build pipeline

The `generate` target invokes `tools/scripts/build-port.mjs <projectRoot>`, which:

1. Sets `OUTPUT_DIR` to `dist/ports/<abbreviatedName>`
2. Runs `pnpm exec tsx <projectRoot>/src/index.ts`
3. Copies `README.md` to the output directory if present

### Release

Releases use `nx release` with conventional commits. Ports are released independently under the tag pattern `port/{projectName}@{version}`. Each port is distributed via its own GitHub repository at `https://github.com/sageveil/<port>`.

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
