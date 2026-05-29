export type AnsiName =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white';

export type AnsiVariant = 'base' | 'bright';

export type AnsiSet<T extends string = string> = Record<AnsiName, T>;
export type AnsiPalette<T extends string = string> = {
  base: AnsiSet<T>;
  bright: AnsiSet<T>;
};

export const ansi: AnsiPalette<string> = {
  base: {
    black: '#101411',
    red: '#9A6B6B',
    green: '#859270',
    yellow: '#A69966',
    blue: '#8A8493',
    magenta: '#876f7f',
    cyan: '#7F9476',
    white: '#A8AFA6',
  },
  bright: {
    black: '#26322A',
    red: '#B08585',
    green: '#99A888',
    yellow: '#C6B67E',
    blue: '#A39DAC',
    magenta: '#947e8d',
    cyan: '#9AAB90',
    white: '#c3cdc0',
  },
};
