'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { ReactNode } from 'react';

export const COLOR_THEMES = ['professional', 'ocean'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export const DEFAULT_COLOR_THEME: ColorTheme = 'professional';

const STORAGE_KEY = 'tod-ui-color-theme';

interface ColorThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextValue | null>(null);

export const useColorTheme = (): ColorThemeContextValue => {
  const context = use(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within <ThemeProvider>');
  }
  return context;
};

const isColorTheme = (value: string | null): value is ColorTheme =>
  value !== null && (COLOR_THEMES as readonly string[]).includes(value);

const applyColorTheme = (theme: ColorTheme) => {
  if (theme === DEFAULT_COLOR_THEME) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
};

// Self-authored constant (no user input reaches it): restores a persisted
// non-default theme before hydration so static export cannot flash the
// default theme (FR4).
const bootstrapScript = `try{var t=localStorage.getItem('${STORAGE_KEY}');if(t&&t!=='${DEFAULT_COLOR_THEME}'&&${JSON.stringify([...COLOR_THEMES])}.indexOf(t)>-1)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

const ColorThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorThemeState] =
    useState<ColorTheme>(DEFAULT_COLOR_THEME);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (isColorTheme(stored)) {
      setColorThemeState(stored);
    }
  }, []);

  const setColorTheme = useCallback((theme: ColorTheme) => {
    setColorThemeState(theme);
    applyColorTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(
    () => ({ colorTheme, setColorTheme }),
    [colorTheme, setColorTheme]
  );

  return (
    <ColorThemeContext value={value}>
      <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      {children}
    </ColorThemeContext>
  );
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * App-side entry point for the theme system (spec D9): next-themes owns the
 * light/dark mode (`.dark` class, system-aware, FOUC-free), while the color
 * theme is an orthogonal `data-theme` attribute managed by ColorThemeProvider.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
