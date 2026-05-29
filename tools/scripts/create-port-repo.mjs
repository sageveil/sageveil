#!/usr/bin/env node
// Create the downstream GitHub repo (<org>/<port>) for a port using gh CLI.
// The release workflow publishes built assets there but assumes it already exists.
//
// Usage:
//   node tools/scripts/create-port-repo.mjs <port> [--private] [--dry-run]

import { readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const positional = args.filter((a) => !a.startsWith('--'));
const port = positional[0];

if (!port) {
  console.error('Usage: node tools/scripts/create-port-repo.mjs <port> [--private] [--dry-run]');
  process.exit(1);
}

const org = 'sageveil';
const dryRun = flags.has('--dry-run');
const visibility = flags.has('--private') ? '--private' : '--public';
const repo = `${org}/${port}`;

const run = (cmd, cmdArgs, opts = {}) =>
  spawnSync(cmd, cmdArgs, { encoding: 'utf8', ...opts });

// gh present?
if (run('gh', ['--version']).status !== 0) {
  console.error('gh CLI not found. Install: https://cli.github.com/');
  process.exit(1);
}

// Port source exists?
const pkgPath = path.join(workspaceRoot, 'packages/ports', port, 'package.json');
try {
  await access(pkgPath);
} catch {
  console.error(`Port source not found at packages/ports/${port}`);
  process.exit(1);
}

const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
const meta = pkg.sageveil ?? {};
const displayName = meta.displayName ?? port;
const description = meta.description ?? `Sageveil port for ${displayName}.`;

// Already exists?
if (run('gh', ['repo', 'view', repo]).status === 0) {
  console.log(`Repo ${repo} already exists. Nothing to do.`);
  process.exit(0);
}

const createArgs = ['repo', 'create', repo, visibility, '--description', description];

if (dryRun) {
  console.log(`[dry-run] gh ${createArgs.join(' ')}`);
  process.exit(0);
}

const res = run('gh', createArgs, { stdio: 'inherit' });
if (res.status !== 0) {
  console.error(`Failed to create ${repo}`);
  process.exit(res.status ?? 1);
}

console.log(`Created https://github.com/${repo}`);
