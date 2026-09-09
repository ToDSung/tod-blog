import type { Meta, StoryObj } from '@storybook/react-vite';

import Switch from '@tod-workspace/ui/components/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    'aria-label': 'Airplane mode',
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

export const DisabledChecked: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Switch aria-label='Small' defaultChecked size='sm' />
      <Switch aria-label='Medium' defaultChecked size='md' />
      <Switch aria-label='Large' defaultChecked size='lg' />
    </div>
  ),
};
