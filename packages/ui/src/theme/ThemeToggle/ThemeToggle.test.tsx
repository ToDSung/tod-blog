import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import ThemeProvider from '@tod-workspace/ui/theme/ThemeProvider';
import ThemeToggle from '@tod-workspace/ui/theme/ThemeToggle';

const root = document.documentElement;

const renderToggle = () => {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  return screen.getByRole('button', { name: /toggle theme/i });
};

// Radix swallows the next click if the previous menu is still mounted, so
// every selection waits for the old menu to go before reopening.
const selectItem = async (trigger: HTMLElement, name: RegExp) => {
  await waitFor(() =>
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  );
  await userEvent.click(trigger);
  await screen.findByRole('menu');
  await userEvent.click(screen.getByRole('menuitemradio', { name }));
};

afterEach(() => {
  root.removeAttribute('data-theme');
  root.classList.remove('dark');
  localStorage.clear();
});

describe('ThemeToggle', () => {
  it('offers both a color theme and a mode group', async () => {
    const trigger = renderToggle();

    await userEvent.click(trigger);

    await screen.findByRole('menu');
    expect(
      screen.getByRole('menuitemradio', { name: /professional/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitemradio', { name: /system/i })
    ).toBeInTheDocument();
  });

  it('switches the color theme and the mode independently', async () => {
    const trigger = renderToggle();

    await selectItem(trigger, /ocean/i);
    await waitFor(() => expect(root).toHaveAttribute('data-theme', 'ocean'));

    await selectItem(trigger, /dark/i);
    await waitFor(() => expect(root).toHaveClass('dark'));
    expect(root).toHaveAttribute('data-theme', 'ocean');

    await selectItem(trigger, /professional/i);
    await waitFor(() => expect(root).not.toHaveAttribute('data-theme'));
    expect(root).toHaveClass('dark');

    await selectItem(trigger, /light/i);
    await waitFor(() => expect(root).not.toHaveClass('dark'));
  });
});
