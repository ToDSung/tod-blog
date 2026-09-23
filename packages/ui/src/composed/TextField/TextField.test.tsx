import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import TextField from '@tod-workspace/ui/composed/TextField';

const textbox = (name = 'Email') => screen.getByRole('textbox', { name });

describe('TextField', () => {
  it('names the input with its label without a caller-supplied id', () => {
    render(<TextField label='Email' />);

    expect(textbox()).toBeInTheDocument();
    expect(textbox().id).not.toBe('');
  });

  it('keeps a caller-supplied id', () => {
    render(<TextField id='work-email' label='Email' />);

    expect(textbox()).toHaveAttribute('id', 'work-email');
  });

  it('gives each instance its own id', () => {
    render(
      <>
        <TextField label='Email' />
        <TextField label='Name' />
      </>
    );

    expect(textbox('Email').id).not.toBe(textbox('Name').id);
  });

  it('describes the input with its description', () => {
    render(<TextField description='We never share it.' label='Email' />);

    expect(textbox()).toHaveAccessibleDescription('We never share it.');
  });

  it('leaves the input valid and undescribed without description or error', () => {
    render(<TextField label='Email' />);

    expect(textbox()).not.toHaveAttribute('aria-describedby');
    expect(textbox()).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('group')).not.toHaveAttribute('data-invalid');
  });

  it('replaces the description with the error and announces it', () => {
    render(
      <TextField
        description='Your work address.'
        error='Email is required.'
        label='Email'
      />
    );

    expect(textbox()).toHaveAttribute('aria-invalid', 'true');
    expect(textbox()).toHaveAccessibleDescription('Email is required.');
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
    expect(screen.queryByText('Your work address.')).not.toBeInTheDocument();
    expect(screen.getByRole('group')).toHaveAttribute('data-invalid', 'true');
  });

  it('brings the description back once the error clears', () => {
    const { rerender } = render(
      <TextField
        description='Your work address.'
        error='Email is required.'
        label='Email'
      />
    );

    rerender(<TextField description='Your work address.' label='Email' />);

    expect(textbox()).toHaveAccessibleDescription('Your work address.');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('treats an empty error as no error', () => {
    render(
      <TextField description='Your work address.' error='' label='Email' />
    );

    expect(textbox()).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(textbox()).toHaveAccessibleDescription('Your work address.');
  });

  it('keeps a caller-supplied aria-describedby alongside its own', () => {
    render(
      <>
        <p id='hint'>Use your work address.</p>
        <TextField
          aria-describedby='hint'
          description='We never share it.'
          label='Email'
        />
      </>
    );

    expect(textbox()).toHaveAccessibleDescription(
      'Use your work address. We never share it.'
    );
  });

  it('disables the input and marks the field disabled', () => {
    render(<TextField disabled label='Email' />);

    expect(textbox()).toBeDisabled();
    expect(screen.getByRole('group')).toHaveAttribute('data-disabled', 'true');
  });

  it('forwards input props and accepts typing', async () => {
    render(<TextField label='Email' placeholder='you@example.com' size='lg' />);

    await userEvent.type(textbox(), 'tod@example.com');

    expect(textbox()).toHaveValue('tod@example.com');
    expect(textbox()).toHaveAttribute('placeholder', 'you@example.com');
    expect(textbox()).toHaveAttribute('data-size', 'lg');
  });

  it('puts a caller-supplied className on the field, not the input', () => {
    render(<TextField className='field-class' label='Email' />);

    expect(screen.getByRole('group')).toHaveClass('field-class');
    expect(textbox()).not.toHaveClass('field-class');
  });
});
