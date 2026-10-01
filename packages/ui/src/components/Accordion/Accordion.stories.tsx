import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tod-workspace/ui/components/Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    collapsible: true,
    type: 'single',
  },
  render: args => (
    <Accordion {...args} className='w-80'>
      <AccordionItem value='stack'>
        <AccordionTrigger>What is this blog built with?</AccordionTrigger>
        <AccordionContent>
          Next.js with a static export, styled by a shadcn component library.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='comments'>
        <AccordionTrigger>Can I leave a comment?</AccordionTrigger>
        <AccordionContent>
          Not yet. Reach out through the links in the footer instead.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='rss'>
        <AccordionTrigger>Is there an RSS feed?</AccordionTrigger>
        <AccordionContent>Yes, under /rss.xml.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { type: 'multiple' },
};
