import type { Meta, StoryObj } from '@storybook/react-vite';

import Textarea from '@tod-workspace/ui/components/Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Type your message here.',
  },
} satisfies Meta<typeof Textarea>;

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

export const Rows: Story = {
  args: { rows: 8 },
};
