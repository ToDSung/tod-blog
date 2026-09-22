import type { Meta, StoryObj } from '@storybook/react-vite';

import Select, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@tod-workspace/ui/components/Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-label='Fruit'>
        <SelectValue placeholder='Pick a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Apple</SelectItem>
        <SelectItem value='banana'>Banana</SelectItem>
        <SelectItem value='cherry'>Cherry</SelectItem>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { defaultValue: 'banana' },
};

export const Disabled: Story = {
  args: { defaultValue: 'banana', disabled: true },
};

export const Sizes: Story = {
  render: args => (
    <div className='flex items-center gap-2'>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Select key={size} {...args}>
          <SelectTrigger aria-label={size} size={size}>
            <SelectValue placeholder={size} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-invalid aria-label='Fruit'>
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
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-label='Food'>
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
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-label='Fruit'>
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

export const Scrollable: Story = {
  render: args => (
    <Select {...args}>
      <SelectTrigger aria-label='Timezone'>
        <SelectValue placeholder='Pick a timezone' />
      </SelectTrigger>
      <SelectContent className='max-h-60'>
        {Array.from({ length: 25 }, (_, index) => {
          const offset = index - 12;
          const label = `UTC${offset >= 0 ? '+' : ''}${offset}`;
          return (
            <SelectItem key={label} value={label}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  ),
};
