import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

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
        <SheetFooter>
          <button type='button'>Cancel</button>
          <button type='button'>Save changes</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  const sheet = await screen.findByRole('dialog');
  await Promise.all(
    document.getAnimations().map(animation => animation.finished)
  );
  return sheet;
};

const borderWidths = (element: HTMLElement) => {
  const style = getComputedStyle(element);

  return {
    top: style.borderTopWidth,
    right: style.borderRightWidth,
    bottom: style.borderBottomWidth,
    left: style.borderLeftWidth,
  };
};

const NO_BORDER = { top: '0px', right: '0px', bottom: '0px', left: '0px' };

describe('Sheet', () => {
  // An unpinned fixed box sits at its static position; the padding moves that away from the viewport edge.
  beforeEach(() => {
    document.body.style.padding = '24px';
  });

  afterEach(() => {
    document.body.style.padding = '';
  });

  it('pins the right sheet to the right edge at full viewport height', async () => {
    const sheet = await openSheet('right');
    const rect = sheet.getBoundingClientRect();

    expect(rect.right).toBeCloseTo(innerWidth, 0);
    expect(rect.top).toBeCloseTo(0, 0);
    expect(rect.height).toBeCloseTo(innerHeight, 0);
    expect(rect.width).toBeLessThan(innerWidth);
    expect(borderWidths(sheet)).toEqual({ ...NO_BORDER, left: '1px' });
  });

  it('pins the left sheet to the left edge at full viewport height', async () => {
    const sheet = await openSheet('left');
    const rect = sheet.getBoundingClientRect();

    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.top).toBeCloseTo(0, 0);
    expect(rect.height).toBeCloseTo(innerHeight, 0);
    expect(rect.width).toBeLessThan(innerWidth);
    expect(borderWidths(sheet)).toEqual({ ...NO_BORDER, right: '1px' });
  });

  it('pins the top sheet to the top edge at full viewport width', async () => {
    const sheet = await openSheet('top');
    const rect = sheet.getBoundingClientRect();

    expect(rect.top).toBeCloseTo(0, 0);
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(innerWidth, 0);
    expect(rect.height).toBeLessThan(innerHeight);
    expect(borderWidths(sheet)).toEqual({ ...NO_BORDER, bottom: '1px' });
  });

  it('pins the bottom sheet to the bottom edge at full viewport width', async () => {
    const sheet = await openSheet('bottom');
    const rect = sheet.getBoundingClientRect();

    expect(rect.bottom).toBeCloseTo(innerHeight, 0);
    expect(rect.left).toBeCloseTo(0, 0);
    expect(rect.width).toBeCloseTo(innerWidth, 0);
    expect(rect.height).toBeLessThan(innerHeight);
    expect(borderWidths(sheet)).toEqual({ ...NO_BORDER, top: '1px' });
  });

  it('keeps the footer at the bottom of a sheet taller than its content', async () => {
    const sheet = await openSheet('right');
    const footer = document.querySelector<HTMLElement>(
      '[data-slot="sheet-footer"]'
    )!;

    expect(footer.getBoundingClientRect().bottom).toBeCloseTo(
      sheet.getBoundingClientRect().bottom,
      0
    );
  });

  it('lays the footer buttons out in one row at equal widths', async () => {
    await openSheet();
    const cancel = screen
      .getByRole('button', { name: 'Cancel' })
      .getBoundingClientRect();
    const save = screen
      .getByRole('button', { name: 'Save changes' })
      .getBoundingClientRect();

    expect(save.top).toBeCloseTo(cancel.top, 0);
    expect(save.left).toBeGreaterThan(cancel.right);
    expect(save.width).toBeCloseTo(cancel.width, 0);
  });
});
