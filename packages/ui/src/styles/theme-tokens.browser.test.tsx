import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Button from '@tod-workspace/ui/components/Button';

const root = document.documentElement;

const COMBINATIONS = [
  { theme: null, dark: false },
  { theme: null, dark: true },
  { theme: 'ocean', dark: false },
  { theme: 'ocean', dark: true },
] as const;

afterEach(() => {
  root.removeAttribute('data-theme');
  root.classList.remove('dark');
});

describe('theme tokens', () => {
  it('resolves a distinct primary color in every theme x mode combination', () => {
    render(<Button>Theme matrix</Button>);
    const button = screen.getByRole('button', { name: 'Theme matrix' });
    // An immediate computed-style read would return the transition start value.
    button.style.transition = 'none';

    const seen = new Set<string>();
    for (const { theme, dark } of COMBINATIONS) {
      if (theme) {
        root.setAttribute('data-theme', theme);
      } else {
        root.removeAttribute('data-theme');
      }
      root.classList.toggle('dark', dark);
      seen.add(getComputedStyle(button).backgroundColor);
    }

    expect(seen.size).toBe(4);
  });
});
