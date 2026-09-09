import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { RadioGroupProps } from '@tod-workspace/ui/components/RadioGroup';

import RadioGroup, {
  RadioGroupItem,
} from '@tod-workspace/ui/components/RadioGroup';

const renderGroup = (props: RadioGroupProps = {}) =>
  render(
    <RadioGroup {...props}>
      <RadioGroupItem aria-label='Default' value='default' />
      <RadioGroupItem aria-label='Comfortable' value='comfortable' />
      <RadioGroupItem aria-label='Compact' value='compact' />
    </RadioGroup>
  );

const radio = (name: string) => screen.getByRole('radio', { name });

describe('RadioGroup', () => {
  it('renders a radiogroup holding one radio per item', () => {
    renderGroup();

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(radio('Comfortable')).toBeInTheDocument();
  });

  it('leaves every radio unchecked without a default value', () => {
    renderGroup();

    for (const item of screen.getAllByRole('radio')) {
      expect(item).not.toBeChecked();
    }
  });

  it('checks the radio matching defaultValue', () => {
    renderGroup({ defaultValue: 'comfortable' });

    expect(radio('Comfortable')).toBeChecked();
    expect(radio('Default')).not.toBeChecked();
  });

  it('checks on click and unchecks the previous selection', async () => {
    renderGroup({ defaultValue: 'comfortable' });

    await userEvent.click(radio('Compact'));

    expect(radio('Compact')).toBeChecked();
    expect(radio('Comfortable')).not.toBeChecked();
  });

  it('reports the new value through onValueChange', async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });

    await userEvent.click(radio('Compact'));

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith('compact');
  });

  it('stays at the value the caller controls', async () => {
    renderGroup({ value: 'default' });

    await userEvent.click(radio('Compact'));

    expect(radio('Compact')).not.toBeChecked();
    expect(radio('Default')).toBeChecked();
  });

  it('moves focus with the arrow keys without changing the selection', async () => {
    renderGroup({ defaultValue: 'default' });

    await userEvent.tab();
    expect(radio('Default')).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');

    expect(radio('Comfortable')).toHaveFocus();
    expect(radio('Default')).toBeChecked();
  });

  it('selects the focused radio when space is pressed', async () => {
    renderGroup({ defaultValue: 'default' });

    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}{ }');

    expect(radio('Comfortable')).toBeChecked();
    expect(radio('Default')).not.toBeChecked();
  });

  it('gives the group a single tab stop', async () => {
    renderGroup({ defaultValue: 'comfortable' });

    await userEvent.tab();

    expect(radio('Comfortable')).toHaveFocus();
    expect(radio('Default')).toHaveAttribute('tabindex', '-1');
    expect(radio('Compact')).toHaveAttribute('tabindex', '-1');
  });

  it('does not select while the group is disabled', async () => {
    renderGroup({ disabled: true });

    await userEvent.click(radio('Compact'));

    expect(radio('Compact')).not.toBeChecked();
  });

  it('does not select a disabled item', async () => {
    render(
      <RadioGroup>
        <RadioGroupItem aria-label='Default' value='default' />
        <RadioGroupItem aria-label='Compact' disabled value='compact' />
      </RadioGroup>
    );

    await userEvent.click(radio('Compact'));

    expect(radio('Compact')).not.toBeChecked();
  });

  it('renders items at the md size by default', () => {
    renderGroup();

    expect(radio('Default')).toHaveAttribute('data-size', 'md');
    expect(radio('Default')).toHaveClass('size-4');
  });

  it.each([
    ['sm', 'size-3.5'],
    ['md', 'size-4'],
    ['lg', 'size-5'],
  ] as const)('renders the %s item size', (size, expectedClass) => {
    render(
      <RadioGroup>
        <RadioGroupItem aria-label='Default' size={size} value='default' />
      </RadioGroup>
    );

    expect(radio('Default')).toHaveAttribute('data-size', size);
    expect(radio('Default')).toHaveClass(expectedClass);
  });

  it('forwards aria-invalid to the rendered item', () => {
    render(
      <RadioGroup>
        <RadioGroupItem aria-invalid aria-label='Default' value='default' />
      </RadioGroup>
    );

    expect(radio('Default')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <RadioGroup className='group-class'>
        <RadioGroupItem
          aria-label='Default'
          className='item-class'
          value='default'
        />
      </RadioGroup>
    );

    expect(screen.getByRole('radiogroup')).toHaveClass('group-class');
    expect(screen.getByRole('radiogroup')).toHaveClass('grid');
    expect(radio('Default')).toHaveClass('item-class');
    expect(radio('Default')).toHaveClass('size-4');
  });
});
