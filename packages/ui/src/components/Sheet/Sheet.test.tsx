import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { SheetContentProps } from '@tod-workspace/ui/components/Sheet';

import Button from '@tod-workspace/ui/components/Button';
import Sheet, {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@tod-workspace/ui/components/Sheet';

const renderSheet = (contentProps: SheetContentProps = {}) =>
  render(
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit profile</Button>
      </SheetTrigger>
      <SheetContent {...contentProps}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Change your display name.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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

const slot = (name: string) =>
  document.querySelector(`[data-slot="sheet-${name}"]`);

describe('Sheet', () => {
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

  it('closes from the top-right close button', async () => {
    renderSheet();

    await openSheet();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await expectSheetClosed();
  });

  it('closes from a SheetClose placed inside the content', async () => {
    renderSheet();

    await openSheet();
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await expectSheetClosed();
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderSheet({ showCloseButton: false });

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
    expect(close).toHaveAttribute('data-size', 'sm');
  });

  it('slides in from the right by default', async () => {
    renderSheet();

    expect(await openSheet()).toHaveAttribute('data-side', 'right');
  });

  it('uses the overlay and shadow shared with Dialog and AlertDialog', async () => {
    renderSheet();

    expect(await openSheet()).toHaveClass('shadow-lg');
    expect(slot('overlay')).toHaveClass('bg-black/50');
    expect(slot('overlay')?.className).not.toContain('backdrop-blur');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
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
    expect(slot('header')).toHaveClass('header-class', 'gap-1');
    expect(screen.getByRole('heading', { name: 'Title' })).toHaveClass(
      'title-class',
      'font-medium'
    );
    expect(screen.getByText('Description')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(slot('footer')).toHaveClass('footer-class', 'border-t');
  });

  it('forwards a caller-supplied className on a standalone overlay', () => {
    render(
      <Sheet defaultOpen>
        <SheetPortal>
          <SheetOverlay className='overlay-class' />
        </SheetPortal>
      </Sheet>
    );

    expect(slot('overlay')).toHaveClass('overlay-class', 'inset-0');
  });
});
