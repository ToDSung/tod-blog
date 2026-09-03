import { render, screen } from '@testing-library/react';
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

const renderOpenMenu = async () => {
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

  await userEvent.click(screen.getByRole('button', { name: 'Open menu' }));

  return { menu: await screen.findByRole('menu'), onSelect };
};

describe('DropdownMenu', () => {
  it('opens on trigger click and shows every item', async () => {
    const { menu } = await renderOpenMenu();

    expect(menu).toBeVisible();
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });

  it('aligns the panel to the trigger start inside a 1px ring', async () => {
    const { menu } = await renderOpenMenu();

    expect(menu).toHaveAttribute('data-align', 'start');
    expect(menu).toHaveClass('min-w-36', 'ring-1', 'ring-foreground/10');
  });

  it('rounds items and marks the destructive variant', async () => {
    await renderOpenMenu();

    const remove = screen.getByRole('menuitem', { name: 'Delete' });
    expect(remove).toHaveClass('rounded-md');
    expect(remove).toHaveAttribute('data-variant', 'destructive');
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveAttribute(
      'data-variant',
      'default'
    );
  });

  it('fires onSelect when an item is chosen', async () => {
    const { onSelect } = await renderOpenMenu();

    await userEvent.click(screen.getByRole('menuitem', { name: 'Profile' }));

    expect(onSelect).toHaveBeenCalledOnce();
  });
});
