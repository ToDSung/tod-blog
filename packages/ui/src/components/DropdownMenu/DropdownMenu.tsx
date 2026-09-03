'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Root
> {}

const DropdownMenu = ({ ...props }: DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />;
};

export default DropdownMenu;
