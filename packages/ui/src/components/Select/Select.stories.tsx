import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  SelectProps,
  SelectTriggerProps,
} from '@tod-workspace/ui/components/Select';

import Select, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@tod-workspace/ui/components/Select';

interface SelectStoryArgs
  extends SelectProps, Pick<SelectTriggerProps, 'size'> {}

const meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    size: 'md',
  },
  render: ({ size, ...args }) => (
    <Select {...args}>
      <SelectTrigger aria-label='Fruit' size={size}>
        <SelectValue placeholder='Pick a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='cherry'>Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<SelectStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { defaultValue: 'banana' },
};

export const Disabled: Story = {
  args: { defaultValue: 'banana', disabled: true },
};

export const Invalid: Story = {
  render: ({ size, ...args }) => (
    <Select {...args}>
      <SelectTrigger aria-invalid aria-label='Fruit' size={size}>
        <SelectValue placeholder='Pick a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Grouped: Story = {
  render: ({ size, ...args }) => (
    <Select {...args}>
      <SelectTrigger aria-label='Food' size={size}>
        <SelectValue placeholder='Pick a food' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value='carrot'>Carrot</SelectItem>
          <SelectItem disabled value='leek'>
            Leek
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const ItemAligned: Story = {
  render: ({ size, ...args }) => (
    <Select {...args}>
      <SelectTrigger aria-label='Fruit' size={size}>
        <SelectValue placeholder='Pick a fruit' />
      </SelectTrigger>
      <SelectContent position='item-aligned'>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='cherry'>Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
};
