import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { RadioGroupItemProps } from '@tod-workspace/ui/components/RadioGroup';

import RadioGroup, {
  RadioGroupItem,
} from '@tod-workspace/ui/components/RadioGroup';

const widthOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).width);

const styleOf = (name: string) => {
  const item = screen.getByRole('radio', { name });
  // A read taken during the color transition returns the start value.
  item.style.transition = 'none';
  return getComputedStyle(item);
};

const dotOf = (name: string) =>
  screen
    .getByRole('radio', { name })
    .querySelector<HTMLElement>('[data-slot="radio-group-dot"]')!;

const renderSelected = (items: Omit<RadioGroupItemProps, 'value'>[]) =>
  render(
    <>
      {items.map(item => (
        <RadioGroup key={item['aria-label']} defaultValue='on'>
          <RadioGroupItem {...item} value='on' />
        </RadioGroup>
      ))}
    </>
  );

describe('RadioGroup', () => {
  it('scales the selected dot with the box', () => {
    renderSelected([
      { 'aria-label': 'Small', size: 'sm' },
      { 'aria-label': 'Medium', size: 'md' },
      { 'aria-label': 'Large', size: 'lg' },
    ]);

    const dots = ['Small', 'Medium', 'Large'].map(name => widthOf(dotOf(name)));
    expect(dots[0]).toBeLessThan(dots[1]);
    expect(dots[1]).toBeLessThan(dots[2]);
    expect(dots[2]).toBeLessThan(
      widthOf(screen.getByRole('radio', { name: 'Large' }))
    );
  });

  it('marks the selected item with the border, leaving the box unfilled', () => {
    render(
      <RadioGroup defaultValue='on'>
        <RadioGroupItem aria-label='Selected' value='on' />
        <RadioGroupItem aria-label='Unselected' value='off' />
      </RadioGroup>
    );

    expect(styleOf('Selected').borderColor).not.toBe(
      styleOf('Unselected').borderColor
    );
    expect(styleOf('Selected').backgroundColor).toBe(
      styleOf('Unselected').backgroundColor
    );
  });

  it('contrasts the dot against the box it sits in', () => {
    renderSelected([{ 'aria-label': 'Selected' }]);

    expect(getComputedStyle(dotOf('Selected')).backgroundColor).not.toBe(
      styleOf('Selected').backgroundColor
    );
    expect(getComputedStyle(dotOf('Selected')).backgroundColor).toBe(
      styleOf('Selected').borderColor
    );
  });

  it('dims the box and blocks the cursor while disabled', () => {
    renderSelected([
      { 'aria-label': 'Enabled' },
      { 'aria-label': 'Disabled', disabled: true },
    ]);

    expect(styleOf('Enabled').opacity).toBe('1');
    expect(styleOf('Disabled').opacity).toBe('0.5');
    expect(styleOf('Disabled').cursor).toBe('not-allowed');
  });

  it('rings an invalid item in both selected states', () => {
    render(
      <>
        <RadioGroup>
          <RadioGroupItem aria-label='Valid' value='on' />
        </RadioGroup>
        <RadioGroup>
          <RadioGroupItem aria-invalid aria-label='Invalid' value='on' />
        </RadioGroup>
        <RadioGroup defaultValue='on'>
          <RadioGroupItem
            aria-invalid
            aria-label='Invalid selected'
            value='on'
          />
        </RadioGroup>
      </>
    );

    expect(styleOf('Valid').boxShadow).toBe('none');

    for (const name of ['Invalid', 'Invalid selected']) {
      expect(styleOf(name).boxShadow).not.toBe('none');
    }
  });

  it('borders an invalid item in the destructive color in both selected states', () => {
    render(
      <>
        <RadioGroup>
          <RadioGroupItem aria-label='Valid' value='on' />
        </RadioGroup>
        <RadioGroup>
          <RadioGroupItem aria-invalid aria-label='Invalid' value='on' />
        </RadioGroup>
        <RadioGroup defaultValue='on'>
          <RadioGroupItem aria-label='Selected' value='on' />
        </RadioGroup>
        <RadioGroup defaultValue='on'>
          <RadioGroupItem
            aria-invalid
            aria-label='Invalid selected'
            value='on'
          />
        </RadioGroup>
      </>
    );

    expect(styleOf('Invalid selected').borderColor).toBe(
      styleOf('Invalid').borderColor
    );
    expect(styleOf('Invalid selected').borderColor).not.toBe(
      styleOf('Selected').borderColor
    );

    expect(styleOf('Invalid').borderColor).not.toBe(
      styleOf('Valid').borderColor
    );
    expect(styleOf('Invalid').backgroundColor).toBe(
      styleOf('Valid').backgroundColor
    );
  });
});
