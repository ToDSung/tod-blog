import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@tod-workspace/ui/components/Button';
import Toaster, { toast } from '@tod-workspace/ui/components/Toaster';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  render: args => (
    <div className='flex flex-wrap gap-2'>
      <Toaster {...args} />
      <Button
        variant='outline'
        onClick={() =>
          toast('Link copied', { description: 'Paste it anywhere to share.' })
        }
      >
        Default
      </Button>
      <Button variant='outline' onClick={() => toast.success('Post published')}>
        Success
      </Button>
      <Button variant='outline' onClick={() => toast.info('Draft autosaved')}>
        Info
      </Button>
      <Button
        variant='outline'
        onClick={() => toast.warning('Unsaved changes')}
      >
        Warning
      </Button>
      <Button variant='outline' onClick={() => toast.error('Upload failed')}>
        Error
      </Button>
      <Button variant='outline' onClick={() => toast.loading('Uploading…')}>
        Loading
      </Button>
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
