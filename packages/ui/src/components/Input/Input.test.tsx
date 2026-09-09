import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Input from '@tod-workspace/ui/components/Input';

describe('Input', () => {
  it('renders a textbox with its accessible name from an associated label', () => {
    render(
      <>
        <label htmlFor='email'>Email</label>
        <Input id='email' />
      </>
    );

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('renders a textbox with its accessible name from aria-label', () => {
    render(<Input aria-label='Search' />);

    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('updates its value as the user types', async () => {
    render(<Input aria-label='Name' />);

    const input = screen.getByRole('textbox', { name: 'Name' });
    await userEvent.type(input, 'Ada');

    expect(input).toHaveValue('Ada');
  });

  it('does not accept typed input while disabled', async () => {
    render(<Input aria-label='Name' disabled />);

    const input = screen.getByRole('textbox', { name: 'Name' });
    await userEvent.type(input, 'Ada');

    expect(input).toHaveValue('');
  });

  it('forwards aria-invalid to the rendered element', () => {
    render(<Input aria-invalid aria-label='Name' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('forwards a non-default type to the rendered element', () => {
    render(<Input aria-label='Email' type='email' />);

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute(
      'type',
      'email'
    );
  });

  it('does not accept typed input while read-only', async () => {
    render(<Input aria-label='Name' readOnly value='Ada' />);

    const input = screen.getByRole('textbox', { name: 'Name' });
    await userEvent.type(input, 'Lovelace');

    expect(input).toHaveValue('Ada');
  });

  it('defaults to the md size and exposes it as a data attribute', () => {
    render(<Input aria-label='Name' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'data-size',
      'md'
    );
  });

  it('exposes an explicit size as a data attribute', () => {
    render(<Input aria-label='Name' size='lg' />);

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute(
      'data-size',
      'lg'
    );
  });
});
