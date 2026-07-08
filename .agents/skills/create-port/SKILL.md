---
name: create-port
description: Create a new Sageveil port package. Use when adding a port under packages/ports, including scaffolding, templates, metadata, docs, generation validation, and downstream GitHub repo creation.
---

# Create Port

Create the smallest useful port. No speculative options.

## Steps

1. Clarify only if needed:
   - target app/tool name
   - generated file name/extension
   - install/apply instructions
   - whether to add a screenshot after the port is rendered

2. Scaffold the port from repo root:

```bash
pnpm nx g @sageveil/nx:port --name <port> --displayName <display-name>
```

3. Replace the generated placeholder template in `packages/ports/<port>/templates/` with the real template.
   - Use `sageveil.<ext>.eta` when palette values are injected.
   - Use palette context: `it.ansi.base.*`, `it.ansi.bright.*`, `it.extras.*`.
   - Keep it fixed/minimal unless the user asks for knobs.

4. Update `packages/ports/<port>/package.json`:
   - `sageveil.displayName`
   - `sageveil.description`
   - `sageveil.tags`

5. Update `packages/ports/<port>/README.md`:
   - overview
   - prebuilt release URL: `https://github.com/sageveil/<port>`
   - build command: `pnpm nx run <port>:generate`
   - apply/install instructions
   - if the user provides a screenshot after previewing the generated port: put it in `packages/ports/<port>/assets/` and link to the raw monorepo URL:
     `https://raw.githubusercontent.com/sageveil/sageveil/refs/heads/main/packages/ports/<port>/assets/<image>`

6. Add `packages/ports/<port>/CHANGELOG.md` with an initial `0.1.0` entry.

7. Update the root `README.md` port count/list.

8. Generate and validate:

```bash
pnpm nx run <port>:generate
```

Check `dist/ports/<port>/` contains the intended rendered files. Run an app-specific parser/validator only if the tool is installed.

9. Create the downstream GitHub repo:

```bash
node tools/scripts/create-port-repo.mjs <port>
```

Use `--dry-run` first if unsure. Use `--private` only when explicitly requested.

10. Before commit, inspect:

```bash
git status --short
git diff --cached --stat
```

Stage only the new port, lockfile importer, and root README update.
