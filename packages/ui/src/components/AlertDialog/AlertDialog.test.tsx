import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type {
  AlertDialogContentProps,
  AlertDialogProps,
} from '@tod-workspace/ui/components/AlertDialog';

import AlertDialog, {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@tod-workspace/ui/components/AlertDialog';
import Button from '@tod-workspace/ui/components/Button';

interface RenderOptions extends AlertDialogProps {
  size?: AlertDialogContentProps['size'];
  onAction?: () => void;
  onCancel?: () => void;
}

const renderAlertDialog = ({
  size,
  onAction,
  onCancel,
  ...props
}: RenderOptions = {}) =>
  render(
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>
        <Button>Delete post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={onAction}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

const trigger = () => screen.getByRole('button', { name: 'Delete post' });

const openAlertDialog = async () => {
  await userEvent.click(trigger());
  return screen.findByRole('alertdialog');
};

const expectAlertDialogClosed = async () => {
  await waitFor(() =>
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  );
};

describe('AlertDialog', () => {
  it('opens as an alertdialog named by its title and described by its description', async () => {
    renderAlertDialog();

    const alertDialog = await openAlertDialog();

    expect(alertDialog).toBeVisible();
    expect(alertDialog).toHaveAccessibleName('Delete this post?');
    expect(alertDialog).toHaveAccessibleDescription('This cannot be undone.');
  });

  it('runs the caller onClick on Cancel and closes', async () => {
    const onCancel = vi.fn();
    renderAlertDialog({ onCancel });

    await openAlertDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    await expectAlertDialogClosed();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('runs the action and closes', async () => {
    const onAction = vi.fn();
    renderAlertDialog({ onAction });

    await openAlertDialog();
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await expectAlertDialogClosed();
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('reports open changes through onOpenChange', async () => {
    const onOpenChange = vi.fn();
    renderAlertDialog({ onOpenChange });

    await openAlertDialog();
    expect(onOpenChange).toHaveBeenLastCalledWith(true);

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('stays open while the caller controls open', async () => {
    renderAlertDialog({ open: true });

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('renders Action as a default button and Cancel as an outline button by default', () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    const action = screen.getByRole('button', { name: 'Continue' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });

    expect(action).toHaveAttribute('data-variant', 'default');
    expect(action).toHaveAttribute('data-size', 'md');
    expect(action).toHaveAttribute('data-slot', 'alert-dialog-action');
    expect(cancel).toHaveAttribute('data-variant', 'outline');
    expect(cancel).toHaveAttribute('data-size', 'md');
    expect(cancel).toHaveAttribute('data-slot', 'alert-dialog-cancel');
  });

  it('passes variant and size through to the buttons', () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogTitle>Title</AlertDialogTitle>
          <AlertDialogDescription>Description</AlertDialogDescription>
          <AlertDialogCancel size='sm' variant='ghost'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction size='lg' variant='destructive'>
            Delete
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    const action = screen.getByRole('button', { name: 'Delete' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });

    expect(action).toHaveAttribute('data-variant', 'destructive');
    expect(action).toHaveAttribute('data-size', 'lg');
    expect(cancel).toHaveAttribute('data-variant', 'ghost');
    expect(cancel).toHaveAttribute('data-size', 'sm');
  });

  it('renders the content at the md size by default', async () => {
    renderAlertDialog();

    expect(await openAlertDialog()).toHaveAttribute('data-size', 'md');
  });

  it('renders the sm content size', async () => {
    renderAlertDialog({ size: 'sm' });

    expect(await openAlertDialog()).toHaveAttribute('data-size', 'sm');
  });

  it('uses the overlay and shadow shared with Dialog and Sheet', async () => {
    renderAlertDialog();

    expect(await openAlertDialog()).toHaveClass(
      'shadow-lg',
      'ring-1',
      'ring-foreground/10'
    );
    expect(
      document.querySelector('[data-slot="alert-dialog-overlay"]')
    ).toHaveClass('bg-black/50');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent className='content-class'>
          <AlertDialogHeader className='header-class'>
            <AlertDialogTitle className='title-class'>Title</AlertDialogTitle>
            <AlertDialogDescription className='description-class'>
              Description
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='footer-class'>
            <AlertDialogCancel className='cancel-class'>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className='action-class'>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    const slot = (name: string) =>
      document.querySelector(`[data-slot="alert-dialog-${name}"]`);

    expect(screen.getByRole('alertdialog')).toHaveClass(
      'content-class',
      'bg-popover'
    );
    expect(slot('header')).toHaveClass('header-class', 'grid');
    expect(screen.getByText('Title')).toHaveClass('title-class', 'font-medium');
    expect(screen.getByText('Description')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(slot('footer')).toHaveClass('footer-class', 'border-t');
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveClass(
      'cancel-class',
      'rounded-lg'
    );
    expect(screen.getByRole('button', { name: 'OK' })).toHaveClass(
      'action-class',
      'rounded-lg'
    );
  });
});
