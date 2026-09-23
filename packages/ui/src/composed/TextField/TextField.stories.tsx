import type { Meta, StoryObj } from '@storybook/react-vite';

import TextField from '@tod-workspace/ui/composed/TextField';

const meta = {
  title: 'Composed/TextField',
  component: TextField,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    className: 'w-80',
    label: 'Email',
    placeholder: 'you@example.com',
    size: 'md',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'We never share your email.' },
};

export const Invalid: Story = {
  args: {
    description: 'We never share your email.',
    error: 'Enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
