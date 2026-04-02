import { copyFile, cp, mkdir, readFile, rm } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const projectRootArg = process.argv[2];

if (!projectRootArg) {
  console.error('Usage: tsx tools/scripts/build-port.ts <projectRoot>');
  process.exit(1);
}

const workspaceRoot = process.env.NX_WORKSPACE_ROOT
  ? resolve(process.env.NX_WORKSPACE_ROOT)
  : resolve('.');
const projectRoot = join(workspaceRoot, projectRootArg);

function stripScope(packageName: string): string {
  const parts = packageName.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
}

async function main(): Promise<void> {
  const pkgJsonPath = join(projectRoot, 'package.json');
  const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf8'));
  const packageName: string = pkgJson.name;

  const abbreviatedName = stripScope(packageName);
  const buildRoot = join(workspaceRoot, 'dist', 'ports', abbreviatedName);

  await rm(buildRoot, { recursive: true, force: true });
  await mkdir(buildRoot, { recursive: true });

  process.env.OUTPUT_DIR = buildRoot;
  await import(`${projectRoot}/src/index.ts`);

  try {
    await copyFile(
      join(projectRoot, 'README.md'),
      join(buildRoot, 'README.md'),
    );
  } catch (err: any) {
    if (err.code !== 'ENOENT') throw err;
  }

  try {
    await cp(join(projectRoot, 'assets'), buildRoot, { recursive: true });
  } catch (err: any) {
    if (err.code !== 'ENOENT') throw err;
  }

  console.log(`Built ${packageName}`);
  console.log(`Output directory: ${relative(workspaceRoot, buildRoot)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
