'use client';

import { cn } from 'cn';
import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogTitleProps extends ComponentProps<
  typeof DialogPrimitive.Title
> {}

const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      className={cn('text-base leading-none font-medium', className)}
      data-slot='dialog-title'
      {...props}
    />
  );
};

export default DialogTitle;
