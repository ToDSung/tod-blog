'use client';

import { cn } from 'cn';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogDescriptionProps extends ComponentProps<
  typeof AlertDialogPrimitive.Description
> {}

const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogDescriptionProps) => {
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className
      )}
      data-slot='alert-dialog-description'
      {...props}
    />
  );
};

export default AlertDialogDescription;
