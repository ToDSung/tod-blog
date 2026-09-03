'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuPortalProps extends ComponentProps<
  typeof DropdownMenuPrimitive.Portal
> {}

const DropdownMenuPortal = ({ ...props }: DropdownMenuPortalProps) => {
  return (
    <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
  );
};

export default DropdownMenuPortal;
