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
