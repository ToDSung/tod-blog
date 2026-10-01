'use client';

import { cn } from 'cn';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import DialogOverlay from '@tod-workspace/ui/components/Dialog/DialogOverlay';
import DialogPortal from '@tod-workspace/ui/components/Dialog/DialogPortal';
import IconButton from '@tod-workspace/ui/components/IconButton';

export interface DialogContentProps extends ComponentProps<
  typeof DialogPrimitive.Content
> {
  showCloseButton?: boolean;
}

const DialogContent = ({
  children,
  className,
  showCloseButton = true,
  ...props
}: DialogContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        data-slot='dialog-content'
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close asChild data-slot='dialog-close'>
            <IconButton
              aria-label='Close'
              className='absolute top-2 right-2'
              size='sm'
              variant='ghost'
            >
              <XIcon />
            </IconButton>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

export default DialogContent;
