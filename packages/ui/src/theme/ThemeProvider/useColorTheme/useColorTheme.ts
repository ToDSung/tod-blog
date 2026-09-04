'use client';

import { createContext, use } from 'react';

import type { ColorTheme } from '../constants';

export interface ColorThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

export const ColorThemeContext = createContext<ColorThemeContextValue | null>(
  null
);

export const useColorTheme = (): ColorThemeContextValue => {
  const context = use(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within <ThemeProvider>');
  }
  return context;
};
