#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const workspaceRoot = path.resolve(path.dirname(__filename), '../..');

const changedJsonPath = process.argv[2];
const outPath = process.argv[3];

if (!changedJsonPath || !outPath) {
  console.error(
    'Usage: release-aggregate-changelog.mjs <changed-ports.json> <out.md>',
  );
  process.exit(1);
}

const changed = JSON.parse(await readFile(changedJsonPath, 'utf8'));

function extractTopSection(markdown) {
  const lines = markdown.split('\n');
  const start = lines.findIndex((l) => l.startsWith('## '));
  if (start === -1) return markdown.trim();
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      end = i;
      break;
    }
  }
  return lines
    .slice(start + 1, end)
    .join('\n')
    .trim();
}

const sections = [];
for (const { port, version } of changed) {
  const changelogPath = path.join(workspaceRoot, 'packages/ports', port, 'CHANGELOG.md');
  let body = '';
  try {
    const raw = await readFile(changelogPath, 'utf8');
    body = extractTopSection(raw);
  } catch {
    body = '_No changelog entry generated._';
  }
  sections.push(`## ${port} ${version}\n\n${body}`);
}

const aggregated = sections.length
  ? sections.join('\n\n')
  : '_No port changes in this release._';

await writeFile(outPath, `${aggregated}\n`, 'utf8');
console.log(`Wrote aggregated changelog (${sections.length} ports) to ${outPath}`);
