'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuGroupProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Group
> {}

const DropdownMenuGroup = ({ ...props }: DropdownMenuGroupProps) => {
  return (
    <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
  );
};

export default DropdownMenuGroup;
