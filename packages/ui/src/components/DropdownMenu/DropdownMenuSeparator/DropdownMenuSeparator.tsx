'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import { cn } from '@tod-workspace/ui/lib/utils';

interface DropdownMenuSeparatorProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Separator
> {}

const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      data-slot='dropdown-menu-separator'
      {...props}
    />
  );
};

export default DropdownMenuSeparator;
