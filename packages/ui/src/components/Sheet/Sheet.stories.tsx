import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  SheetContentProps,
  SheetProps,
} from '@tod-workspace/ui/components/Sheet';

import Button from '@tod-workspace/ui/components/Button';
import Sheet, {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@tod-workspace/ui/components/Sheet';

const renderSheet = (
  args: SheetProps,
  contentProps: SheetContentProps = {}
) => (
  <Sheet {...args}>
    <SheetTrigger asChild>
      <Button variant='outline'>Open sheet</Button>
    </SheetTrigger>
    <SheetContent {...contentProps}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Change your display name. Click save when you are done.
        </SheetDescription>
      </SheetHeader>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant='outline'>Cancel</Button>
        </SheetClose>
        <SheetClose asChild>
          <Button>Save</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  render: args => renderSheet(args),
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const Top: Story = {
  args: { defaultOpen: true },
  render: args => renderSheet(args, { side: 'top' }),
};

export const Bottom: Story = {
  args: { defaultOpen: true },
  render: args => renderSheet(args, { side: 'bottom' }),
};

export const Left: Story = {
  args: { defaultOpen: true },
  render: args => renderSheet(args, { side: 'left' }),
};

export const WithoutCloseButton: Story = {
  args: { defaultOpen: true },
  render: args => renderSheet(args, { showCloseButton: false }),
};
