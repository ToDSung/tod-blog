'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuTriggerProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Trigger
> {}

const DropdownMenuTrigger = ({ ...props }: DropdownMenuTriggerProps) => {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot='dropdown-menu-trigger'
      {...props}
    />
  );
};

export default DropdownMenuTrigger;
