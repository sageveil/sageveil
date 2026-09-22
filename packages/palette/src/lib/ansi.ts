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
    black: '#0F120F',
    red: '#9A6B6B',
    green: '#90976B',
    yellow: '#A09360',
    blue: '#8A8493',
    magenta: '#876f7f',
    cyan: '#7C9173',
    white: '#A8AFA6',
  },
  bright: {
    black: '#262F26',
    red: '#B08585',
    green: '#959878',
    yellow: '#BCAE76',
    blue: '#A39DAC',
    magenta: '#947e8d',
    cyan: '#94A58A',
    white: '#c3cdc0',
  },
};
