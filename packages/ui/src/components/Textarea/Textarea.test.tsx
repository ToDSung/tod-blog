import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Textarea from '@tod-workspace/ui/components/Textarea';

describe('Textarea', () => {
  it('renders a textbox with its accessible name from an associated label', () => {
    render(
      <>
        <label htmlFor='bio'>Bio</label>
        <Textarea id='bio' />
      </>
    );

    expect(screen.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument();
  });

  it('renders a textbox with its accessible name from aria-label', () => {
    render(<Textarea aria-label='Message' />);

    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
  });

  it('keeps the line breaks in the text the user types', async () => {
    render(<Textarea aria-label='Message' />);

    const textarea = screen.getByRole('textbox', { name: 'Message' });
    await userEvent.type(textarea, 'first{enter}second');

    expect(textarea).toHaveValue('first\nsecond');
  });

  it('does not accept typed input while disabled', async () => {
    render(<Textarea aria-label='Message' disabled />);

    const textarea = screen.getByRole('textbox', { name: 'Message' });
    await userEvent.type(textarea, 'Ada');

    expect(textarea).toHaveValue('');
  });

  it('does not accept typed input while read-only', async () => {
    render(<Textarea aria-label='Message' readOnly value='Ada' />);

    const textarea = screen.getByRole('textbox', { name: 'Message' });
    await userEvent.type(textarea, 'Lovelace');

    expect(textarea).toHaveValue('Ada');
  });

  it('forwards aria-invalid to the rendered element', () => {
    render(<Textarea aria-invalid aria-label='Message' />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('forwards rows to the rendered element', () => {
    render(<Textarea aria-label='Message' rows={8} />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute(
      'rows',
      '8'
    );
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(<Textarea aria-label='Message' className='custom-class' />);

    const textarea = screen.getByRole('textbox', { name: 'Message' });
    expect(textarea).toHaveClass('custom-class');
    expect(textarea).toHaveClass('min-h-16');
  });
});
