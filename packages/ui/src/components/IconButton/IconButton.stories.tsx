import { PaletteIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import IconButton from '@tod-workspace/ui/components/IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    'aria-label': 'Toggle theme',
    children: <PaletteIcon />,
    size: 'md',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
