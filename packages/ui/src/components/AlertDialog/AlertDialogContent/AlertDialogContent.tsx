'use client';

import { cn } from 'cn';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import AlertDialogOverlay from '@tod-workspace/ui/components/AlertDialog/AlertDialogOverlay';
import AlertDialogPortal from '@tod-workspace/ui/components/AlertDialog/AlertDialogPortal';

export interface AlertDialogContentProps extends ComponentProps<
  typeof AlertDialogPrimitive.Content
> {
  size?: 'sm' | 'md';
}

const AlertDialogContent = ({
  className,
  size = 'md',
  ...props
}: AlertDialogContentProps) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        className={cn(
          'group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 outline-none data-[size=md]:max-w-xs data-[size=sm]:max-w-xs data-[size=md]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        data-size={size}
        data-slot='alert-dialog-content'
        {...props}
      />
    </AlertDialogPortal>
  );
};

export default AlertDialogContent;
