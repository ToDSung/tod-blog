import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type {
  DialogContentProps,
  DialogProps,
} from '@tod-workspace/ui/components/Dialog';

import Button from '@tod-workspace/ui/components/Button';
import Dialog, {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@tod-workspace/ui/components/Dialog';

const renderDialog = (
  props: DialogProps = {},
  contentProps: DialogContentProps = {}
) =>
  render(
    <>
      <main>Page content</main>
      <Dialog {...props}>
        <DialogTrigger asChild>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogContent {...contentProps}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Change your display name.</DialogDescription>
          </DialogHeader>
          <input aria-label='Name' />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

const trigger = () => screen.getByRole('button', { name: 'Edit profile' });

const openDialog = async () => {
  await userEvent.click(trigger());
  return screen.findByRole('dialog');
};

const expectDialogClosed = async () => {
  await waitFor(() =>
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  );
};

describe('Dialog', () => {
  it('stays closed until the trigger is clicked', () => {
    renderDialog();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger()).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens on trigger click, named by its title and described by its description', async () => {
    renderDialog();
    const button = trigger();

    const dialog = await openDialog();

    expect(dialog).toBeVisible();
    expect(dialog).toHaveAccessibleName('Edit profile');
    expect(dialog).toHaveAccessibleDescription('Change your display name.');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders into a portal on document.body', async () => {
    const { container } = renderDialog();

    const dialog = await openDialog();

    expect(container).not.toContainElement(dialog);
    expect(document.body).toContainElement(dialog);
  });

  it('hides the rest of the page from assistive technology while open', async () => {
    renderDialog();

    await openDialog();

    expect(
      screen.getByText('Page content').closest('[aria-hidden]')
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('moves focus into the dialog and keeps Tab inside it', async () => {
    renderDialog();

    const dialog = await openDialog();

    await waitFor(() =>
      expect(dialog).toContainElement(document.activeElement as HTMLElement)
    );
    for (let step = 0; step < 4; step++) {
      await userEvent.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it('closes from the top-right close button and returns focus to the trigger', async () => {
    renderDialog();

    await openDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await expectDialogClosed();
    expect(trigger()).toHaveFocus();
  });

  it('closes on Escape', async () => {
    renderDialog();

    await openDialog();
    await userEvent.keyboard('{Escape}');

    await expectDialogClosed();
    expect(trigger()).toHaveFocus();
  });

  it('closes when the overlay is clicked', async () => {
    renderDialog();

    await openDialog();
    await userEvent.click(
      document.querySelector<HTMLElement>('[data-slot="dialog-overlay"]')!
    );

    await expectDialogClosed();
  });

  it('closes from a DialogClose placed inside the content', async () => {
    renderDialog();

    await openDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));

    await expectDialogClosed();
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderDialog({}, { showCloseButton: false });

    await openDialog();

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument();
  });

  it('renders the close button as a small ghost IconButton', async () => {
    renderDialog();

    await openDialog();
    const close = screen.getByRole('button', { name: 'Close' });

    expect(close).toHaveAttribute('data-slot', 'dialog-close');
    expect(close).toHaveAttribute('data-variant', 'ghost');
    expect(close).toHaveClass('size-7');
  });

  it('adds a footer close button when DialogFooter showCloseButton is set', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>Read and dismiss.</DialogDescription>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await expectDialogClosed();
  });

  it('reports open changes through onOpenChange', async () => {
    const onOpenChange = vi.fn();
    renderDialog({ onOpenChange });

    await openDialog();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('stays open while the caller controls open', async () => {
    renderDialog({ open: true });

    await userEvent.keyboard('{Escape}');

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('forwards a caller-supplied className alongside the base classes', async () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className='content-class'>
          <DialogHeader className='header-class'>
            <DialogTitle className='title-class'>Title</DialogTitle>
            <DialogDescription className='description-class'>
              Description
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='footer-class' />
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toHaveClass(
      'content-class',
      'bg-popover'
    );
    expect(document.querySelector('[data-slot="dialog-header"]')).toHaveClass(
      'header-class',
      'flex-col'
    );
    expect(screen.getByText('Title')).toHaveClass('title-class', 'font-medium');
    expect(screen.getByText('Description')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(document.querySelector('[data-slot="dialog-footer"]')).toHaveClass(
      'footer-class',
      'border-t'
    );
  });
});
