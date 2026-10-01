'use client';

import { cn } from 'cn';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DropdownMenuLabelProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Label
> {}

const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
      data-slot='dropdown-menu-label'
      {...props}
    />
  );
};

export default DropdownMenuLabel;
