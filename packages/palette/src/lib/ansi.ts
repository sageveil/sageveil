export type AnsiName =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white";

export type AnsiVariant = "base" | "bright";

export type AnsiSet<T extends string = string> = Record<AnsiName, T>;
export type AnsiPalette<T extends string = string> = {
  base: AnsiSet<T>;
  bright: AnsiSet<T>;
};

export const ansi: AnsiPalette<string> = {
  base: {
    black: "#0F120F",
    red: "#A07868",
    green: "#7F8660",
    yellow: "#A09360",
    blue: "#929087",
    magenta: "#907E87",
    cyan: "#9D8B73",
    white: "#A8AFA6",
  },
  bright: {
    black: "#262F26",
    red: "#B88E7B",
    green: "#838a6B",
    yellow: "#BCAE76",
    blue: "#ADAAA0",
    magenta: "#99858F",
    cyan: "#B8A388",
    white: "#C3CDC0",
  },
};
