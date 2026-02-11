import { describe, expect, it } from 'vitest';
import { buildPortLinks, defaultRepoUrl } from './port-links';

describe('buildPortLinks', () => {
  it('builds monorepo links when repo URL is the default monorepo', () => {
    const links = buildPortLinks({
      repoUrl: defaultRepoUrl,
      slug: 'tmux',
      version: '0.2.1',
    });

    expect(links).toEqual({
      codeUrl: 'https://github.com/sageveil/sageveil/tree/main/packages/ports/tmux',
      releaseUrl: 'https://github.com/sageveil/tmux/releases/tag/0.2.1',
      downloadUrl:
        'https://github.com/sageveil/tmux/releases/download/0.2.1/sageveil-tmux-0.2.1.zip',
    });
  });

  it('builds per-port repository links when a custom repo URL is set', () => {
    const links = buildPortLinks({
      repoUrl: 'https://github.com/acme/sageveil',
      slug: 'tmux',
      version: '0.2.1',
    });

    expect(links).toEqual({
      codeUrl: 'https://github.com/acme/tmux',
      releaseUrl: 'https://github.com/acme/tmux/releases/tag/0.2.1',
      downloadUrl:
        'https://github.com/acme/tmux/releases/download/0.2.1/sageveil-tmux-0.2.1.zip',
    });
  });

  it('uses the default URL when no repo URL is provided', () => {
    const links = buildPortLinks({
      slug: 'nvim',
      version: '1.0.0',
    });

    expect(links.codeUrl).toBe(
      'https://github.com/sageveil/sageveil/tree/main/packages/ports/nvim'
    );
    expect(links.releaseUrl).toBe('https://github.com/sageveil/nvim/releases/tag/1.0.0');
    expect(links.downloadUrl).toBe(
      'https://github.com/sageveil/nvim/releases/download/1.0.0/sageveil-nvim-1.0.0.zip'
    );
  });
});
