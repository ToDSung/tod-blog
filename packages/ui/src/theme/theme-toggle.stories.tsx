import { expect, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ThemeProvider } from '@tod-workspace/ui/theme/theme-provider';
import { ThemeToggle } from '@tod-workspace/ui/theme/theme-toggle';

const meta = {
  title: 'Theme/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SwitchesThemeAndMode: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /toggle theme/i });
    const body = within(document.body);
    const root = document.documentElement;

    // Switch color theme to the contrast theme.
    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole('menuitemradio', { name: /ocean/i })
    );
    await waitFor(() => expect(root).toHaveAttribute('data-theme', 'ocean'));

    // Switch mode to dark (orthogonal to the color theme).
    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole('menuitemradio', { name: /dark/i })
    );
    await waitFor(() => expect(root).toHaveClass('dark'));
    await expect(root).toHaveAttribute('data-theme', 'ocean');

    // Back to defaults: professional removes data-theme, light removes .dark.
    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole('menuitemradio', { name: /professional/i })
    );
    await waitFor(() => expect(root).not.toHaveAttribute('data-theme'));

    await userEvent.click(trigger);
    await userEvent.click(
      await body.findByRole('menuitemradio', { name: /light/i })
    );
    await waitFor(() => expect(root).not.toHaveClass('dark'));

    // Let the menu finish closing so the a11y pass sees a settled page
    // (radix keeps aria-hidden on outside elements until the exit ends).
    await waitFor(() =>
      expect(document.querySelector('[data-aria-hidden]')).toBeNull()
    );
  },
};
