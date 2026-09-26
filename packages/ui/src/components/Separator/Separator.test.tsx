import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Separator from '@tod-workspace/ui/components/Separator';

describe('Separator', () => {
  it('stays out of the accessibility tree by default', () => {
    render(<Separator />);

    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
  });

  it('renders horizontally by default', () => {
    const { container } = render(<Separator />);

    expect(container.querySelector('[data-slot="separator"]')).toHaveAttribute(
      'data-orientation',
      'horizontal'
    );
  });

  it('exposes a separator role when it is not decorative', () => {
    render(<Separator decorative={false} />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('reports a vertical orientation to assistive technology', () => {
    render(<Separator decorative={false} orientation='vertical' />);

    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('data-orientation', 'vertical');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Separator className='my-4' decorative={false} />);

    expect(screen.getByRole('separator')).toHaveClass('my-4', 'bg-border');
  });
});
