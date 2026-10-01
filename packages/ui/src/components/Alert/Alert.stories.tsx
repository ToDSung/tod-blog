import { CircleAlertIcon, InfoIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import Alert, {
  AlertDescription,
  AlertTitle,
} from '@tod-workspace/ui/components/Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  render: args => (
    <Alert {...args} className='w-96'>
      <InfoIcon />
      <AlertTitle>New posts are drafts by default</AlertTitle>
      <AlertDescription>
        Publish a post from its settings page when it is ready.
      </AlertDescription>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: { variant: 'destructive' },
  render: args => (
    <Alert {...args} className='w-96'>
      <CircleAlertIcon />
      <AlertTitle>The post could not be saved</AlertTitle>
      <AlertDescription>Check your connection and try again.</AlertDescription>
    </Alert>
  ),
};
