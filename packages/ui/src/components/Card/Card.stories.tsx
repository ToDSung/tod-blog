import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '@tod-workspace/ui/components/Button';
import Card, {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@tod-workspace/ui/components/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  render: args => (
    <Card {...args} className='w-80'>
      <CardHeader>
        <CardTitle>Building a component library</CardTitle>
        <CardDescription>Notes from moving the blog to shadcn.</CardDescription>
        <CardAction>
          <Button size='sm' variant='ghost'>
            Save
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        Every component gets a folder, a test file and a story before it lands.
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Read more</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
