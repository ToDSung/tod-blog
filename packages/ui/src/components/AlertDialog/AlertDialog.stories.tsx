import type { Meta, StoryObj } from '@storybook/react-vite';
import type {
  AlertDialogContentProps,
  AlertDialogProps,
} from '@tod-workspace/ui/components/AlertDialog';

import AlertDialog, {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@tod-workspace/ui/components/AlertDialog';
import Button from '@tod-workspace/ui/components/Button';

interface AlertDialogStoryArgs
  extends AlertDialogProps, Pick<AlertDialogContentProps, 'size'> {}

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    size: 'md',
  },
  render: ({ size, ...args }) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>Delete post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            The post and its comments will be removed. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive'>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<AlertDialogStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Open: Story = {
  args: { defaultOpen: true },
};
