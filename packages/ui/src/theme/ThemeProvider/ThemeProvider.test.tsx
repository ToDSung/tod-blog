import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';
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

const ModeProbe = () => {
  const { setTheme } = useTheme();

  return <button onClick={() => setTheme('dark')}>dark</button>;
};

afterEach(() => {
  root.removeAttribute('data-theme');
  root.classList.remove('dark');
  localStorage.clear();
  vi.restoreAllMocks();
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
    expect(
      await screen.findByRole('button', { name: 'ocean' })
    ).toBeInTheDocument();
  });

  it('falls back to the applied attribute when storage has no theme', async () => {
    root.setAttribute('data-theme', 'ocean');

    renderProbe();

    expect(
      await screen.findByRole('button', { name: 'ocean' })
    ).toBeInTheDocument();
  });

  it('still applies the theme when storage refuses the write', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    renderProbe();

    await userEvent.click(
      await screen.findByRole('button', { name: 'professional' })
    );

    expect(
      await screen.findByRole('button', { name: 'ocean' })
    ).toBeInTheDocument();
  });

  it('drops the attribute when the default theme is selected again', async () => {
    renderProbe();

    await userEvent.click(
      await screen.findByRole('button', { name: 'professional' })
    );
    await waitFor(() => expect(root).toHaveAttribute('data-theme', 'ocean'));
    await userEvent.click(screen.getByRole('button', { name: 'ocean' }));

    await waitFor(() => expect(root).not.toHaveAttribute('data-theme'));
    expect(localStorage.getItem(COLOR_THEME_STORAGE_KEY)).toBe('professional');
  });

  it('drives the light and dark mode through next-themes', async () => {
    render(
      <ThemeProvider>
        <ModeProbe />
      </ThemeProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'dark' }));

    await waitFor(() => expect(root).toHaveClass('dark'));
  });

  it('throws when useColorTheme is used outside the provider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<ColorThemeProbe />)).toThrow(/within <ThemeProvider>/);

    consoleError.mockRestore();
  });
});
