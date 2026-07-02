import { copyFile, cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { render } from './render.mjs';

const projectRootArg = process.argv[2];

if (!projectRootArg) {
  console.error('Usage: tsx tools/scripts/build-port.mjs <projectRoot>');
  process.exit(1);
}

const workspaceRoot = process.env.NX_WORKSPACE_ROOT
  ? resolve(process.env.NX_WORKSPACE_ROOT)
  : resolve('.');
const projectRoot = join(workspaceRoot, projectRootArg);

async function main() {
  const pkgJsonPath = join(projectRoot, 'package.json');
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
  const packageName = pkgJson.name;
  const version = pkgJson.version;

  const abbreviatedName = packageName.split('/').at(-1);
  const buildRoot = join(workspaceRoot, 'dist', 'ports', abbreviatedName);

  await rm(buildRoot, { recursive: true, force: true });
  await mkdir(buildRoot, { recursive: true });

  await render({
    templateDir: join(projectRoot, 'templates'),
    outputDir: buildRoot,
    ctx: { version },
  });

  try {
    await copyFile(
      join(projectRoot, 'README.md'),
      join(buildRoot, 'README.md'),
    );
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  try {
    await cp(join(projectRoot, 'assets'), buildRoot, { recursive: true });
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }

  console.log(`Built ${packageName}`);
  console.log(`Output directory: ${relative(workspaceRoot, buildRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
