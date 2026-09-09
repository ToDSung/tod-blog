import type { Meta, StoryObj } from '@storybook/react-vite';

import Slider from '@tod-workspace/ui/components/Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    'aria-label': 'Volume',
    defaultValue: [50],
  },
  render: args => (
    <div className='w-64'>
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: { defaultValue: [25, 75] },
};

export const Stepped: Story = {
  args: { defaultValue: [40], step: 20 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: args => (
    <div className='h-48'>
      <Slider {...args} />
    </div>
  ),
};
