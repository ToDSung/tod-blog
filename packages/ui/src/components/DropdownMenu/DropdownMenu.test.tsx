import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '@tod-workspace/ui/components/Button';
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tod-workspace/ui/components/DropdownMenu';

const renderMenu = () => {
  const onSelect = vi.fn();

  render(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return {
    onSelect,
    trigger: screen.getByRole('button', { name: 'Open menu' }),
  };
};

const expectMenuClosed = async () => {
  await waitFor(() =>
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  );
};

describe('DropdownMenu', () => {
  it('keeps the menu closed until the trigger is clicked', () => {
    renderMenu();

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on trigger click and shows every item', async () => {
    const { trigger } = renderMenu();

    await userEvent.click(trigger);

    expect(await screen.findByRole('menu')).toBeVisible();
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('fires onSelect and closes when an item is chosen', async () => {
    const { onSelect, trigger } = renderMenu();

    await userEvent.click(trigger);
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Profile' })
    );

    expect(onSelect).toHaveBeenCalledOnce();
    await expectMenuClosed();
  });

  it('closes on Escape', async () => {
    const { trigger } = renderMenu();

    await userEvent.click(trigger);
    await screen.findByRole('menu');
    await userEvent.keyboard('{Escape}');

    await expectMenuClosed();
  });
});
