'use client';

import { cn } from 'cn';
import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetTitleProps extends ComponentProps<
  typeof SheetPrimitive.Title
> {}

const SheetTitle = ({ className, ...props }: SheetTitleProps) => {
  return (
    <SheetPrimitive.Title
      className={cn('text-base font-medium text-foreground', className)}
      data-slot='sheet-title'
      {...props}
    />
  );
};

export default SheetTitle;
