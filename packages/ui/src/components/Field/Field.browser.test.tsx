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
  it('leaves more room under the label than under the input and description', () => {
    renderField();

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox', { name: 'Email' });
    const description = screen.getByText('We never share it.');
    const helperGap = gapBetween(input, description);

    expect(helperGap).toBeGreaterThan(0);
    expect(gapBetween(label, input)).toBeGreaterThan(helperGap);
    expect(gapBetween(description, screen.getByRole('alert'))).toBe(helperGap);
  });

  it('drops the extra label margin when horizontal', () => {
    render(
      <Field orientation='horizontal'>
        <Checkbox id='terms' />
        <FieldLabel htmlFor='terms'>Accept terms</FieldLabel>
      </Field>
    );

    expect(
      getComputedStyle(screen.getByText('Accept terms')).marginBottom
    ).toBe('0px');
  });

  it('sets a label above its control smaller than a label beside one', () => {
    renderField();
    render(
      <Field orientation='horizontal'>
        <Checkbox id='terms' />
        <FieldLabel htmlFor='terms'>Accept terms</FieldLabel>
      </Field>
    );

    const fontSizeOf = (text: string) =>
      parseFloat(getComputedStyle(screen.getByText(text)).fontSize);

    expect(fontSizeOf('Email')).toBeLessThan(fontSizeOf('Accept terms'));
    expect(fontSizeOf('Email')).toBeGreaterThan(
      fontSizeOf('We never share it.')
    );
  });
});
