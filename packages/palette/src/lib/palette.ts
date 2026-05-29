import { ansi } from './ansi.js';

const { base, bright } = ansi;

export const sageveil = {
  ansi: {
    base,
    bright,
  },

  extras: {
    surface: '#1C211E',
    overlay: '#212723',
    highlight: '#241d21',

    border: '#4E504C',

    muted: '#8A928B',
    dim: '#6F7B6F',

    cursor: base.white,
    cursor_text: base.black,
  },
} as const;
export type Sageveil = typeof sageveil;
