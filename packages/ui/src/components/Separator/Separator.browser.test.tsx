import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Separator from '@tod-workspace/ui/components/Separator';

describe('Separator', () => {
  it('stretches down the full height when vertical, even in a centered row', () => {
    const { container } = render(
      <div className='flex h-10 items-center'>
        <Separator orientation='vertical' />
      </div>
    );

    const box = container
      .querySelector<HTMLElement>('[data-slot="separator"]')!
      .getBoundingClientRect();

    expect(box.height).toBe(40);
    expect(box.width).toBeGreaterThan(0);
  });
});
