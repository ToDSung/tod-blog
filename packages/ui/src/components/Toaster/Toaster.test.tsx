import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import Toaster, { toast } from '@tod-workspace/ui/components/Toaster';
import ThemeProvider from '@tod-workspace/ui/theme/ThemeProvider';

const toaster = () =>
  document.querySelector<HTMLElement>('[data-sonner-toaster]');

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
  vi.restoreAllMocks();
  document.documentElement.classList.remove('dark');
  localStorage.clear();
});

describe('Toaster', () => {
  it('shows a toast raised through the re-exported toast()', async () => {
    render(<Toaster />);

    act(() => {
      toast('Link copied');
    });

    expect(await screen.findByText('Link copied')).toBeInTheDocument();
  });

  it('paints toasts with the popover tokens and a 10% foreground outline', async () => {
    render(<Toaster />);

    act(() => {
      toast('Saved');
    });
    await screen.findByText('Saved');

    expect(toaster()).toHaveStyle(`
      --normal-bg: var(--popover);
      --normal-text: var(--popover-foreground);
      --normal-border: color-mix(in oklab, var(--foreground) 10%, transparent);
      --border-radius: var(--radius);
    `);
  });

  it.each([
    ['success', 'lucide-circle-check'],
    ['info', 'lucide-info'],
    ['warning', 'lucide-triangle-alert'],
    ['error', 'lucide-octagon-x'],
    ['loading', 'animate-spin'],
  ] as const)('swaps the %s icon for a lucide one', async (type, iconClass) => {
    render(<Toaster />);

    act(() => {
      toast[type]('Published');
    });
    const item = (await screen.findByText('Published')).closest('li');

    expect(item?.querySelector('svg')).toHaveClass('lucide', iconClass);
  });

  it('follows the system colour scheme without a theme provider', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      query =>
        ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList
    );
    render(<Toaster />);

    act(() => {
      toast('System');
    });
    await screen.findByText('System');

    expect(toaster()).toHaveAttribute('data-sonner-theme', 'dark');
  });

  it('follows the next-themes mode', async () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <Toaster />
      </ThemeProvider>
    );

    act(() => {
      toast('Dark');
    });
    await screen.findByText('Dark');

    await waitFor(() =>
      expect(toaster()).toHaveAttribute('data-sonner-theme', 'dark')
    );
  });

  it('lets a caller-supplied prop override the computed one', async () => {
    render(<Toaster theme='dark' />);

    act(() => {
      toast('Forced');
    });
    await screen.findByText('Forced');

    expect(toaster()).toHaveAttribute('data-sonner-theme', 'dark');
  });
});
