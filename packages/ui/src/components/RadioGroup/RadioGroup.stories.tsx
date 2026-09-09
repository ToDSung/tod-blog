import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  RadioGroupItemProps,
  RadioGroupProps,
} from '@tod-workspace/ui/components/RadioGroup';

import RadioGroup, {
  RadioGroupItem,
} from '@tod-workspace/ui/components/RadioGroup';

interface RadioGroupStoryArgs
  extends RadioGroupProps, Pick<RadioGroupItemProps, 'size'> {}

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    defaultValue: 'comfortable',
    size: 'md',
  },
  render: ({ size, ...args }) => (
    <RadioGroup {...args}>
      <RadioGroupItem aria-label='Default' size={size} value='default' />
      <RadioGroupItem
        aria-label='Comfortable'
        size={size}
        value='comfortable'
      />
      <RadioGroupItem aria-label='Compact' size={size} value='compact' />
    </RadioGroup>
  ),
} satisfies Meta<RadioGroupStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  render: ({ size, ...args }) => (
    <RadioGroup {...args}>
      <RadioGroupItem
        aria-invalid
        aria-label='Default'
        size={size}
        value='default'
      />
      <RadioGroupItem
        aria-invalid
        aria-label='Comfortable'
        size={size}
        value='comfortable'
      />
    </RadioGroup>
  ),
};
