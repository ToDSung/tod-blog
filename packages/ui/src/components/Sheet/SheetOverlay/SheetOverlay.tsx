'use client';

import { cn } from 'cn';
import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetOverlayProps extends ComponentProps<
  typeof SheetPrimitive.Overlay
> {}

const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      data-slot='sheet-overlay'
      {...props}
    />
  );
};

export default SheetOverlay;
