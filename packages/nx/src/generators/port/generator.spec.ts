import { readJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { describe, expect, it } from 'vitest';
import generator from './generator';

describe('port generator', () => {
  it('creates port scaffold and metadata', async () => {
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
        2
      )
    );

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
    expect(tree.exists('packages/ports/ghostty-plus/src/index.ts')).toBe(true);
    expect(
      tree.exists('packages/ports/ghostty-plus/src/lib/ghostty-plus.ts')
    ).toBe(true);
    expect(
      tree.exists('packages/ports/ghostty-plus/src/lib/ghostty-plus.spec.ts')
    ).toBe(true);
    expect(
      tree.exists('packages/ports/ghostty-plus/src/lib/templates/my-theme.eta')
    ).toBe(true);

    const portPackageJson = readJson(
      tree,
      'packages/ports/ghostty-plus/package.json'
    );
    expect(portPackageJson.sageveil).toEqual({
      displayName: 'Ghostty Plus',
      description: 'Custom Ghostty theme.',
      tags: ['terminal', 'emulator'],
    });

    const portSource = tree
      .read('packages/ports/ghostty-plus/src/lib/ghostty-plus.ts', 'utf-8')
      .trim();
    expect(portSource).toContain("templateFiles: ['my-theme.eta']");
  });

  it('adds the port to root tsconfig references after existing ports', async () => {
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
        2
      )
    );

    await generator(tree, {
      name: 'new-port',
      skipFormat: true,
      skipInstall: true,
    });

    const rootTsConfig = readJson(tree, 'tsconfig.json');
    const references = rootTsConfig.references.map(
      (reference: { path: string }) => reference.path
    );

    expect(references).toContain('./packages/ports/new-port');
    expect(references.indexOf('./packages/ports/new-port')).toBe(
      references.indexOf('./packages/ports/alacritty') + 1
    );
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
