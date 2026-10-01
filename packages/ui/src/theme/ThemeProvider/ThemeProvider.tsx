'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useCallback, useMemo, useSyncExternalStore } from 'react';

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

// Another tab's write does not restyle this document, so no storage listener.
const storeListeners = new Set<() => void>();

const subscribeToAppliedTheme = (onStoreChange: () => void) => {
  storeListeners.add(onStoreChange);

  return () => {
    storeListeners.delete(onStoreChange);
  };
};

const readAppliedTheme = (): ColorTheme => {
  try {
    const stored = localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    if (isColorTheme(stored)) {
      return stored;
    }
  } catch {
    // Storage can be blocked (private mode); the attribute is the fallback.
  }

  const applied = document.documentElement.getAttribute('data-theme');
  return isColorTheme(applied) ? applied : DEFAULT_COLOR_THEME;
};

const readDefaultTheme = (): ColorTheme => DEFAULT_COLOR_THEME;

export interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorTheme = useSyncExternalStore(
    subscribeToAppliedTheme,
    readAppliedTheme,
    readDefaultTheme
  );

  const setColorTheme = useCallback((theme: ColorTheme) => {
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

    storeListeners.forEach(notify => notify());
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
