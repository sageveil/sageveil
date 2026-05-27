#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const workspaceRoot = path.resolve(path.dirname(__filename), '../..');

const beforePath = process.argv[2];
const outDir = process.argv[3];

if (!beforePath || !outDir) {
  console.error(
    'Usage: release-derive.mjs <before-snapshot.json> <out-dir>\n' +
      '  Writes <out-dir>/changed-ports.json, <out-dir>/umbrella-version.txt,\n' +
      '  and updates root package.json with the bumped umbrella version.',
  );
  process.exit(1);
}

const BUMP_RANK = { none: 0, patch: 1, minor: 2, major: 3 };

function classifyBump(oldVersion, newVersion) {
  if (oldVersion === newVersion) return 'none';
  const parse = (v) => v.replace(/^v/, '').split('-')[0].split('.').map(Number);
  const [oMaj, oMin, oPatch] = parse(oldVersion);
  const [nMaj, nMin, nPatch] = parse(newVersion);
  if (nMaj > oMaj) return 'major';
  if (nMin > oMin) return 'minor';
  if (nPatch > oPatch) return 'patch';
  return 'patch';
}

function bumpVersion(version, kind) {
  const [maj, min, patch] = version.split('.').map(Number);
  if (kind === 'major') return `${maj + 1}.0.0`;
  if (kind === 'minor') return `${maj}.${min + 1}.0`;
  return `${maj}.${min}.${patch + 1}`;
}

const before = JSON.parse(await readFile(beforePath, 'utf8'));

const { spawnSync } = await import('node:child_process');
const snapshotResult = spawnSync(
  'node',
  [path.join(workspaceRoot, 'tools/scripts/release-snapshot-versions.mjs')],
  { encoding: 'utf8' },
);
if (snapshotResult.status !== 0) {
  console.error(snapshotResult.stderr);
  process.exit(snapshotResult.status ?? 1);
}
const after = JSON.parse(snapshotResult.stdout);

const changed = [];
let umbrellaBump = 'none';

for (const [port, newVersion] of Object.entries(after)) {
  const oldVersion = before[port];
  if (!oldVersion || oldVersion === newVersion) continue;
  const bump = classifyBump(oldVersion, newVersion);
  changed.push({ port, version: newVersion, isPrerelease: newVersion.includes('-') });
  if (BUMP_RANK[bump] > BUMP_RANK[umbrellaBump]) umbrellaBump = bump;
}

const rootPkgPath = path.join(workspaceRoot, 'package.json');
const rootPkg = JSON.parse(await readFile(rootPkgPath, 'utf8'));
const currentUmbrella = rootPkg.version;
const nextUmbrella =
  umbrellaBump === 'none' ? currentUmbrella : bumpVersion(currentUmbrella, umbrellaBump);

if (changed.length > 0) {
  rootPkg.version = nextUmbrella;
  await writeFile(rootPkgPath, `${JSON.stringify(rootPkg, null, 2)}\n`, 'utf8');
}

const { mkdir } = await import('node:fs/promises');
await mkdir(outDir, { recursive: true });
await writeFile(
  path.join(outDir, 'changed-ports.json'),
  `${JSON.stringify(changed)}\n`,
  'utf8',
);
await writeFile(path.join(outDir, 'umbrella-version.txt'), `${nextUmbrella}\n`, 'utf8');
await writeFile(path.join(outDir, 'umbrella-bump.txt'), `${umbrellaBump}\n`, 'utf8');

console.log(
  `Changed ports: ${changed.length} | umbrella ${currentUmbrella} -> ${nextUmbrella} (${umbrellaBump})`,
);
