import type { Meta, StoryObj } from '@storybook/react-vite';

import Switch from '@tod-workspace/ui/components/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    'aria-label': 'Airplane mode',
    size: 'md',
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};
