#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const workspaceRoot = path.resolve(path.dirname(__filename), '../..');

const changedJsonPath = process.argv[2];
const outPath = process.argv[3];
const paletteVersion = process.argv[4];

if (!changedJsonPath || !outPath) {
  console.error(
    'Usage: release-aggregate-changelog.mjs <changed-ports.json> <out.md> [palette-version]',
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

const packages = changed.map(({ port, version }) => ({
  name: port,
  version,
  changelogPath: path.join(
    workspaceRoot,
    'packages/ports',
    port,
    'CHANGELOG.md',
  ),
}));
if (paletteVersion) {
  packages.unshift({
    name: 'palette',
    version: paletteVersion,
    changelogPath: path.join(workspaceRoot, 'packages/palette/CHANGELOG.md'),
  });
}

const sections = [];
for (const { name, version, changelogPath } of packages) {
  let body = '';
  try {
    const raw = await readFile(changelogPath, 'utf8');
    body = extractTopSection(raw);
  } catch {
    body = '_No changelog entry generated._';
  }
  sections.push(`## ${name} ${version}\n\n${body}`);
}

const aggregated = sections.length
  ? sections.join('\n\n')
  : '_No package changes in this release._';

await writeFile(outPath, `${aggregated}\n`, 'utf8');
console.log(
  `Wrote aggregated changelog (${sections.length} packages) to ${outPath}`,
);
