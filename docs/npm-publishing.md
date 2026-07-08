# Making a port publishable to npm

Use the CSS port as the reference (`packages/ports/css`). A publishable port needs both an Nx publish target and a generated npm manifest.

## 1. Add the Nx publish target

In `packages/ports/<port>/package.json`, add `nx-release-publish` next to `generate`:

```json
"nx-release-publish": {
  "executor": "@nx/js:release-publish",
  "dependsOn": ["generate"],
  "options": {
    "packageRoot": "dist/ports/<port>",
    "access": "public"
  }
}
```

Keep `private: true` in the source package; publishing happens from `dist/ports/<port>`.

## 2. Make the generated manifest publishable

In `packages/ports/<port>/templates/package.json.eta`, include at least:

```json
{
  "name": "@sageveil/<port>",
  "version": "<%= it.version %>",
  "license": "MIT",
  "files": ["README.md"],
  "repository": {
    "type": "git",
    "url": "https://github.com/sageveil/sageveil.git",
    "directory": "packages/ports/<port>"
  },
  "homepage": "https://github.com/sageveil/<port>",
  "publishConfig": {
    "access": "public"
  }
}
```

Add the port's generated files to `files` so npm only ships the useful output.

## 3. Document npm install

Update `packages/ports/<port>/README.md` with an install snippet, for example:

```sh
npm install @sageveil/<port>
```

Use `-g` only if the target app expects globally installed packages.

## 4. Verify

```sh
pnpm nx run <port>:generate
```

Then inspect `dist/ports/<port>/package.json` before release.
