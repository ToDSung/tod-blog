import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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

const expectListClosed = async () => {
  await waitFor(() =>
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  );
};

describe('Select', () => {
  it('shows the placeholder until a value is chosen', () => {
    renderSelect();

    expect(trigger()).toHaveTextContent('Pick a fruit');
    expect(trigger()).toHaveAttribute('data-placeholder');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows the item text matching defaultValue', () => {
    renderSelect({ defaultValue: 'banana' });

    expect(trigger()).toHaveTextContent('Banana');
    expect(trigger()).not.toHaveAttribute('data-placeholder');
  });

  it('opens on trigger click and lists every item', async () => {
    renderSelect();
    const combobox = trigger();

    expect(await openList()).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
  });

  it('positions the list as a popper aligned to the trigger start by default', async () => {
    renderSelect();

    await openList();
    const content = document.querySelector('[data-slot="select-content"]');

    expect(content).toHaveAttribute('data-align-trigger', 'false');
    expect(content).toHaveAttribute('data-align', 'start');
    expect(
      document.querySelector('[data-radix-select-viewport]')
    ).toHaveAttribute('data-position', 'popper');
  });

  it('shows the chosen item on the trigger and closes', async () => {
    renderSelect();

    await openList();
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));

    await expectListClosed();
    expect(trigger()).toHaveTextContent('Apple');
  });

  it('marks the selected item inside the open list', async () => {
    renderSelect({ defaultValue: 'banana' });

    await openList();

    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('reports the new value through onValueChange', async () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });

    await openList();
    await userEvent.click(screen.getByRole('option', { name: 'Durian' }));

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('durian');
  });

  it('stays at the value the caller controls', async () => {
    renderSelect({ value: 'apple' });

    await openList();
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    await expectListClosed();
    expect(trigger()).toHaveTextContent('Apple');
  });

  it('does not choose a disabled item', async () => {
    const onValueChange = vi.fn();
    renderSelect({ onValueChange });

    await openList();
    const cherry = screen.getByRole('option', { name: 'Cherry' });
    expect(cherry).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(cherry);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('opens from the keyboard and chooses with Enter', async () => {
    renderSelect();

    await userEvent.tab();
    expect(trigger()).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await screen.findByRole('listbox');
    await userEvent.keyboard('{ArrowDown}{Enter}');

    await expectListClosed();
    expect(trigger()).toHaveTextContent('Banana');
    expect(trigger()).toHaveFocus();
  });

  it('closes on Escape without changing the value', async () => {
    renderSelect({ defaultValue: 'apple' });

    await openList();
    await userEvent.keyboard('{Escape}');

    await expectListClosed();
    expect(trigger()).toHaveTextContent('Apple');
  });

  it('does not open while disabled', async () => {
    renderSelect({ disabled: true });

    expect(trigger()).toBeDisabled();
    await userEvent.click(trigger());

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('submits the chosen value under its name inside a form', () => {
    const { container } = render(
      <form>
        <Select defaultValue='banana' name='fruit'>
          <SelectTrigger aria-label='Fruit'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
          </SelectContent>
        </Select>
      </form>
    );

    const form = container.querySelector('form')!;

    expect(new FormData(form).get('fruit')).toBe('banana');
  });

  it('renders the trigger at the md size by default', () => {
    renderSelect();

    expect(trigger()).toHaveAttribute('data-size', 'md');
    expect(trigger()).toHaveClass('h-8');
  });

  it.each([
    ['sm', 'h-7'],
    ['md', 'h-8'],
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

  it('forwards aria-invalid to the trigger', () => {
    render(
      <Select>
        <SelectTrigger aria-invalid aria-label='Fruit'>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    expect(trigger()).toHaveAttribute('aria-invalid', 'true');
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

    await openList();
    const content = document.querySelector('[data-slot="select-content"]');

    expect(content).toHaveClass('content-class', 'bg-popover');
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveClass(
      'item-class',
      'rounded-md'
    );
  });
});
