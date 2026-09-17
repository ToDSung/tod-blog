import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ThemeProvider, {
  COLOR_THEME_STORAGE_KEY,
  useColorTheme,
} from '@tod-workspace/ui/theme/ThemeProvider';

const root = document.documentElement;

const ColorThemeProbe = () => {
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <button
      onClick={() =>
        setColorTheme(colorTheme === 'ocean' ? 'professional' : 'ocean')
      }
    >
      {colorTheme}
    </button>
  );
};

const renderProbe = () =>
  render(
    <ThemeProvider>
      <ColorThemeProbe />
    </ThemeProvider>
  );

afterEach(() => {
  root.removeAttribute('data-theme');
  localStorage.clear();
});

describe('ThemeProvider', () => {
  it('starts on the default color theme', async () => {
    renderProbe();

    expect(
      await screen.findByRole('button', { name: 'professional' })
    ).toBeInTheDocument();
    expect(root).not.toHaveAttribute('data-theme');
  });

  it('restores a persisted color theme', async () => {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, 'ocean');

    renderProbe();

    expect(
      await screen.findByRole('button', { name: 'ocean' })
    ).toBeInTheDocument();
  });

  it('ignores a stored value that is not a known theme', async () => {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, 'sunset');

    renderProbe();

    expect(
      await screen.findByRole('button', { name: 'professional' })
    ).toBeInTheDocument();
  });

  it('writes the selected theme to the attribute and to storage', async () => {
    renderProbe();

    await userEvent.click(
      await screen.findByRole('button', { name: 'professional' })
    );

    await waitFor(() => expect(root).toHaveAttribute('data-theme', 'ocean'));
    expect(localStorage.getItem(COLOR_THEME_STORAGE_KEY)).toBe('ocean');
  });

  it('drops the attribute when the default theme is selected again', async () => {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, 'ocean');

    renderProbe();

    await userEvent.click(await screen.findByRole('button', { name: 'ocean' }));

    await waitFor(() => expect(root).not.toHaveAttribute('data-theme'));
    expect(localStorage.getItem(COLOR_THEME_STORAGE_KEY)).toBe('professional');
  });

  it('throws when useColorTheme is used outside the provider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<ColorThemeProbe />)).toThrow(/within <ThemeProvider>/);

    consoleError.mockRestore();
  });
});
