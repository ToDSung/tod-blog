import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    'aria-label': 'Accept terms',
    size: 'md',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};
