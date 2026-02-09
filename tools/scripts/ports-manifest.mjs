import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '../..');

const portsRoot = path.join(workspaceRoot, 'packages/ports');
const outputPath = path.join(
  workspaceRoot,
  'packages/site/src/data/ports.json'
);

const titleCase = (value) =>
  value.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const entries = await readdir(portsRoot, { withFileTypes: true });
const ports = [];

for (const entry of entries) {
  if (!entry.isDirectory()) {
    continue;
  }

  const slug = entry.name;
  const pkgPath = path.join(portsRoot, slug, 'package.json');
  const raw = await readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(raw);
  const meta = pkg.sageveil ?? {};

  const displayName = meta.displayName ?? titleCase(slug);
  const description =
    meta.description ?? pkg.description ?? `Sageveil port for ${displayName}.`;

  ports.push({
    slug,
    packageName: pkg.name ?? slug,
    displayName,
    description,
    version: pkg.version ?? '0.0.0',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
  });
}

ports.sort((a, b) => a.displayName.localeCompare(b.displayName));

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(ports, null, 2)}\n`, 'utf8');

console.log(
  `Generated ${ports.length} ports -> ${path.relative(
    workspaceRoot,
    outputPath
  )}`
);
