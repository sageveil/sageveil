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
    // black: '#151B13',
    black: '#101411',
    red: '#935155',
    green: '#67825B',
    yellow: '#B4A05A',
    blue: '#65806B',
    magenta: '#9D868C',
    cyan: '#916f54',
    white: '#A8AFA6',
  },
  bright: {
    // black: '#2A3226',
    black: '#26322A',
    red: '#b07a77',
    green: '#638a63',
    yellow: '#d4b573',
    blue: '#74997e',
    magenta: '#baa5ab',
    cyan: '#a37856',
    white: '#c3cdc0',
  },
};
