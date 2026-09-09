import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from '@tod-workspace/ui/components/Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Email',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: 'Read-only value' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
};

export const Email: Story = {
  args: { type: 'email', placeholder: 'you@example.com' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Password' },
};

export const File: Story = {
  args: { type: 'file', placeholder: undefined },
};

export const Sizes: Story = {
  render: () => (
    <div className='flex w-64 flex-col gap-2'>
      <Input placeholder='sm' size='sm' />
      <Input placeholder='md' size='md' />
      <Input placeholder='lg' size='lg' />
    </div>
  ),
};
