const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('fzf', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./fzf.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/fzf\/src\/lib\/templates$/
      ),
      templateFiles: [
        'sageveil.fish',
        'sageveil.nix',
        'sageveil.ps1',
        'sageveil.sh',
      ],
    });
  });
});
