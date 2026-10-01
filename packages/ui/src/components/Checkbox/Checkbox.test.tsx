import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

const checkbox = () => screen.getByRole('checkbox', { name: 'Accept terms' });

describe('Checkbox', () => {
  it('starts unchecked and shows no indicator', () => {
    render(<Checkbox aria-label='Accept terms' />);

    expect(checkbox()).not.toBeChecked();
    expect(checkbox()).toBeEmptyDOMElement();
  });

  it('checks on click and shows the indicator', async () => {
    render(<Checkbox aria-label='Accept terms' />);

    await userEvent.click(checkbox());

    expect(checkbox()).toBeChecked();
    expect(checkbox()).not.toBeEmptyDOMElement();
  });

  it('renders at the md size by default', () => {
    render(<Checkbox aria-label='Accept terms' />);

    expect(checkbox()).toHaveAttribute('data-size', 'md');
    expect(checkbox()).toHaveClass('size-4');
  });

  it.each([
    ['sm', 'size-3.5', "[&_svg:not([class*='size-'])]:size-3"],
    ['lg', 'size-5', "[&_svg:not([class*='size-'])]:size-4"],
  ] as const)(
    'sizes the %s box and its icon together',
    (size, boxClass, iconClass) => {
      render(<Checkbox aria-label='Accept terms' size={size} />);

      expect(checkbox()).toHaveClass(boxClass, iconClass);
    }
  );

  it('fills the box the same way when checked and when indeterminate', () => {
    render(<Checkbox aria-label='Accept terms' />);

    expect(checkbox()).toHaveClass(
      'data-checked:border-primary',
      'data-checked:bg-primary',
      'data-checked:text-primary-foreground',
      'data-[state=indeterminate]:border-primary',
      'data-[state=indeterminate]:bg-primary',
      'data-[state=indeterminate]:text-primary-foreground'
    );
  });

  it('keeps the 2px rings and the primary border of an invalid checked box', () => {
    render(<Checkbox aria-label='Accept terms' />);

    expect(checkbox()).toHaveClass(
      'focus-visible:ring-2',
      'aria-invalid:ring-2',
      'aria-invalid:aria-checked:border-primary'
    );
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Checkbox aria-label='Accept terms' className='custom-class' />);

    expect(checkbox()).toHaveClass('custom-class', 'border-input');
  });
});
