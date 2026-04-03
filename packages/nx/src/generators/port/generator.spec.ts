import { readJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing.js';
import { describe, expect, it } from 'vitest';
import generator from './generator.js';

describe('port generator', () => {
  it('creates port scaffold and metadata', async () => {
    const tree = createTreeWithEmptyWorkspace();

    await generator(tree, {
      name: 'ghostty-plus',
      displayName: 'Ghostty Plus',
      description: 'Custom Ghostty theme.',
      tags: ['terminal', 'emulator'],
      templateFile: 'my-theme.eta',
      skipFormat: true,
      skipInstall: true,
    });

    expect(tree.exists('packages/ports/ghostty-plus/package.json')).toBe(true);
    expect(
      tree.exists('packages/ports/ghostty-plus/templates/my-theme.eta'),
    ).toBe(true);
    expect(tree.exists('packages/ports/ghostty-plus/tests')).toBe(false);
    expect(tree.exists('packages/ports/ghostty-plus/tsconfig.spec.json')).toBe(
      false,
    );
    expect(tree.exists('packages/ports/ghostty-plus/tsconfig.json')).toBe(
      false,
    );
    expect(tree.exists('packages/ports/ghostty-plus/vite.config.ts')).toBe(
      false,
    );
    expect(tree.exists('packages/ports/ghostty-plus/eslint.config.mjs')).toBe(
      false,
    );

    const portPackageJson = readJson(
      tree,
      'packages/ports/ghostty-plus/package.json',
    );
    expect(portPackageJson.sageveil).toEqual({
      displayName: 'Ghostty Plus',
      description: 'Custom Ghostty theme.',
      tags: ['terminal', 'emulator'],
    });

    expect(portPackageJson.main).toBeUndefined();
    expect(portPackageJson.types).toBeUndefined();
    expect(portPackageJson.exports).toBeUndefined();
    expect(portPackageJson.devDependencies).toBeUndefined();
  });

  it('does not modify root tsconfig references for template-only ports', async () => {
    const tree = createTreeWithEmptyWorkspace();

    tree.write(
      'tsconfig.json',
      JSON.stringify(
        {
          references: [
            { path: './packages/palette' },
            { path: './packages/ports/alacritty' },
            { path: './packages/site' },
          ],
        },
        null,
        2,
      ),
    );

    await generator(tree, {
      name: 'new-port',
      skipFormat: true,
      skipInstall: true,
    });

    const rootTsConfig = readJson(tree, 'tsconfig.json');
    const references = rootTsConfig.references.map(
      (reference: { path: string }) => reference.path,
    );

    expect(references).toEqual([
      './packages/palette',
      './packages/ports/alacritty',
      './packages/site',
    ]);
  });

  it('returns an install callback when skipInstall is false', async () => {
    const tree = createTreeWithEmptyWorkspace();

    tree.write('tsconfig.json', JSON.stringify({ references: [] }, null, 2));

    const callback = await generator(tree, {
      name: 'cb-port',
      skipFormat: true,
      skipInstall: false,
    });

    expect(typeof callback).toBe('function');
  });
});
