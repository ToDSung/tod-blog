import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Field, {
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@tod-workspace/ui/components/Field';
import Input from '@tod-workspace/ui/components/Input';

describe('Field', () => {
  it('renders a group laid out vertically by default', () => {
    render(<Field aria-label='Email field' />);

    const field = screen.getByRole('group', { name: 'Email field' });

    expect(field).toHaveAttribute('data-orientation', 'vertical');
    expect(field).toHaveClass('flex-col');
  });

  it('renders the horizontal orientation', () => {
    render(<Field aria-label='Email field' orientation='horizontal' />);

    const field = screen.getByRole('group', { name: 'Email field' });

    expect(field).toHaveAttribute('data-orientation', 'horizontal');
    expect(field).toHaveClass('flex-row');
  });

  it('names the control through FieldLabel and marks the label slot', () => {
    render(
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input id='email' />
      </Field>
    );

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByText('Email')).toHaveAttribute(
      'data-slot',
      'field-label'
    );
  });

  it('colors an invalid field and dims the label of a disabled one', () => {
    render(
      <Field aria-label='Email field'>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input id='email' />
      </Field>
    );

    expect(screen.getByRole('group', { name: 'Email field' })).toHaveClass(
      'data-[invalid=true]:text-destructive'
    );
    expect(screen.getByText('Email')).toHaveClass(
      'group-data-[disabled=true]/field:opacity-50'
    );
  });

  describe('FieldError', () => {
    it.each([
      ['undefined', undefined],
      ['an empty string', ''],
    ])('renders nothing for %s', (_, message) => {
      const { container } = render(<FieldError>{message}</FieldError>);

      expect(container).toBeEmptyDOMElement();
    });

    it('announces its message as an alert', () => {
      render(<FieldError>Email is required.</FieldError>);

      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent('Email is required.');
      expect(error).toHaveAttribute('data-slot', 'field-error');
    });
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Field aria-label='Email field' className='field-class'>
        <FieldLabel className='label-class' htmlFor='email'>
          Email
        </FieldLabel>
        <Input id='email' />
        <FieldDescription className='description-class'>
          Work address.
        </FieldDescription>
        <FieldError className='error-class'>Required.</FieldError>
      </Field>
    );

    expect(screen.getByRole('group', { name: 'Email field' })).toHaveClass(
      'field-class',
      'group/field'
    );
    expect(screen.getByText('Email')).toHaveClass('label-class', 'w-fit');
    const description = screen.getByText('Work address.');
    expect(description).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(description).toHaveAttribute('data-slot', 'field-description');
    expect(screen.getByRole('alert')).toHaveClass(
      'error-class',
      'text-destructive'
    );
  });
});
