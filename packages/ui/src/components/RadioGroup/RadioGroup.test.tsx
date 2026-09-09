import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

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
  it('checks on click and unchecks the previous selection', async () => {
    renderGroup({ defaultValue: 'comfortable' });

    await userEvent.click(radio('Compact'));

    expect(radio('Compact')).toBeChecked();
    expect(radio('Comfortable')).not.toBeChecked();
  });

  it('renders items at the md size by default', () => {
    renderGroup();

    expect(radio('Default')).toHaveAttribute('data-size', 'md');
    expect(radio('Default')).toHaveClass('size-4');
  });

  it.each([
    ['sm', 'size-3.5'],
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

  it('draws the unselected border and keeps the 2px rings', () => {
    renderGroup();

    expect(radio('Default')).toHaveClass(
      'border',
      'border-input',
      'focus-visible:ring-2',
      'aria-invalid:ring-2'
    );
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
  });
});
