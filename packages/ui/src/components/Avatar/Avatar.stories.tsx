import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar, {
  AvatarFallback,
  AvatarImage,
} from '@tod-workspace/ui/components/Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
  render: args => (
    <Avatar {...args}>
      <AvatarImage
        alt='ToD'
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop stop-color='%236366f1'/%3E%3Cstop offset='1' stop-color='%2314b8a6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1' height='1' fill='url(%23g)'/%3E%3C/svg%3E"
      />
      <AvatarFallback>TD</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fallback: Story = {
  render: args => (
    <Avatar {...args}>
      <AvatarFallback>TD</AvatarFallback>
    </Avatar>
  ),
};
