'use client';

import { cn } from 'cn';
import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetDescriptionProps extends ComponentProps<
  typeof SheetPrimitive.Description
> {}

const SheetDescription = ({ className, ...props }: SheetDescriptionProps) => {
  return (
    <SheetPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      data-slot='sheet-description'
      {...props}
    />
  );
};

export default SheetDescription;
