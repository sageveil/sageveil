const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('obsidian', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./obsidian.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/obsidian\/src\/lib\/templates$/
      ),
      templateFiles: ['sageveil.css.eta'],
    });
  });
});
