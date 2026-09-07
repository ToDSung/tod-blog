import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    'aria-label': 'Accept terms',
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

export const DisabledChecked: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};

export const InvalidChecked: Story = {
  args: { 'aria-invalid': true, defaultChecked: true },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Checkbox aria-label='Small' defaultChecked size='sm' />
      <Checkbox aria-label='Medium' defaultChecked size='md' />
      <Checkbox aria-label='Large' defaultChecked size='lg' />
    </div>
  ),
};
