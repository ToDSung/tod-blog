import type { Meta, StoryObj } from '@storybook/react-vite';

import Progress from '@tod-workspace/ui/components/Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    'aria-label': 'Reading progress',
    value: 40,
  },
  render: args => (
    <div className='w-64'>
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
