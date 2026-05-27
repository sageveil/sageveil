#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const workspaceRoot = path.resolve(path.dirname(__filename), '../..');
const portsRoot = path.join(workspaceRoot, 'packages/ports');

const entries = await readdir(portsRoot, { withFileTypes: true });
const snapshot = {};

for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const pkgPath = path.join(portsRoot, entry.name, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  snapshot[entry.name] = pkg.version ?? '0.0.0';
}

process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
