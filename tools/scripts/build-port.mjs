#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { copyFile, cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const projectRootArg = process.argv[2];

if (!projectRootArg) {
  console.error('Usage: node tools/scripts/build-port.mjs <projectRoot>');
  process.exit(1);
}

const workspaceRoot = process.env.NX_WORKSPACE_ROOT
  ? resolve(process.env.NX_WORKSPACE_ROOT)
  : resolve('.');
const projectRoot = join(workspaceRoot, projectRootArg);

function stripScope(packageName) {
  const parts = packageName.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
}

async function main() {
  const pkgJsonPath = join(projectRoot, 'package.json');
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
  const packageName = pkgJson.name;

  const abbreviatedName = stripScope(packageName);
  const buildRoot = join(workspaceRoot, 'dist', 'ports', abbreviatedName);

  await rm(buildRoot, { recursive: true, force: true });
  await mkdir(buildRoot, { recursive: true });

  const result = spawnSync(
    'pnpm',
    ['exec', 'tsx', `${projectRoot}/src/index.ts`],
    { stdio: 'inherit', env: { ...process.env, OUTPUT_DIR: buildRoot }, cwd: workspaceRoot }
  );
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  try {
    await copyFile(join(projectRoot, 'README.md'), join(buildRoot, 'README.md'));
  } catch {
    // Optional README
  }

  try {
    await cp(join(projectRoot, 'assets'), buildRoot, { recursive: true });
  } catch {
    // Optional assets directory
  }

  console.log(`Built ${packageName}`);
  console.log(`Output directory: ${relative(workspaceRoot, buildRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
