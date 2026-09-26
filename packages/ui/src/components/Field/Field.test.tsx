import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';
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

  it('names the control through FieldLabel', () => {
    render(
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <Input id='email' />
        <FieldDescription>We never share it.</FieldDescription>
      </Field>
    );

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByText('We never share it.')).toHaveAttribute(
      'data-slot',
      'field-description'
    );
  });

  it('toggles a checkbox when its FieldLabel is clicked', async () => {
    render(
      <Field orientation='horizontal'>
        <Checkbox id='terms' />
        <FieldLabel htmlFor='terms'>Accept terms</FieldLabel>
      </Field>
    );

    await userEvent.click(screen.getByText('Accept terms'));

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' })
    ).toBeChecked();
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

      expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
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
    expect(screen.getByText('Work address.')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
    expect(screen.getByRole('alert')).toHaveClass(
      'error-class',
      'text-destructive'
    );
  });
});
