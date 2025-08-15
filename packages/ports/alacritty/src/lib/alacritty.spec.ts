const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('alacritty', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./alacritty.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/alacritty\/src\/lib\/templates$/
      ),
      templateFiles: ['sageveil.toml'],
    });
  });
});

describe('alacritty template', () => {
  it('should generate valid TOML with palette data', async () => {
    const { Eta } = await import('eta');
    const { join } = await import('node:path');

    const mockPalette = {
      ansi: {
        base: {
          black: '#000000',
          red: '#ff0000',
          green: '#00ff00',
          yellow: '#ffff00',
          blue: '#0000ff',
          magenta: '#ff00ff',
          cyan: '#00ffff',
          white: '#ffffff',
        },
        bright: {
          black: '#808080',
          red: '#ff8080',
          green: '#80ff80',
          yellow: '#ffff80',
          blue: '#8080ff',
          magenta: '#ff80ff',
          cyan: '#80ffff',
          white: '#ffffff',
        },
        dim: {
          black: '#404040',
          red: '#800000',
          green: '#008000',
          yellow: '#808000',
          blue: '#000080',
          magenta: '#800080',
          cyan: '#008080',
          white: '#c0c0c0',
        },
      },
      extras: {
        cursor: '#ffffff',
        surface: '#333333',
      },
    };

    const templatePath = join(import.meta.dirname, './templates');
    const eta = new Eta({ views: templatePath });

    const result = await eta.renderAsync('sageveil.toml', mockPalette);

    expect(result).toContain('foreground = "#ffffff"');
    expect(result).toContain('background = "#000000"');
    expect(result).toContain('cursor = "#ffffff"');
    expect(result).toContain('red = "#ff0000"');
    expect(result).toContain('[colors.primary]');
    expect(result).toContain('[colors.normal]');
    expect(result).toContain('[colors.bright]');
    expect(result).toContain('[colors.dim]');
  });

  it('should include all required TOML sections', async () => {
    const { Eta } = await import('eta');
    const { join } = await import('node:path');

    const mockPalette = {
      ansi: { base: {}, bright: {}, dim: {} },
      extras: { cursor: '#fff', surface: '#333' },
    };

    const templatePath = join(import.meta.dirname, './templates');
    const eta = new Eta({ views: templatePath });

    const result = await eta.renderAsync('sageveil.toml', mockPalette);

    const requiredSections = [
      '[colors.primary]',
      '[colors.cursor]',
      '[colors.vi_mode_cursor]',
      '[colors.search.matches]',
      '[colors.search.focused_match]',
      '[colors.selection]',
      '[colors.hints.start]',
      '[colors.hints.end]',
      '[colors.line_indicator]',
      '[colors.footer_bar]',
      '[colors.normal]',
      '[colors.bright]',
      '[colors.dim]',
    ];

    requiredSections.forEach((section) => {
      expect(result).toContain(section);
    });
  });
});
