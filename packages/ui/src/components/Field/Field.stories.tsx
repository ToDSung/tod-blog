import type { Meta, StoryObj } from '@storybook/react-vite';

import Checkbox from '@tod-workspace/ui/components/Checkbox';
import Field, {
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@tod-workspace/ui/components/Field';
import Input from '@tod-workspace/ui/components/Input';

const meta = {
  title: 'Components/Field',
  component: Field,
  render: args => (
    <div className='w-80'>
      <Field {...args}>
        <FieldLabel htmlFor='story-email'>Email</FieldLabel>
        <Input id='story-email' placeholder='you@example.com' />
        <FieldDescription>We never share your email.</FieldDescription>
      </Field>
    </div>
  ),
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: args => (
    <div className='w-80'>
      <Field {...args}>
        <Checkbox id='story-terms' />
        <FieldLabel htmlFor='story-terms'>Accept terms</FieldLabel>
      </Field>
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <div className='w-80'>
      <Field {...args} data-invalid>
        <FieldLabel htmlFor='story-password'>Password</FieldLabel>
        <Input aria-invalid id='story-password' type='password' />
        <FieldError>Use at least 8 characters.</FieldError>
      </Field>
    </div>
  ),
};

export const Disabled: Story = {
  render: args => (
    <div className='w-80'>
      <Field {...args} data-disabled>
        <FieldLabel htmlFor='story-disabled'>Email</FieldLabel>
        <Input disabled id='story-disabled' />
        <FieldDescription>Managed by your organization.</FieldDescription>
      </Field>
    </div>
  ),
};
