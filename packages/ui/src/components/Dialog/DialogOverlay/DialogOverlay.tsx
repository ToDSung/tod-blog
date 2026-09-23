'use client';

import { cn } from 'cn';
import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogOverlayProps extends ComponentProps<
  typeof DialogPrimitive.Overlay
> {}

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      data-slot='dialog-overlay'
      {...props}
    />
  );
};

export default DialogOverlay;
