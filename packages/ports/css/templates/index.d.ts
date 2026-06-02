// sageveil colorscheme — design tokens
// Generated from @sageveil/palette. Do not edit by hand.

export interface SageveilAnsiColors {
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  magenta: string;
  cyan: string;
  white: string;
}

export interface SageveilExtras {
  surface: string;
  overlay: string;
  highlight: string;
  border: string;
  muted: string;
  dim: string;
  cursor: string;
  cursor_text: string;
}

export interface Sageveil {
  ansi: {
    base: SageveilAnsiColors;
    bright: SageveilAnsiColors;
  };
  extras: SageveilExtras;
}

export declare const sageveil: Sageveil;
export default sageveil;
