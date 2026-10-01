import type { Meta, StoryObj } from '@storybook/react-vite';
import type { TabsListProps } from '@tod-workspace/ui/components/Tabs';

import Tabs, {
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@tod-workspace/ui/components/Tabs';

const renderTabs = (variant: TabsListProps['variant']) => (
  <Tabs className='w-80' defaultValue='preview'>
    <TabsList variant={variant}>
      <TabsTrigger value='preview'>Preview</TabsTrigger>
      <TabsTrigger value='code'>Code</TabsTrigger>
    </TabsList>
    <TabsContent value='preview'>The rendered component.</TabsContent>
    <TabsContent value='code'>The source that renders it.</TabsContent>
  </Tabs>
);

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  render: () => renderTabs('default'),
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Line: Story = {
  render: () => renderTabs('line'),
};
