/* eslint-disable @typescript-eslint/no-empty-function */
import { Mock } from 'vitest';
import { render, type RenderJob } from './templater.js';

vi.mock('@sageveil/palette', () => ({
  sageveil: { theme: 'dark', color: 'blue' },
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
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
    processExitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation((() => { }) as never);

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
        ctx: { title: 'Test App' },
      };

      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('<html>Test</html>')
        .mockResolvedValueOnce('body { color: red; }');

      await render(job);

      expect(MockEta).toHaveBeenCalledWith({ views: './templates' });
      expect(mockMkdir).toHaveBeenCalledWith('dist/packages/ports/test', {
        recursive: true,
      });
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledTimes(2);
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledWith(
        'index.html.eta',
        { theme: 'dark', color: 'blue' }
      );
      expect(mockEtaInstance.renderAsync).toHaveBeenCalledWith(
        'styles.css.eta',
        { theme: 'dark', color: 'blue' }
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

      expect(consoleSpy).toHaveBeenCalledWith(error);
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
      expect(consoleSpy).toHaveBeenCalledWith(error);
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
        expect.stringContaining('nested/deep'),
        { recursive: true }
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('nested/deep/template'),
        '<html>Nested</html>',
        'utf8'
      );
    });

    it('should remove .eta extension from output files', async () => {
      const job: RenderJob = {
        templateDir: './templates',
        templateFiles: ['component.tsx.eta', 'style.css.eta'],
      };

      mockEtaInstance.renderAsync
        .mockResolvedValueOnce('const Component = () => {};')
        .mockResolvedValueOnce('.class { color: blue; }');

      await render(job);

      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/component\.tsx$/),
        'const Component = () => {};',
        'utf8'
      );
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringMatching(/style\.css$/),
        '.class { color: blue; }',
        'utf8'
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
