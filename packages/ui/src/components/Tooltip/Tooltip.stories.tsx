import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@tod-workspace/ui/components/Button';
import Tooltip, {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tod-workspace/ui/components/Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  render: args => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant='outline'>Share</Button>
        </TooltipTrigger>
        <TooltipContent>Copy a link to this post</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};
