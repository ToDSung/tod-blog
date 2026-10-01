import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@tod-workspace/ui/components/Dialog';

const openDialog = async () => {
  render(
    <Dialog defaultOpen>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );

  const dialog = await screen.findByRole('dialog');
  await Promise.all(
    document.getAnimations().map(animation => animation.finished)
  );
  return dialog;
};

describe('Dialog', () => {
  it('centers the content in the viewport', async () => {
    const rect = (await openDialog()).getBoundingClientRect();

    expect(rect.left + rect.width / 2).toBeCloseTo(innerWidth / 2, 0);
    expect(rect.top + rect.height / 2).toBeCloseTo(innerHeight / 2, 0);
  });

  it('keeps the footer on the same background as the content', async () => {
    await openDialog();
    const footer = document.querySelector<HTMLElement>(
      '[data-slot="dialog-footer"]'
    )!;

    expect(getComputedStyle(footer).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });
});
