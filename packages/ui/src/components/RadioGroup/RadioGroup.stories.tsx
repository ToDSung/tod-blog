import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioGroup, {
  RadioGroupItem,
} from '@tod-workspace/ui/components/RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  args: {
    defaultValue: 'comfortable',
  },
  render: args => (
    <RadioGroup {...args}>
      <RadioGroupItem aria-label='Default' value='default' />
      <RadioGroupItem aria-label='Comfortable' value='comfortable' />
      <RadioGroupItem aria-label='Compact' value='compact' />
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unselected: Story = {
  args: { defaultValue: undefined },
};

export const Horizontal: Story = {
  args: { className: 'flex gap-4', orientation: 'horizontal' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: args => (
    <RadioGroup {...args} className='flex gap-4'>
      <RadioGroupItem aria-label='Small' size='sm' value='default' />
      <RadioGroupItem aria-label='Medium' size='md' value='comfortable' />
      <RadioGroupItem aria-label='Large' size='lg' value='compact' />
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: args => (
    <RadioGroup {...args}>
      <RadioGroupItem aria-invalid aria-label='Default' value='default' />
      <RadioGroupItem
        aria-invalid
        aria-label='Comfortable'
        value='comfortable'
      />
    </RadioGroup>
  ),
};
