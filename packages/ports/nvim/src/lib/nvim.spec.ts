const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('nvim', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./nvim.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/nvim\/src\/lib\/templates$/
      ),
      templateFiles: [
        'colors/sageveil.lua',
        'lua/lualine/themes/sageveil-alt.lua',
        'lua/lualine/themes/sageveil.lua',
        'lua/sageveil/config.lua',
        'lua/sageveil/palette.lua',
        'lua/sageveil/utilities.lua',
        'lua/sageveil/types.lua',
        'lua/sageveil/plugins/blink.lua',
        'lua/sageveil/plugins/gitsigns.lua',
        'lua/sageveil/plugins/neotest.lua',
        'lua/sageveil/plugins/telescope.lua',
        'lua/sageveil.lua',
      ],
    });
  });
});
