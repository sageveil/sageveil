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
    green: '#7E9270',
    yellow: '#AC9C66',
    blue: '#8A8294',
    magenta: '#A37F90',
    cyan: '#6F9476',
    white: '#A8AFA6',
  },
  bright: {
    black: '#26322A',
    red: '#B08585',
    green: '#95A888',
    yellow: '#C6B67E',
    blue: '#A39DAC',
    magenta: '#BC9AAC',
    cyan: '#88AB90',
    white: '#c3cdc0',
  },
};
