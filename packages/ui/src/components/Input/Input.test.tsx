import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Input from '@tod-workspace/ui/components/Input';

describe('Input', () => {
  it('forwards aria-invalid to the rendered element', () => {
    render(<Input aria-invalid aria-label='Name' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('keeps the 180px minimum width and the 2px rings', () => {
    render(<Input aria-label='Name' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveClass(
      'min-w-45',
      'focus-visible:ring-2',
      'aria-invalid:ring-2'
    );
  });

  it('defaults to the md size and exposes it as a data attribute', () => {
    render(<Input aria-label='Name' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'data-size',
      'md'
    );
  });

  it('exposes an explicit size as a data attribute', () => {
    render(<Input aria-label='Name' size='lg' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'data-size',
      'lg'
    );
  });
});
