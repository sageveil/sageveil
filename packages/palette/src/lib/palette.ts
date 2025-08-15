import { ansi } from './ansi.js';

const { base, bright } = ansi;

export const sageveil = {
  ansi: {
    base,
    bright,
  },

  extras: {
    surface: '#1D2320',
    overlay: '#232B27',
    highlight: '#3F322C',

    border: '#4E504C',

    muted: '#8C918C',
    dim: '#616560',

    cursor: base.white,
    cursor_text: base.black,
  },
} as const;
export type SageVeil = typeof sageveil;
