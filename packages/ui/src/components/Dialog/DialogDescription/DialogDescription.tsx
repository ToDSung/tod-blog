'use client';

import { cn } from 'cn';
import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogDescriptionProps extends ComponentProps<
  typeof DialogPrimitive.Description
> {}

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className
      )}
      data-slot='dialog-description'
      {...props}
    />
  );
};

export default DialogDescription;
