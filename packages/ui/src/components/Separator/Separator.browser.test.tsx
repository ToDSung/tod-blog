import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Separator from '@tod-workspace/ui/components/Separator';

const boxOf = (container: HTMLElement) =>
  container
    .querySelector<HTMLElement>('[data-slot="separator"]')!
    .getBoundingClientRect();

describe('Separator', () => {
  it('draws a 1px line across the width when horizontal', () => {
    const { container } = render(
      <div className='w-40'>
        <Separator />
      </div>
    );

    const box = boxOf(container);

    expect(box.height).toBe(1);
    expect(box.width).toBe(160);
  });

  it('draws a 1px line down the height when vertical', () => {
    const { container } = render(
      <div className='flex h-10'>
        <Separator orientation='vertical' />
      </div>
    );

    const box = boxOf(container);

    expect(box.width).toBe(1);
    expect(box.height).toBe(40);
  });
});
