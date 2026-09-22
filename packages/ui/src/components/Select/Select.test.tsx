import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { SelectProps } from '@tod-workspace/ui/components/Select';

import Select, {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@tod-workspace/ui/components/Select';

const renderSelect = (props: SelectProps = {}) =>
  render(
    <Select {...props}>
      <SelectTrigger aria-label='Fruit'>
        <SelectValue placeholder='Pick a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem disabled value='cherry'>
            Cherry
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value='durian'>Durian</SelectItem>
      </SelectContent>
    </Select>
  );

const trigger = () => screen.getByRole('combobox', { name: 'Fruit' });

const openList = async () => {
  await userEvent.click(trigger());
  return screen.findByRole('listbox');
};

describe('Select', () => {
  it('opens the list on trigger click', async () => {
    renderSelect();

    expect(await openList()).toBeVisible();
  });

  it('positions the list as a popper aligned to the trigger start by default', async () => {
    renderSelect();

    const list = await openList();

    expect(list).toHaveAttribute('data-align-trigger', 'false');
    expect(list).toHaveAttribute('data-align', 'start');
    expect(
      document.querySelector('[data-radix-select-viewport]')
    ).toHaveAttribute('data-position', 'popper');
  });

  it('renders the trigger at the md size by default', () => {
    renderSelect();

    expect(trigger()).toHaveAttribute('data-size', 'md');
    expect(trigger()).toHaveClass('h-8');
  });

  it.each([
    ['sm', 'h-7'],
    ['lg', 'h-9'],
  ] as const)('renders the %s trigger size', (size, expectedClass) => {
    render(
      <Select>
        <SelectTrigger aria-label='Fruit' size={size}>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    expect(trigger()).toHaveAttribute('data-size', size);
    expect(trigger()).toHaveClass(expectedClass);
  });

  it('gives the trigger its minimum width, 2px rings and chevron', () => {
    renderSelect();

    expect(trigger()).toHaveClass(
      'min-w-45',
      'focus-visible:ring-2',
      'aria-invalid:ring-2'
    );
    expect(trigger().querySelector('.lucide-chevron-down')).toBeInTheDocument();
  });

  it('styles the panel, label and separator like the other menu surfaces', async () => {
    renderSelect();

    const list = await openList();

    expect(list).toHaveClass('min-w-36', 'ring-1', 'ring-foreground/10');
    expect(screen.getByText('Fruits')).not.toHaveClass('font-medium');
    expect(list.querySelector('[data-slot="select-separator"]')).toHaveClass(
      'pointer-events-none'
    );
  });

  it('marks only the chosen item with a check', async () => {
    renderSelect({ defaultValue: 'banana' });

    await openList();

    expect(
      screen
        .getByRole('option', { name: 'Banana' })
        .querySelector('.lucide-check')
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole('option', { name: 'Apple' })
        .querySelector('.lucide-check')
    ).not.toBeInTheDocument();
  });

  it('forwards a caller-supplied className alongside the base classes', async () => {
    render(
      <Select>
        <SelectTrigger aria-label='Fruit' className='trigger-class'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='content-class'>
          <SelectItem className='item-class' value='apple'>
            Apple
          </SelectItem>
        </SelectContent>
      </Select>
    );

    expect(trigger()).toHaveClass('trigger-class', 'border-input');

    expect(await openList()).toHaveClass('content-class', 'bg-popover');
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveClass(
      'item-class',
      'rounded-md'
    );
  });
});
