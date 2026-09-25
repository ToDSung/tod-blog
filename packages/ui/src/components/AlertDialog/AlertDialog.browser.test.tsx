import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';

import type { AlertDialogContentProps } from '@tod-workspace/ui/components/AlertDialog';

import AlertDialog, {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@tod-workspace/ui/components/AlertDialog';

const openAlertDialog = async (contentProps: AlertDialogContentProps = {}) => {
  render(
    <AlertDialog defaultOpen>
      <AlertDialogContent {...contentProps}>
        <AlertDialogTitle>Title</AlertDialogTitle>
        <AlertDialogDescription>Description</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const alertDialog = await screen.findByRole('alertdialog');
  await Promise.all(
    document.getAnimations().map(animation => animation.finished)
  );
  return alertDialog;
};

const slot = (name: string) =>
  document.querySelector<HTMLElement>(`[data-slot="alert-dialog-${name}"]`)!;

describe('AlertDialog', () => {
  it('centers the content in the viewport', async () => {
    const rect = (await openAlertDialog()).getBoundingClientRect();

    expect(rect.left + rect.width / 2).toBeCloseTo(innerWidth / 2, 0);
    expect(rect.top + rect.height / 2).toBeCloseTo(innerHeight / 2, 0);
  });

  describe('on a desktop-width viewport', () => {
    beforeAll(() => page.viewport(1280, 800));
    afterAll(() => page.viewport(414, 896));

    it.each([
      ['md', 384],
      ['sm', 320],
    ] as const)('caps the %s content at %ipx wide', async (size, width) => {
      const alertDialog = await openAlertDialog({ size });

      expect(alertDialog.getBoundingClientRect().width).toBe(width);
    });
  });

  it.each(['md', 'sm'] as const)(
    'caps the %s content at 320px wide on a phone-width viewport',
    async size => {
      const alertDialog = await openAlertDialog({ size });

      expect(alertDialog.getBoundingClientRect().width).toBe(320);
    }
  );

  it('puts the sm footer buttons side by side in equal columns on a phone-width viewport', async () => {
    await openAlertDialog({ size: 'sm' });

    const cancel = screen
      .getByRole('button', { name: 'Cancel' })
      .getBoundingClientRect();
    const ok = screen
      .getByRole('button', { name: 'OK' })
      .getBoundingClientRect();

    expect(ok.top).toBe(cancel.top);
    expect(ok.width).toBe(cancel.width);
  });

  it('keeps the footer on the same background as the content', async () => {
    await openAlertDialog();

    expect(getComputedStyle(slot('footer')).backgroundColor).toBe(
      'rgba(0, 0, 0, 0)'
    );
  });
});
