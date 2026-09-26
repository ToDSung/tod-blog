'use client';

import { useId } from 'react';

import type { InputProps } from '@tod-workspace/ui/components/Input';
import type { ReactNode } from 'react';

import Field, {
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@tod-workspace/ui/components/Field';
import Input from '@tod-workspace/ui/components/Input';

export interface TextFieldProps extends InputProps {
  description?: ReactNode;
  error?: string;
  label: ReactNode;
}

const TextField = ({
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  description,
  disabled,
  error,
  id,
  label,
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const invalid = Boolean(error);
  const hasHelper = invalid || Boolean(description);

  const describedBy =
    [ariaDescribedBy, hasHelper ? helperId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <Field
      className={className}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Input
        aria-describedby={describedBy}
        aria-invalid={invalid || ariaInvalid}
        disabled={disabled}
        id={inputId}
        {...props}
      />
      <div className='min-h-4' data-slot='text-field-helper'>
        {invalid && <FieldError id={helperId}>{error}</FieldError>}
        {!invalid && description && (
          <FieldDescription id={helperId}>{description}</FieldDescription>
        )}
      </div>
    </Field>
  );
};

export default TextField;
