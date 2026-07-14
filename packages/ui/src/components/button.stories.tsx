import { expect, fn } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@tod-workspace/ui/components/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const Clickable: Story = {
  args: { children: 'Click me' },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Click me' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * Mechanical proof for spec §8.5: the primary token resolves to a different
 * computed color in each theme × mode combination.
 */
export const ThemeMatrix: Story = {
  args: { children: 'Theme matrix' },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Theme matrix' });
    // transition-all would make immediate computed-style reads see the
    // transition start value instead of the target color.
    button.style.transition = 'none';
    const root = document.documentElement;
    const combos: [string | null, boolean][] = [
      [null, false],
      [null, true],
      ['ocean', false],
      ['ocean', true],
    ];
    const seen = new Set<string>();

    try {
      for (const [theme, dark] of combos) {
        if (theme) {
          root.setAttribute('data-theme', theme);
        } else {
          root.removeAttribute('data-theme');
        }
        root.classList.toggle('dark', dark);
        seen.add(getComputedStyle(button).backgroundColor);
      }
    } finally {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
    }

    await expect(seen.size).toBe(4);
  },
};
