import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@tod-workspace/ui/components/Button';
import Popover, {
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@tod-workspace/ui/components/Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  render: args => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Reading time</PopoverTitle>
          <PopoverDescription>
            Estimated from the word count at 300 characters per minute.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};
