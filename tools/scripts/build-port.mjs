#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { copyFile, mkdir, readFile, rm } from 'node:fs/promises';
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

async function readJson(path) {
  const contents = await readFile(path, 'utf8');
  return JSON.parse(contents);
}

function stripScope(packageName) {
  const parts = packageName.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
}

async function run(command, args, options = {}) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: options.env,
      cwd: options.cwd,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolvePromise();
      } else {
        reject(
          new Error(`${command} ${args.join(' ')} exited with code ${code}`)
        );
      }
    });
    child.on('error', reject);
  });
}

async function main() {
  const pkgJsonPath = join(projectRoot, 'package.json');
  const pkgJson = await readJson(pkgJsonPath);
  const packageName = pkgJson.name;

  const abbreviatedName = stripScope(packageName);
  const buildRoot = join(workspaceRoot, 'dist', 'ports', abbreviatedName);

  await rm(buildRoot, { recursive: true, force: true });

  await mkdir(buildRoot, { recursive: true });

  const env = {
    ...process.env,
    OUTPUT_DIR: buildRoot,
  };

  await run('pnpm', ['exec', 'tsx', `${projectRoot}/src/index.ts`], {
    env,
    cwd: workspaceRoot,
  });

  try {
    const readmeSrc = join(projectRoot, 'README.md');
    const readmeDest = join(buildRoot, 'README.md');
    await copyFile(readmeSrc, readmeDest);
  } catch {
    // Optional README
  }

  console.log(`Built ${packageName}`);
  console.log(`Output directory: ${relative(workspaceRoot, buildRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
