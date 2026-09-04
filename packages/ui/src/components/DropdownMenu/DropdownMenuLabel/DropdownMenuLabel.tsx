'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import { cn } from '@tod-workspace/ui/lib/utils';

export interface DropdownMenuLabelProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Label
> {
  inset?: boolean;
}

const DropdownMenuLabel = ({
  className,
  inset,
  ...props
}: DropdownMenuLabelProps) => {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7',
        className
      )}
      data-inset={inset}
      data-slot='dropdown-menu-label'
      {...props}
    />
  );
};

export default DropdownMenuLabel;
