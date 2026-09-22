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
  it('keeps text and both greens readable across UI backgrounds', () => {
    const luminance = (hex: string) => {
      const channels = [1, 3, 5].map((offset) => {
        const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };

    const { base, bright } = sageveil.ansi;
    const { surface, overlay, highlight } = sageveil.extras;
    for (const background of [base.black, surface, overlay, highlight]) {
      for (const foreground of [base.white, base.green, bright.green]) {
        expect(
          (luminance(foreground) + 0.05) / (luminance(background) + 0.05),
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
    expect(luminance(base.black)).toBeLessThan(luminance(surface));
    expect(luminance(surface)).toBeLessThan(luminance(overlay));
    expect(luminance(overlay)).toBeLessThan(luminance(highlight));
    expect(luminance(base.green)).toBeLessThan(luminance(bright.green));
  });

  it('should have the correct top-level structure', () => {
    expect(sageveil).toHaveProperty('ansi');
    expect(sageveil).toHaveProperty('extras');
    expect(Object.keys(sageveil)).toEqual(['ansi', 'extras']);
  });

  it('should have correct ANSI variants structure', () => {
    expectedAnsiVariants.forEach((variant) => {
      expect(sageveil.ansi).toHaveProperty(variant);
      expect(typeof sageveil.ansi[variant as keyof typeof sageveil.ansi]).toBe(
        'object',
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
