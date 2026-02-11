import { execSync } from 'node:child_process';
import {
  formatFiles,
  GeneratorCallback,
  generateFiles,
  joinPathFragments,
  logger,
  names,
  Tree,
  updateJson,
} from '@nx/devkit';
import type { PortGeneratorSchema } from './schema.js';

function normalizeTags(tags?: string[] | string): string[] | undefined {
  if (!tags) {
    return undefined;
  }

  const values = Array.isArray(tags) ? tags : tags.split(',');
  const normalized = values
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  return normalized.length > 0 ? normalized : undefined;
}

function updateRootTsConfig(tree: Tree, portName: string): void {
  const portReference = `./packages/ports/${portName}`;

  updateJson(tree, 'tsconfig.json', (json) => {
    const references: Array<{ path: string }> = [...(json.references ?? [])];

    if (references.some((reference) => reference.path === portReference)) {
      return json;
    }

    const insertAfterPortIndex = references.reduce(
      (lastIndex, reference, i) => {
        return reference.path.startsWith('./packages/ports/') ? i : lastIndex;
      },
      -1
    );

    if (insertAfterPortIndex >= 0) {
      references.splice(insertAfterPortIndex + 1, 0, { path: portReference });
    } else {
      references.push({ path: portReference });
    }

    json.references = references;
    return json;
  });
}

export default async function generator(
  tree: Tree,
  options: PortGeneratorSchema
): Promise<GeneratorCallback> {
  const normalizedPortName = names(options.name).fileName;
  const templateFile = (options.templateFile ?? 'sageveil.eta').trim();

  if (!templateFile) {
    throw new Error('templateFile cannot be empty.');
  }

  if (normalizedPortName !== options.name) {
    logger.info(
      `Normalizing port name "${options.name}" to "${normalizedPortName}".`
    );
  }

  const projectRoot = joinPathFragments('packages/ports', normalizedPortName);

  if (tree.exists(joinPathFragments(projectRoot, 'package.json'))) {
    throw new Error(`Port already exists at ${projectRoot}.`);
  }

  const tags = normalizeTags(options.tags);
  const displayName = options.displayName?.trim() || normalizedPortName;
  const description = options.description?.trim();

  generateFiles(tree, joinPathFragments(__dirname, 'files'), projectRoot, {
    portName: normalizedPortName,
    displayName,
    templateFile,
    tmpl: '',
  });

  updateJson(tree, joinPathFragments(projectRoot, 'package.json'), (json) => {
    json.sageveil = {
      displayName,
      ...(description ? { description } : {}),
      ...(tags ? { tags } : {}),
    };

    return json;
  });

  updateRootTsConfig(tree, normalizedPortName);

  if (!options.skipFormat) {
    await formatFiles(tree);
  }

  if (options.skipInstall) {
    return () => undefined;
  }

  return () => {
    execSync('pnpm install', {
      cwd: tree.root,
      stdio: process.env.NX_GENERATE_QUIET === 'true' ? 'ignore' : 'inherit',
      windowsHide: false,
    });
  };
}
