import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Badge from '@tod-workspace/ui/components/Badge';

describe('Badge', () => {
  it('renders the default variant unless one is given', () => {
    render(<Badge>New</Badge>);

    expect(screen.getByText('New')).toHaveAttribute('data-variant', 'default');
  });

  it('exposes the chosen variant as a data attribute and applies its classes', () => {
    render(<Badge variant='outline'>Draft</Badge>);

    expect(screen.getByText('Draft')).toHaveAttribute(
      'data-variant',
      'outline'
    );
    expect(screen.getByText('Draft')).toHaveClass('border-border');
  });

  it('renders the child element instead of a span when asChild is set', () => {
    render(
      <Badge asChild>
        <a href='/tags/react'>React</a>
      </Badge>
    );

    const link = screen.getByRole('link', { name: 'React' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('data-slot', 'badge');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Badge className='badge-class'>New</Badge>);

    expect(screen.getByText('New')).toHaveClass(
      'badge-class',
      "[&_svg:not([class*='size-'])]:size-3"
    );
  });
});
