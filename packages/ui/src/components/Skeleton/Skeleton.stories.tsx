import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from '@tod-workspace/ui/components/Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  args: {
    className: 'h-4 w-48',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
