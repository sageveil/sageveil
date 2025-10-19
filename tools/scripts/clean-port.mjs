#!/usr/bin/env node

import { readFile, rm } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const [projectRootArg] = process.argv.slice(2);

if (!projectRootArg) {
  console.error('Usage: node tools/scripts/clean-port.mjs <projectRoot>');
  process.exit(1);
}

const workspaceRoot = process.env.NX_WORKSPACE_ROOT
  ? resolve(process.env.NX_WORKSPACE_ROOT)
  : resolve('.');
const projectRoot = join(workspaceRoot, projectRootArg);

async function readJson(path) {
  const contents = await readFile(path, 'utf8');
  return JSON.parse(contents);
}

function stripScope(packageName) {
  const parts = packageName.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
}

async function main() {
  const pkg = await readJson(join(projectRoot, 'package.json'));
  const targetDir = join(workspaceRoot, 'dist', 'ports', stripScope(pkg.name));
  await rm(targetDir, { recursive: true, force: true });
  console.log(`Cleaned ${relative(workspaceRoot, targetDir)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
