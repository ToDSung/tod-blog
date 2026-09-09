import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Switch from '@tod-workspace/ui/components/Switch';

const switchControl = () =>
  screen.getByRole('switch', { name: 'Airplane mode' });

describe('Switch', () => {
  it('checks on click', async () => {
    render(<Switch aria-label='Airplane mode' />);

    await userEvent.click(switchControl());

    expect(switchControl()).toBeChecked();
  });

  it('renders at the md size by default', () => {
    render(<Switch aria-label='Airplane mode' />);

    expect(switchControl()).toHaveAttribute('data-size', 'md');
    expect(switchControl()).toHaveClass('h-[18.4px]', 'w-8');
  });

  it.each([
    ['sm', 'h-[14px]', 'w-6'],
    ['lg', 'h-[23px]', 'w-10'],
  ] as const)('renders the %s track size', (size, heightClass, widthClass) => {
    render(<Switch aria-label='Airplane mode' size={size} />);

    expect(switchControl()).toHaveAttribute('data-size', size);
    expect(switchControl()).toHaveClass(heightClass, widthClass);
  });

  it('keeps the 2px rings', () => {
    render(<Switch aria-label='Airplane mode' />);

    expect(switchControl()).toHaveClass(
      'focus-visible:ring-2',
      'aria-invalid:ring-2'
    );
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Switch aria-label='Airplane mode' className='custom-class' />);

    expect(switchControl()).toHaveClass('custom-class', 'rounded-full');
  });
});
