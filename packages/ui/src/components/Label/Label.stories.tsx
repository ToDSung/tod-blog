import type { Meta, StoryObj } from '@storybook/react-vite';

import Label from '@tod-workspace/ui/components/Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  args: {
    children: 'Email',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
