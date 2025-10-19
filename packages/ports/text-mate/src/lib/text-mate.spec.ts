const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('text-mate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./text-mate.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/text-mate\/src\/lib\/templates$/
      ),
      templateFiles: ['sageveil.tmTheme'],
    });
  });
});

describe('text-mate template', () => {
  it('should include key sageveil colors', async () => {
    const { Eta } = await import('eta');
    const { join } = await import('node:path');

    const mockPalette = {
      ansi: {
        base: {
          black: '#111111',
          red: '#aa5555',
          green: '#55aa55',
          yellow: '#d4b573',
          blue: '#5577aa',
          magenta: '#aa55aa',
          cyan: '#55aaaa',
          white: '#dde0dd',
        },
        bright: {
          black: '#222222',
          red: '#ff8888',
          green: '#88ff88',
          yellow: '#ffee99',
          blue: '#99aaff',
          magenta: '#ff99ff',
          cyan: '#99ffff',
          white: '#f5f8f5',
        },
      },
      extras: {
        surface: '#1a1f1c',
        overlay: '#222926',
        highlight: '#313a37',
        border: '#404844',
        muted: '#889088',
        dim: '#506058',
        cursor: '#dde0dd',
        cursor_text: '#111111',
      },
    };

    const templatePath = join(import.meta.dirname, './templates');
    const eta = new Eta({ views: templatePath });

    const result = await eta.renderAsync('sageveil.tmTheme', mockPalette);

    expect(result).toContain('theme.dark.sageveil');
    expect(result).toContain('<key>selection</key>');
    expect(result).toContain('<string>#313a37</string>');
    expect(result).toContain('<string>#aa55aa</string>');
    expect(result).toContain('<string>#55aa55</string>');
    expect(result).toContain('<string>#99ffff</string>');
  });
});
