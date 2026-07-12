import type {
  ExtensionAPI,
  ExtensionContext,
} from '@earendil-works/pi-coding-agent';
import { fuzzyFilter } from '@earendil-works/pi-tui';

const fileSuggestions = (files: string[], query: string, quoted: boolean) =>
  fuzzyFilter(files, query, (file) => file)
    .slice(0, 100)
    .map((file) => ({
      value: quoted || file.includes(' ') ? `@"${file}"` : `@${file}`,
      label: file,
    }));

export const enableFuzzyFiles = async (
  pi: ExtensionAPI,
  ctx: ExtensionContext,
) => {
  const result = await pi.exec(
    'fd',
    [
      '--type',
      'f',
      '--hidden',
      '--exclude',
      '.git',
      '--exclude',
      'node_modules',
      '--max-results',
      '10000',
      '.',
    ],
    { cwd: ctx.cwd, timeout: 5000 },
  );
  const files =
    result.code === 0
      ? result.stdout
          .split('\n')
          .filter(Boolean)
          .map((file) => file.replace(/^\.\//, ''))
      : [];
  if (!files.length) return;

  ctx.ui.addAutocompleteProvider((current) => ({
    async getSuggestions(lines, cursorLine, cursorCol, options) {
      const beforeCursor = (lines[cursorLine] ?? '').slice(0, cursorCol);
      const match = beforeCursor.match(/(?:^|[ \t])@(?:"([^"]*)|([^\s@]*))$/);
      if (!match)
        return current.getSuggestions(lines, cursorLine, cursorCol, options);
      const quoted = match[1] !== undefined;
      const query = match[1] ?? match[2] ?? '';
      const items = fileSuggestions(files, query, quoted);
      return items.length
        ? { prefix: `${quoted ? '@"' : '@'}${query}`, items }
        : current.getSuggestions(lines, cursorLine, cursorCol, options);
    },
    applyCompletion(lines, cursorLine, cursorCol, item, prefix) {
      return current.applyCompletion(
        lines,
        cursorLine,
        cursorCol,
        item,
        prefix,
      );
    },
    shouldTriggerFileCompletion(lines, cursorLine, cursorCol) {
      return (
        current.shouldTriggerFileCompletion?.(lines, cursorLine, cursorCol) ??
        true
      );
    },
  }));
};
