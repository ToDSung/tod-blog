import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Switch from '@tod-workspace/ui/components/Switch';

describe('Switch', () => {
  it('renders a switch with its accessible name from an associated label', () => {
    render(
      <>
        <label htmlFor='airplane'>Airplane mode</label>
        <Switch id='airplane' />
      </>
    );

    expect(
      screen.getByRole('switch', { name: 'Airplane mode' })
    ).toBeInTheDocument();
  });

  it('starts unchecked', () => {
    render(<Switch aria-label='Airplane mode' />);

    expect(
      screen.getByRole('switch', { name: 'Airplane mode' })
    ).not.toBeChecked();
  });

  it('checks on click', async () => {
    render(<Switch aria-label='Airplane mode' />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    await userEvent.click(switchControl);

    expect(switchControl).toBeChecked();
  });

  it('unchecks on a second click', async () => {
    render(<Switch aria-label='Airplane mode' defaultChecked />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    await userEvent.click(switchControl);

    expect(switchControl).not.toBeChecked();
  });

  it('toggles when space is pressed while focused', async () => {
    render(<Switch aria-label='Airplane mode' />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    await userEvent.tab();
    expect(switchControl).toHaveFocus();

    await userEvent.keyboard('{ }');

    expect(switchControl).toBeChecked();
  });

  it('reports the new state through onCheckedChange', async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch aria-label='Airplane mode' onCheckedChange={onCheckedChange} />
    );

    await userEvent.click(
      screen.getByRole('switch', { name: 'Airplane mode' })
    );

    expect(onCheckedChange).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('stays at the checked state the caller controls', async () => {
    render(<Switch aria-label='Airplane mode' checked={false} />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    await userEvent.click(switchControl);

    expect(switchControl).not.toBeChecked();
  });

  it('moves the thumb into the checked state', async () => {
    render(<Switch aria-label='Airplane mode' />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    const thumb = switchControl.querySelector('[data-slot="switch-thumb"]');
    expect(thumb).toHaveAttribute('data-state', 'unchecked');

    await userEvent.click(switchControl);

    expect(thumb).toHaveAttribute('data-state', 'checked');
  });

  it('renders at the md size by default', () => {
    render(<Switch aria-label='Airplane mode' />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    expect(switchControl).toHaveAttribute('data-size', 'md');
    expect(switchControl).toHaveClass('w-[32px]');
  });

  it.each([
    ['sm', 'w-[24px]'],
    ['md', 'w-[32px]'],
    ['lg', 'w-[40px]'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(<Switch aria-label='Airplane mode' size={size} />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    expect(switchControl).toHaveAttribute('data-size', size);
    expect(switchControl).toHaveClass(expectedClass);
  });

  it('does not toggle while disabled', async () => {
    render(<Switch aria-label='Airplane mode' disabled />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    await userEvent.click(switchControl);

    expect(switchControl).not.toBeChecked();
  });

  it('forwards aria-invalid to the rendered element', () => {
    render(<Switch aria-invalid aria-label='Airplane mode' />);

    expect(
      screen.getByRole('switch', { name: 'Airplane mode' })
    ).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Switch aria-label='Airplane mode' className='custom-class' />);

    const switchControl = screen.getByRole('switch', {
      name: 'Airplane mode',
    });
    expect(switchControl).toHaveClass('custom-class');
    expect(switchControl).toHaveClass('w-[32px]');
  });
});
