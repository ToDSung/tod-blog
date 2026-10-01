import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Textarea from '@tod-workspace/ui/components/Textarea';

describe('Textarea', () => {
  it('forwards aria-invalid to the rendered element', () => {
    render(<Textarea aria-invalid aria-label='Bio' />);

    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('keeps the 180px minimum width, the 2px rings and the 16px mobile text', () => {
    render(<Textarea aria-label='Bio' />);

    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveClass(
      'min-w-45',
      'focus-visible:ring-2',
      'aria-invalid:ring-2',
      'text-base',
      'md:text-sm'
    );
  });

  it('merges a caller className', () => {
    render(<Textarea aria-label='Bio' className='custom-class' />);

    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveClass(
      'custom-class',
      'min-w-45'
    );
  });
});
