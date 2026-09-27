import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Progress from '@tod-workspace/ui/components/Progress';

const indicator = () =>
  document.querySelector<HTMLElement>('[data-slot="progress-indicator"]');

describe('Progress', () => {
  it('reports its value to assistive technology', () => {
    render(<Progress aria-label='Upload' value={40} />);

    expect(screen.getByRole('progressbar', { name: 'Upload' })).toHaveAttribute(
      'aria-valuenow',
      '40'
    );
  });

  it('slides the indicator in to cover the given share of the track', () => {
    render(<Progress aria-label='Upload' value={40} />);

    expect(indicator()).toHaveStyle({ transform: 'translateX(-60%)' });
  });

  it('keeps the indicator out of view when there is no value', () => {
    render(<Progress aria-label='Upload' />);

    expect(indicator()).toHaveStyle({ transform: 'translateX(-100%)' });
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Progress aria-label='Upload' className='progress-class' />);

    expect(screen.getByRole('progressbar')).toHaveClass(
      'progress-class',
      'overflow-hidden'
    );
  });
});
