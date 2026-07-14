import { expect, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@tod-workspace/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tod-workspace/ui/components/dropdown-menu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensOnClick: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));

    const body = within(document.body);
    // The content animates in from opacity 0, so retry until it settles.
    await waitFor(() => expect(body.getByRole('menu')).toBeVisible());
    await waitFor(() =>
      expect(body.getByRole('menuitem', { name: 'Profile' })).toBeVisible()
    );

    // Close again so the a11y pass runs against a settled page: the menu
    // must be gone and radix must have lifted aria-hidden from the rest of
    // the page, or axe reports aria-hidden-focus.
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(body.queryByRole('menu')).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(document.querySelector('[data-aria-hidden]')).toBeNull()
    );
  },
};
