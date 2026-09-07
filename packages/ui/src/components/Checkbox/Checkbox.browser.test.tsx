import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

const widthOf = (element: HTMLElement) => getComputedStyle(element).width;

const styleOf = (name: string) => {
  const checkbox = screen.getByRole('checkbox', { name });
  // A read taken during the color transition returns the start value.
  checkbox.style.transition = 'none';
  return getComputedStyle(checkbox);
};

describe('Checkbox', () => {
  it('renders a different box size for each size', () => {
    render(
      <>
        <Checkbox aria-label='Small' size='sm' />
        <Checkbox aria-label='Medium' size='md' />
        <Checkbox aria-label='Large' size='lg' />
      </>
    );

    expect(widthOf(screen.getByRole('checkbox', { name: 'Small' }))).toBe(
      '14px'
    );
    expect(widthOf(screen.getByRole('checkbox', { name: 'Medium' }))).toBe(
      '16px'
    );
    expect(widthOf(screen.getByRole('checkbox', { name: 'Large' }))).toBe(
      '20px'
    );
  });

  it('scales the indicator icon with the box', () => {
    render(
      <>
        <Checkbox aria-label='Small' checked size='sm' />
        <Checkbox aria-label='Large' checked size='lg' />
      </>
    );

    const iconOf = (name: string) =>
      screen
        .getByRole('checkbox', { name })
        .querySelector<HTMLElement>('.lucide-check');

    expect(widthOf(iconOf('Small')!)).toBe('12px');
    expect(widthOf(iconOf('Large')!)).toBe('16px');
  });

  it('fills the box the same way when checked and when indeterminate', () => {
    render(
      <>
        <Checkbox aria-label='Unchecked' />
        <Checkbox aria-label='Checked' checked />
        <Checkbox aria-label='Mixed' checked='indeterminate' />
      </>
    );

    const checked = styleOf('Checked');
    const mixed = styleOf('Mixed');

    expect(mixed.backgroundColor).toBe(checked.backgroundColor);
    expect(mixed.color).toBe(checked.color);
    expect(mixed.backgroundColor).not.toBe(
      styleOf('Unchecked').backgroundColor
    );
  });

  it('dims the box and blocks the cursor while disabled', () => {
    render(
      <>
        <Checkbox aria-label='Enabled' />
        <Checkbox aria-label='Disabled' disabled />
        <Checkbox aria-label='Disabled checked' checked disabled />
      </>
    );

    expect(styleOf('Enabled').opacity).toBe('1');

    for (const name of ['Disabled', 'Disabled checked']) {
      expect(styleOf(name).opacity).toBe('0.5');
      expect(styleOf(name).cursor).toBe('not-allowed');
    }
  });

  it('keeps the fill of a disabled checkbox readable', () => {
    render(
      <>
        <Checkbox aria-label='Checked' checked />
        <Checkbox aria-label='Disabled checked' checked disabled />
      </>
    );

    expect(styleOf('Disabled checked').backgroundColor).toBe(
      styleOf('Checked').backgroundColor
    );
    expect(styleOf('Disabled checked').color).toBe(styleOf('Checked').color);
  });

  it('rings an invalid checkbox in every checked state', () => {
    render(
      <>
        <Checkbox aria-label='Valid' />
        <Checkbox aria-invalid aria-label='Invalid' />
        <Checkbox aria-invalid aria-label='Invalid checked' checked />
        <Checkbox
          aria-invalid
          aria-label='Invalid mixed'
          checked='indeterminate'
        />
      </>
    );

    expect(styleOf('Valid').boxShadow).toBe('none');

    for (const name of ['Invalid', 'Invalid checked', 'Invalid mixed']) {
      expect(styleOf(name).boxShadow).not.toBe('none');
    }
  });

  it('borders an invalid unchecked checkbox in the destructive color', () => {
    render(
      <>
        <Checkbox aria-label='Valid' />
        <Checkbox aria-invalid aria-label='Invalid' />
      </>
    );

    expect(styleOf('Invalid').borderColor).not.toBe(
      styleOf('Valid').borderColor
    );
    expect(styleOf('Invalid').backgroundColor).toBe(
      styleOf('Valid').backgroundColor
    );
  });

  it('shows the check icon when checked and the minus icon when indeterminate', () => {
    const { rerender } = render(<Checkbox aria-label='Accept terms' checked />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.querySelector('.lucide-check')).toBeVisible();
    expect(checkbox.querySelector('.lucide-minus')).not.toBeVisible();

    rerender(<Checkbox aria-label='Accept terms' checked='indeterminate' />);

    expect(checkbox.querySelector('.lucide-check')).not.toBeVisible();
    expect(checkbox.querySelector('.lucide-minus')).toBeVisible();
  });
});
