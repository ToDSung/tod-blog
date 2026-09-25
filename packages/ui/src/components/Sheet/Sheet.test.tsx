import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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
  props: SheetProps = {},
  contentProps: SheetContentProps = {}
) =>
  render(
    <>
      <main>Page content</main>
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Edit profile</Button>
        </SheetTrigger>
        <SheetContent {...contentProps}>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>Change your display name.</SheetDescription>
          </SheetHeader>
          <input aria-label='Name' />
          <SheetFooter>
            <SheetClose asChild>
              <Button>Save</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );

const trigger = () => screen.getByRole('button', { name: 'Edit profile' });

const openSheet = async () => {
  await userEvent.click(trigger());
  return screen.findByRole('dialog');
};

const expectSheetClosed = async () => {
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
};

describe('Sheet', () => {
  it('stays closed until the trigger is clicked', () => {
    renderSheet();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on trigger click, named by its title and described by its description', async () => {
    renderSheet();
    const button = trigger();

    const sheet = await openSheet();

    expect(sheet).toBeVisible();
    expect(sheet).toHaveAccessibleName('Edit profile');
    expect(sheet).toHaveAccessibleDescription('Change your display name.');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders into a portal on document.body', async () => {
    const { container } = renderSheet();

    const sheet = await openSheet();

    expect(container).not.toContainElement(sheet);
    expect(document.body).toContainElement(sheet);
  });

  it('hides the rest of the page from assistive technology while open', async () => {
    renderSheet();

    await openSheet();

    expect(
      screen.getByText('Page content').closest('[aria-hidden]')
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('moves focus into the sheet and keeps Tab inside it', async () => {
    renderSheet();

    const sheet = await openSheet();

    await waitFor(() =>
      expect(sheet).toContainElement(document.activeElement as HTMLElement)
    );
    for (let step = 0; step < 4; step++) {
      await userEvent.tab();
      expect(sheet).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('closes from the top-right close button and returns focus to the trigger', async () => {
    renderSheet();

    await openSheet();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await expectSheetClosed();
    expect(trigger()).toHaveFocus();
  });

  it('closes on Escape', async () => {
    renderSheet();

    await openSheet();
    await userEvent.keyboard('{Escape}');

    await expectSheetClosed();
    expect(trigger()).toHaveFocus();
  });

  it('closes when the overlay is clicked', async () => {
    renderSheet();

    await openSheet();
    await userEvent.click(
      document.querySelector<HTMLElement>('[data-slot="sheet-overlay"]')!
    );

    await expectSheetClosed();
  });

  it('closes from a SheetClose placed inside the content', async () => {
    renderSheet();

    await openSheet();
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await expectSheetClosed();
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderSheet({}, { showCloseButton: false });

    await openSheet();

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  it('renders the close button as a small ghost IconButton', async () => {
    renderSheet();

    await openSheet();
    const close = screen.getByRole('button', { name: 'Close' });

    expect(close).toHaveAttribute('data-slot', 'sheet-close');
    expect(close).toHaveAttribute('data-variant', 'ghost');
    expect(close).toHaveClass('size-7');
  });

  it('slides in from the right by default', async () => {
    renderSheet();

    expect(await openSheet()).toHaveAttribute('data-side', 'right');
  });

  it.each(['top', 'bottom', 'left'] as const)(
    'marks the side it slides in from when side is %s',
    async side => {
      renderSheet({}, { side });

      expect(await openSheet()).toHaveAttribute('data-side', side);
    }
  );

  it('reports open changes through onOpenChange', async () => {
    const onOpenChange = vi.fn();
    renderSheet({ onOpenChange });

    await openSheet();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('stays open while the caller controls open', async () => {
    renderSheet({ open: true });

    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('forwards a caller-supplied className alongside the base classes', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent className='content-class'>
          <SheetHeader className='header-class'>
            <SheetTitle className='title-class'>Title</SheetTitle>
            <SheetDescription className='description-class'>
              Description
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className='footer-class' />
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'content-class',
      'bg-popover'
    );
    expect(document.querySelector('[data-slot="sheet-header"]')).toHaveClass(
      'header-class',
      'flex-col'
    );
    expect(screen.getByText('Title')).toHaveClass('title-class', 'font-medium');
    expect(screen.getByText('Description')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(document.querySelector('[data-slot="sheet-footer"]')).toHaveClass(
      'footer-class',
      'border-t'
    );
  });
});
