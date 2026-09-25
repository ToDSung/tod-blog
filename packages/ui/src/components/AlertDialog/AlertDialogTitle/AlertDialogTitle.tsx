'use client';

import { cn } from 'cn';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogTitleProps extends ComponentProps<
  typeof AlertDialogPrimitive.Title
> {}

const AlertDialogTitle = ({ className, ...props }: AlertDialogTitleProps) => {
  return (
    <AlertDialogPrimitive.Title
      className={cn('text-base font-medium', className)}
      data-slot='alert-dialog-title'
      {...props}
    />
  );
};

export default AlertDialogTitle;
