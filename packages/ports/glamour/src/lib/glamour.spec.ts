const mockRender = vi.fn();

vi.mock('@sageveil/templater', () => ({
  render: mockRender,
}));

describe('glamour', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call render with correct template configuration', async () => {
    mockRender.mockResolvedValue(undefined);

    await import('./glamour.js');

    expect(mockRender).toHaveBeenCalledOnce();
    expect(mockRender).toHaveBeenCalledWith({
      templateDir: expect.stringMatching(
        /packages\/ports\/glamour\/src\/lib\/templates$/
      ),
      templateFiles: ['sageveil.json.eta'],
    });
  });
});
