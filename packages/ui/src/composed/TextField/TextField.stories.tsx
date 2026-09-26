import type { Meta, StoryObj } from '@storybook/react-vite';

import TextField from '@tod-workspace/ui/composed/TextField';

const meta = {
  title: 'Composed/TextField',
  component: TextField,
  args: {
    className: 'w-80',
    label: 'Email',
    placeholder: 'you@example.com',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: 'We never share your email.' },
};

export const Invalid: Story = {
  args: {
    description: 'We never share your email.',
    error: 'Enter a valid email address.',
  },
};

export const Disabled: Story = {
  args: { description: 'Managed by your organization.', disabled: true },
};

export const Sizes: Story = {
  render: args => (
    <div className='flex flex-col gap-4'>
      <TextField {...args} label='Small' size='sm' />
      <TextField {...args} label='Medium' size='md' />
      <TextField {...args} label='Large' size='lg' />
    </div>
  ),
};
