import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SheetContentProps } from '@tod-workspace/ui/components/Sheet';

import Sheet, {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '@tod-workspace/ui/components/Sheet';

const openSheet = async (side?: SheetContentProps['side']) => {
  render(
    <Sheet defaultOpen>
      <SheetContent side={side}>
        <SheetTitle>Title</SheetTitle>
        <SheetDescription>Description</SheetDescription>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );

  const sheet = await screen.findByRole('dialog');
  await Promise.all(
    document.getAnimations().map(animation => animation.finished)
  );
  return sheet;
};

describe('Sheet', () => {
  it('pins the right sheet to the right edge at full viewport height', async () => {
    const rect = (await openSheet('right')).getBoundingClientRect();

    expect(rect.right).toBeCloseTo(innerWidth, 0);
    expect(rect.top).toBeCloseTo(0, 0);
    expect(rect.height).toBeCloseTo(innerHeight, 0);
    expect(rect.width).toBeLessThan(innerWidth);
  });

  it('pins the left sheet to the left edge at full viewport height', async () => {
    const rect = (await openSheet('left')).getBoundingClientRect();

    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.height).toBeCloseTo(innerHeight, 0);
    expect(rect.width).toBeLessThan(innerWidth);
  });

  it('pins the top sheet to the top edge at full viewport width', async () => {
    const rect = (await openSheet('top')).getBoundingClientRect();

    expect(rect.top).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(innerWidth, 0);
    expect(rect.height).toBeLessThan(innerHeight);
  });

  it('pins the bottom sheet to the bottom edge at full viewport width', async () => {
    const rect = (await openSheet('bottom')).getBoundingClientRect();

    expect(rect.bottom).toBeCloseTo(innerHeight, 0);
    expect(rect.width).toBeCloseTo(innerWidth, 0);
    expect(rect.height).toBeLessThan(innerHeight);
  });

  it('dims the page behind a half-opaque black overlay without blur', async () => {
    await openSheet();
    const overlay = document.querySelector<HTMLElement>(
      '[data-slot="sheet-overlay"]'
    )!;
    const style = getComputedStyle(overlay);

    expect(style.backgroundColor).toBe('oklab(0 0 0 / 0.5)');
    expect(style.backdropFilter).toBe('none');
  });

  it('lifts the content off the page with a shadow', async () => {
    const sheet = await openSheet();

    expect(getComputedStyle(sheet).boxShadow).not.toBe('none');
  });

  it('lays the footer buttons out in one row at equal widths', async () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description</SheetDescription>
          <SheetFooter>
            <button type='button'>Cancel</button>
            <button type='button'>Save changes</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
    await screen.findByRole('dialog');
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const save = screen.getByRole('button', { name: 'Save changes' });
    const cancelRect = cancel.getBoundingClientRect();
    const saveRect = save.getBoundingClientRect();

    expect(saveRect.top).toBeCloseTo(cancelRect.top, 0);
    expect(saveRect.left).toBeGreaterThan(cancelRect.right);
    expect(saveRect.width).toBeCloseTo(cancelRect.width, 0);
  });

  it('keeps the footer on the same background as the content', async () => {
    await openSheet();
    const footer = document.querySelector<HTMLElement>(
      '[data-slot="sheet-footer"]'
    )!;

    expect(getComputedStyle(footer).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });
});
