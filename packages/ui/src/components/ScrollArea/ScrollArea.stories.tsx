import type { Meta, StoryObj } from '@storybook/react-vite';

import ScrollArea, { ScrollBar } from '@tod-workspace/ui/components/ScrollArea';

const tags = Array.from({ length: 30 }, (_, index) => `tag-${index + 1}`);

const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  render: args => (
    <ScrollArea {...args} className='h-60 w-48 rounded-md border'>
      <div className='p-4'>
        {tags.map(tag => (
          <div key={tag} className='py-1 text-sm'>
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Horizontal: Story = {
  render: args => (
    <ScrollArea {...args} className='w-72 rounded-md border whitespace-nowrap'>
      <div className='flex w-max gap-4 p-4'>
        {tags.map(tag => (
          <div key={tag} className='text-sm'>
            {tag}
          </div>
        ))}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  ),
};
