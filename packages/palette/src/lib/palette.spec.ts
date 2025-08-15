import { describe, it, expect } from 'vitest';
import { sageveil } from '../lib/palette.js';

const isValidHexColor = (value: string): boolean => {
  return /^#[0-9a-fA-F]{6}$/.test(value);
};

const expectedAnsiColors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
];
const expectedAnsiVariants = ['base', 'bright'];
const expectedExtrasKeys = [
  'surface',
  'overlay',
  'highlight',
  'border',
  'muted',
  'dim',
  'cursor',
  'cursor_text',
];

describe('sageveil palette', () => {
  it('should have the correct top-level structure', () => {
    expect(sageveil).toHaveProperty('ansi');
    expect(sageveil).toHaveProperty('extras');
    expect(Object.keys(sageveil)).toEqual(['ansi', 'extras']);
  });

  it('should have correct ANSI variants structure', () => {
    expectedAnsiVariants.forEach((variant) => {
      expect(sageveil.ansi).toHaveProperty(variant);
      expect(typeof sageveil.ansi[variant as keyof typeof sageveil.ansi]).toBe(
        'object'
      );
    });
  });

  it('should have all expected ANSI colors in each variant', () => {
    expectedAnsiVariants.forEach((variant) => {
      const variantColors =
        sageveil.ansi[variant as keyof typeof sageveil.ansi];
      expectedAnsiColors.forEach((color) => {
        expect(variantColors).toHaveProperty(color);
      });
      expect(Object.keys(variantColors)).toEqual(expectedAnsiColors);
    });
  });

  it('should have correct extras structure', () => {
    expectedExtrasKeys.forEach((key) => {
      expect(sageveil.extras).toHaveProperty(key);
    });
    expect(Object.keys(sageveil.extras)).toEqual(expectedExtrasKeys);
  });

  it('should have valid hex color strings for all ANSI colors', () => {
    expectedAnsiVariants.forEach((variant) => {
      const variantColors =
        sageveil.ansi[variant as keyof typeof sageveil.ansi];
      expectedAnsiColors.forEach((color) => {
        const colorValue = variantColors[color as keyof typeof variantColors];
        expect(typeof colorValue).toBe('string');
        expect(isValidHexColor(colorValue)).toBe(true);
      });
    });
  });

  it('should have valid hex color strings for all extras', () => {
    expectedExtrasKeys.forEach((key) => {
      const colorValue = sageveil.extras[key as keyof typeof sageveil.extras];
      expect(typeof colorValue).toBe('string');
      expect(isValidHexColor(colorValue)).toBe(true);
    });
  });
});
