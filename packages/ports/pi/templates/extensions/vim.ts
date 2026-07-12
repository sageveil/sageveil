import { CustomEditor } from '@earendil-works/pi-coding-agent';
import { decodeKittyPrintable, matchesKey } from '@earendil-works/pi-tui';

export type VimMode = 'insert' | 'normal';

export class VimEditor extends CustomEditor {
  constructor(...args: ConstructorParameters<typeof CustomEditor>) {
    super(...args);
  }

  private mode: VimMode = 'insert';

  onModeChange?: (mode: VimMode) => void;

  private setMode(mode: VimMode) {
    this.mode = mode;
    this.onModeChange?.(mode);
  }

  handleInput(data: string): void {
    if (matchesKey(data, 'escape')) {
      if (this.mode === 'insert' && this.isShowingAutocomplete())
        super.handleInput(data);
      else if (this.mode === 'insert') this.setMode('normal');
      else super.handleInput(data);
      return;
    }
    if (this.mode === 'insert') {
      super.handleInput(data);
      return;
    }

    const printable = decodeKittyPrintable(data);
    switch (printable ?? data) {
      case 'i':
        this.setMode('insert');
        return;
      case 'a':
        super.handleInput('\x1b[C');
        this.setMode('insert');
        return;
      case 'A':
        super.handleInput('\x05');
        this.setMode('insert');
        return;
      case 'I':
        super.handleInput('\x01');
        this.setMode('insert');
        return;
      case 'o':
        super.handleInput('\x05');
        super.handleInput('\x1b\r');
        this.setMode('insert');
        return;
      case 'O':
        super.handleInput('\x01');
        super.handleInput('\x1b\r');
        super.handleInput('\x1b[A');
        this.setMode('insert');
        return;
      case 'h':
        super.handleInput('\x1b[D');
        return;
      case 'j':
        super.handleInput('\x1b[B');
        return;
      case 'k':
        super.handleInput('\x1b[A');
        return;
      case 'l':
        super.handleInput('\x1b[C');
        return;
      case '0':
        super.handleInput('\x01');
        return;
      case '$':
        super.handleInput('\x05');
        return;
      case 'x':
        super.handleInput('\x1b[3~');
        return;
    }

    if (printable || (data.length === 1 && data.charCodeAt(0) >= 32)) return;
    super.handleInput(data);
  }
}
