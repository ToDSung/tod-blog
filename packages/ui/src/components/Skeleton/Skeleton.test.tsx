import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Skeleton from '@tod-workspace/ui/components/Skeleton';

describe('Skeleton', () => {
  it('forwards the remaining props onto the element', () => {
    const { container } = render(<Skeleton aria-hidden='true' />);

    expect(container.querySelector('[data-slot="skeleton"]')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    const { container } = render(<Skeleton className='h-4 w-48' />);

    expect(container.querySelector('[data-slot="skeleton"]')).toHaveClass(
      'h-4',
      'w-48',
      'animate-pulse',
      'rounded-md',
      'bg-muted'
    );
  });
});
