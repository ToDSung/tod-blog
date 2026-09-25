'use client';

import { cn } from 'cn';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogOverlayProps extends ComponentProps<
  typeof AlertDialogPrimitive.Overlay
> {}

const AlertDialogOverlay = ({
  className,
  ...props
}: AlertDialogOverlayProps) => {
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      data-slot='alert-dialog-overlay'
      {...props}
    />
  );
};

export default AlertDialogOverlay;
