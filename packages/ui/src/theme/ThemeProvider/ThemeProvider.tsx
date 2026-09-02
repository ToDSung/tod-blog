'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { ColorTheme } from './constants';
import type { ReactNode } from 'react';

import {
  COLOR_THEMES,
  COLOR_THEME_STORAGE_KEY,
  DEFAULT_COLOR_THEME,
} from './constants';
import { ColorThemeContext } from './useColorTheme';

// Runs before hydration so a static export never flashes the default theme;
// only the constants above are interpolated, so nothing injectable gets in.
const BOOTSTRAP_SCRIPT = `try{var t=localStorage.getItem('${COLOR_THEME_STORAGE_KEY}');if(t&&t!=='${DEFAULT_COLOR_THEME}'&&${JSON.stringify([...COLOR_THEMES])}.indexOf(t)>-1)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

const isColorTheme = (value: string | null): value is ColorTheme =>
  value !== null && (COLOR_THEMES as readonly string[]).includes(value);

export interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorTheme, setColorThemeState] =
    useState<ColorTheme>(DEFAULT_COLOR_THEME);

  // Reading storage during render would diverge from the server-rendered HTML,
  // so the stored theme only lands after mount; BOOTSTRAP_SCRIPT keeps the DOM
  // correct until then.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
      if (isColorTheme(stored)) {
        setColorThemeState(stored);
      }
    } catch {
      // Storage can be blocked (private mode); the default theme still renders.
    }
  }, []);

  const setColorTheme = useCallback((theme: ColorTheme) => {
    setColorThemeState(theme);

    // The default theme is the bare `:root` block, so it removes the attribute.
    if (theme === DEFAULT_COLOR_THEME) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    try {
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
    } catch {
      // A lost preference is not worth throwing over.
    }
  }, []);

  const colorThemeValue = useMemo(
    () => ({ colorTheme, setColorTheme }),
    [colorTheme, setColorTheme]
  );

  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
    >
      <ColorThemeContext value={colorThemeValue}>
        <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP_SCRIPT }} />
        {children}
      </ColorThemeContext>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
