import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface FieldErrorProps extends ComponentProps<'div'> {}

const FieldError = ({ children, className, ...props }: FieldErrorProps) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        'text-xs leading-4 font-normal text-destructive',
        className
      )}
      data-slot='field-error'
      role='alert'
      {...props}
    >
      {children}
    </div>
  );
};

export default FieldError;
