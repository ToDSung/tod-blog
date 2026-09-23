import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { DialogContentProps } from '@tod-workspace/ui/components/Dialog';

import Button from '@tod-workspace/ui/components/Button';
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@tod-workspace/ui/components/Dialog';

const renderDialog = (contentProps: DialogContentProps = {}) =>
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent {...contentProps}>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Change your display name.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

const trigger = () => screen.getByRole('button', { name: 'Edit profile' });

const openDialog = async () => {
  await userEvent.click(trigger());
  return screen.findByRole('dialog');
};

const slot = (name: string) =>
  document.querySelector(`[data-slot="dialog-${name}"]`);

describe('Dialog', () => {
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

  it('closes from the top-right close button', async () => {
    renderDialog();

    await openDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });

  it('omits the close button when showCloseButton is false', async () => {
    renderDialog({ showCloseButton: false });

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
    expect(close).toHaveAttribute('data-size', 'sm');
  });

  it('uses the overlay and shadow shared with AlertDialog and Sheet', async () => {
    renderDialog();

    expect(await openDialog()).toHaveClass(
      'shadow-lg',
      'ring-1',
      'ring-foreground/10'
    );
    expect(slot('overlay')).toHaveClass('bg-black/50');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
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
    expect(slot('header')).toHaveClass('header-class', 'flex-col');
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
      <Dialog defaultOpen>
        <DialogPortal>
          <DialogOverlay className='overlay-class' />
        </DialogPortal>
      </Dialog>
    );

    expect(slot('overlay')).toHaveClass('overlay-class', 'inset-0');
  });
});
