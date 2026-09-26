import { cva } from 'class-variance-authority';
import { cn } from 'cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const fieldVariants = cva(
  'group/field flex w-full data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical:
          'flex-col gap-1 *:w-full *:data-[slot=field-label]:mb-1 [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center gap-2 *:data-[slot=field-label]:flex-auto',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

export interface FieldProps
  extends ComponentProps<'div'>, VariantProps<typeof fieldVariants> {}

const Field = ({
  className,
  orientation = 'vertical',
  ...props
}: FieldProps) => {
  return (
    <div
      className={cn(fieldVariants({ orientation, className }))}
      data-orientation={orientation}
      data-slot='field'
      role='group'
      {...props}
    />
  );
};

export default Field;
