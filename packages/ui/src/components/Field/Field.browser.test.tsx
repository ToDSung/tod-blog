import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';
import Field, {
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@tod-workspace/ui/components/Field';
import Input from '@tod-workspace/ui/components/Input';

const gapBetween = (upper: HTMLElement, lower: HTMLElement) =>
  lower.getBoundingClientRect().top - upper.getBoundingClientRect().bottom;

const renderField = () =>
  render(
    <Field>
      <FieldLabel htmlFor='email'>Email</FieldLabel>
      <Input id='email' />
      <FieldDescription>We never share it.</FieldDescription>
      <FieldError>Email is required.</FieldError>
    </Field>
  );

describe('Field', () => {
  it('leaves 8px under the label and 4px under the input and description', () => {
    renderField();

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox', { name: 'Email' });
    const description = screen.getByText('We never share it.');

    expect(gapBetween(label, input)).toBe(8);
    expect(gapBetween(input, description)).toBe(4);
    expect(gapBetween(description, screen.getByRole('alert'))).toBe(4);
  });

  it('sets description and error text 2px below the 14px label', () => {
    renderField();

    const label = getComputedStyle(screen.getByText('Email'));
    const description = getComputedStyle(
      screen.getByText('We never share it.')
    );
    const error = getComputedStyle(screen.getByRole('alert'));

    expect(label.fontSize).toBe('14px');
    expect(description.fontSize).toBe('12px');
    expect(description.lineHeight).toBe('16px');
    expect(error.fontSize).toBe('12px');
    expect(error.lineHeight).toBe('16px');
  });

  it('aligns the label, input and description on one left edge', () => {
    renderField();

    const left = (element: HTMLElement) => element.getBoundingClientRect().left;
    const labelLeft = left(screen.getByText('Email'));

    expect(left(screen.getByRole('textbox', { name: 'Email' }))).toBe(
      labelLeft
    );
    expect(left(screen.getByText('We never share it.'))).toBe(labelLeft);
  });

  it('keeps 8px between a checkbox and its label when horizontal', () => {
    render(
      <Field orientation='horizontal'>
        <Checkbox id='terms' />
        <FieldLabel htmlFor='terms'>Accept terms</FieldLabel>
      </Field>
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    const label = screen.getByText('Accept terms');

    expect(
      label.getBoundingClientRect().left -
        checkbox.getBoundingClientRect().right
    ).toBe(8);
    expect(getComputedStyle(label).marginBottom).toBe('0px');
  });
});
