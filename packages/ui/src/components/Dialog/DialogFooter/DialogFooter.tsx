'use client';

import { cn } from 'cn';
import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import Button from '@tod-workspace/ui/components/Button';

export interface DialogFooterProps extends ComponentProps<'div'> {
  showCloseButton?: boolean;
}

const DialogFooter = ({
  children,
  className,
  showCloseButton = false,
  ...props
}: DialogFooterProps) => {
  return (
    <div
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end',
        className
      )}
      data-slot='dialog-footer'
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant='outline'>Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
};

export default DialogFooter;
