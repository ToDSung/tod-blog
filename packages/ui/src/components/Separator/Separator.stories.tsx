import type { Meta, StoryObj } from '@storybook/react-vite';

import Separator from '@tod-workspace/ui/components/Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  render: args => (
    <div className='w-64'>
      <Separator {...args} />
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => (
    <div className='flex h-10'>
      <Separator {...args} />
    </div>
  ),
};
