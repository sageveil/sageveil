import { describe, expect, it, vi } from 'vitest';

type MockCustomEditor = {
  autocomplete: boolean;
  inputs: string[];
};

vi.mock('@earendil-works/pi-coding-agent', () => ({
  CustomEditor: class {
    autocomplete = false;
    inputs: string[] = [];

    isShowingAutocomplete() {
      return this.autocomplete;
    }

    handleInput(data: string) {
      this.inputs.push(data);
    }
  },
}));
vi.mock('@earendil-works/pi-tui', () => ({
  matchesKey: (data: string, key: string) =>
    key === 'escape' && data === '\x1b',
  decodeKittyPrintable: (data: string) => data,
}));

import { VimEditor } from './templates/extensions/vim.ts';

describe('VimEditor', () => {
  it('closes autocomplete before leaving insert mode', () => {
    const editor = new VimEditor(
      {} as never,
      {} as never,
      {} as never,
    ) as unknown as MockCustomEditor & { mode: string };
    editor.autocomplete = true;

    editor.handleInput('\x1b');

    expect(editor.inputs).toEqual(['\x1b']);
    expect(editor.mode).toBe('insert');
  });
});
