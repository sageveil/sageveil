#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const [projectRootArg, ...restArgs] = process.argv.slice(2);

if (!projectRootArg) {
  console.error('Usage: node tools/scripts/build-port.mjs <projectRoot> [--skip-archive]');
  process.exit(1);
}

const skipArchive = restArgs.includes('--skip-archive');

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
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
    child.on('error', reject);
  });
}

async function hashFile(path) {
  const data = await readFile(path);
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

async function collectFiles(dir, rootDir) {
  const entries = [];

  async function walk(currentDir) {
    const dirEntries = await readdir(currentDir, { withFileTypes: true });

    await Promise.all(
      dirEntries.map(async (entry) => {
        const entryPath = join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walk(entryPath);
        } else if (entry.isFile()) {
          entries.push(entryPath);
        }
      })
    );
  }

  await walk(dir);
  return entries.map((path) => ({
    absolutePath: path,
    relativePath: relative(rootDir, path),
  }));
}

async function main() {
  const pkgJsonPath = join(projectRoot, 'package.json');
  const pkgJson = await readJson(pkgJsonPath);
  const packageName = pkgJson.name;
  const packageVersion = pkgJson.version;

  if (!packageVersion || typeof packageVersion !== 'string') {
    throw new Error(`Package version is not defined for ${packageName}`);
  }

  const abbreviatedName = stripScope(packageName);
  const buildRoot = join(workspaceRoot, 'dist', 'ports', abbreviatedName, packageVersion);
  const archiveDir = dirname(buildRoot);
  const archiveName = `${abbreviatedName}-v${packageVersion}.tar.gz`;
  const archivePath = join(archiveDir, archiveName);

  await rm(buildRoot, { recursive: true, force: true });
  if (!skipArchive) {
    await rm(archivePath, { force: true });
  }

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

  const files = await collectFiles(buildRoot, buildRoot);

  const filesWithHashes = await Promise.all(
    files.map(async ({ absolutePath, relativePath }) => ({
      path: relativePath,
      sha256: await hashFile(absolutePath),
    }))
  );

  const manifest = {
    name: packageName,
    version: packageVersion,
    releaseTag: `${packageName}@${packageVersion}`,
    build: {
      generatedAt: new Date().toISOString(),
      outputDir: relative(workspaceRoot, buildRoot),
      headCommit: process.env.NX_HEAD || null,
    },
    files: filesWithHashes,
    artifacts: [],
  };

  if (!skipArchive) {
    await run('tar', ['-czf', archivePath, '-C', buildRoot, '.'], {
      cwd: workspaceRoot,
    });
    manifest.artifacts.push({
      type: 'archive',
      format: 'tar.gz',
      filename: archiveName,
      path: relative(workspaceRoot, archivePath),
      sha256: await hashFile(archivePath),
    });
  }

  const manifestPath = join(buildRoot, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`Built ${packageName}@${packageVersion}`);
  console.log(`Output directory: ${relative(workspaceRoot, buildRoot)}`);
  if (!skipArchive) {
    console.log(`Archive created: ${relative(workspaceRoot, archivePath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
