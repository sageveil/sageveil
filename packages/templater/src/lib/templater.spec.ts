/* eslint-disable @typescript-eslint/no-empty-function */
import { Mock } from 'vitest';
import { render, type RenderJob } from './templater.js';

vi.mock('@sageveil/palette', () => ({
  sageveil: { black: '#000', white: '#fff' },
}));

vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn(),
  writeFile: vi.fn(),
}));

vi.mock('eta', () => ({
  Eta: vi.fn(),
}));

const mockMkdir = vi.mocked(await import('node:fs/promises')).mkdir;
const mockWriteFile = vi.mocked(await import('node:fs/promises')).writeFile;
const MockEta = vi.mocked(await import('eta')).Eta as Mock;

describe('templater', () => {
  let mockEtaInstance: any;
  let consoleSpy: any;
  let processExitSpy: any;

  beforeEach(() => {
    mockEtaInstance = {
      renderAsync: vi.fn(),
    };
    MockEta.mockImplementation(() => mockEtaInstance);
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    processExitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation((() => {}) as never);

    mockMkdir.mockResolvedValue(undefined);
    mockWriteFile.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('render', () => {
    it('should successfully render template files', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['index.html.eta', 'styles.css.eta'],
      };

      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('<html>Test</html>')
        .mockResolvedValueOnce('body { color: red; }');

      await render(job);

      expect(MockEta).toHaveBeenCalledWith({ views: './templates' });
      expect(mockMkdir).toHaveBeenCalledWith('dist/ports/test', {
        recursive: true,
      });
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledTimes(2);
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledWith(
        'index.html.eta',
        { black: '#000', white: '#fff' }
      );
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledWith(
        'styles.css.eta',
        { black: '#000', white: '#fff' }
      );
      expect(mockWriteFile).toHaveBeenCalledTimes(2);
      expect(processExitSpy).not.toHaveBeenCalled();
    });

    it('should handle template rendering failures', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['failing-template.eta'],
      };

      const error = new Error('Template rendering failed');
      mockEtaInstance.renderAsync.mockRejectedValue(error);

      await render(job);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to render template "failing-template.eta":',
        error
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle partial failures', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['success.eta', 'failure.eta'],
      };

      const error = new Error('Second template failed');
      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('<html>Success</html>')
        .mockRejectedValueOnce(error);

      await render(job);

      expect(mockWriteFile).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to render template "failure.eta":',
        error
      );
      expect(processExitSpy).toHaveBeenCalledWith(1);
    });

    it('should handle nested output directories', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['nested/deep/template.eta'],
      };

      mockEtaInstance.renderAsync.mockResolvedValue('<html>Nested</html>');

      await render(job);

      expect(mockMkdir).toHaveBeenCalledWith(
        expect.stringMatching(/nested[\\/]deep$/),
        { recursive: true }
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/nested[\\/]deep[\\/]template$/),
        '<html>Nested</html>',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o644,
        })
      );
    });

    it('should remove .eta extension from output files', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['index.html.eta', 'style.css.eta'],
      };

      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('<html>Index</html>')
        .mockResolvedValueOnce('.class { color: blue; }');

      await render(job);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/index\.html$/),
        '<html>Index</html>',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o644,
        })
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/style\.css$/),
        '.class { color: blue; }',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o644,
        })
      );
    });

    it('should keep directories containing .eta in their names', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['scripts/.eta-config/init.eta'],
      };

      mockEtaInstance.renderAsync.mockResolvedValue('init config');

      await render(job);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/scripts[\\/]\.eta-config[\\/]init$/),
        'init config',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o644,
        })
      );
    });

    it('should make selected files executable', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: [
          { filename: 'script.sh.eta', executable: true },
          'style.css.eta',
        ],
      };

      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('#!/usr/bin/env bash')
        .mockResolvedValueOnce('.class { color: blue; }');

      await render(job);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/script\.sh$/),
        '#!/usr/bin/env bash',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o755,
        })
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/style\.css$/),
        '.class { color: blue; }',
        expect.objectContaining({
          encoding: 'utf8',
          mode: 0o644,
        })
      );
    });

    it('should handle empty template files array', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: [],
      };

      await render(job);

      expect(mockEtaInstance.renderAsync).not.toHaveBeenCalled();
      expect(mockWriteFile).not.toHaveBeenCalled();
      expect(processExitSpy).not.toHaveBeenCalled();
    });
  });
});
