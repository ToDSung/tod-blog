import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox with its accessible name from an associated label', () => {
    render(
      <>
        <label htmlFor='terms'>Accept terms</label>
        <Checkbox id='terms' />
      </>
    );

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' })
    ).toBeInTheDocument();
  });

  it('starts unchecked and shows no indicator', () => {
    render(<Checkbox aria-label='Accept terms' />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeEmptyDOMElement();
  });

  it('checks on click and shows the indicator', async () => {
    render(<Checkbox aria-label='Accept terms' />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(checkbox).not.toBeEmptyDOMElement();
  });

  it('unchecks on a second click', async () => {
    render(<Checkbox aria-label='Accept terms' defaultChecked />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('toggles when space is pressed while focused', async () => {
    render(<Checkbox aria-label='Accept terms' />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.tab();
    expect(checkbox).toHaveFocus();

    await userEvent.keyboard('{ }');

    expect(checkbox).toBeChecked();
  });

  it('reports the new state through onCheckedChange', async () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox aria-label='Accept terms' onCheckedChange={onCheckedChange} />
    );

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Accept terms' })
    );

    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('stays at the checked state the caller controls', async () => {
    render(<Checkbox aria-label='Accept terms' checked={false} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('exposes the indeterminate state as aria-checked="mixed"', () => {
    render(<Checkbox aria-label='Accept terms' checked='indeterminate' />);

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' })
    ).toHaveAttribute('aria-checked', 'mixed');
  });

  it('renders at the md size by default', () => {
    render(<Checkbox aria-label='Accept terms' />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('data-size', 'md');
    expect(checkbox).toHaveClass('size-4');
  });

  it.each([
    ['sm', 'size-3.5'],
    ['md', 'size-4'],
    ['lg', 'size-5'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(<Checkbox aria-label='Accept terms' size={size} />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('data-size', size);
    expect(checkbox).toHaveClass(expectedClass);
  });

  it('does not toggle while disabled', async () => {
    render(<Checkbox aria-label='Accept terms' disabled />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('forwards aria-invalid to the rendered element', () => {
    render(<Checkbox aria-invalid aria-label='Accept terms' />);

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' })
    ).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Checkbox aria-label='Accept terms' className='custom-class' />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveClass('custom-class');
    expect(checkbox).toHaveClass('size-4');
  });
});
