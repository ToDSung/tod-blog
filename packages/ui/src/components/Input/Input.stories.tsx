import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from '@tod-workspace/ui/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    placeholder: 'Email',
    size: 'md',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Read-only value' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};

export const File: Story = {
  args: { type: 'file', placeholder: undefined },
};
