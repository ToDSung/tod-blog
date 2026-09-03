'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuSubProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Sub
> {}

const DropdownMenuSub = ({ ...props }: DropdownMenuSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />;
};

export default DropdownMenuSub;
