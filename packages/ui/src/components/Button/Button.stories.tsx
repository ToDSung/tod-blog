import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@tod-workspace/ui/components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Button size='xs'>xs</Button>
      <Button size='sm'>sm</Button>
      <Button size='default'>default</Button>
      <Button size='lg'>lg</Button>
    </div>
  ),
};
