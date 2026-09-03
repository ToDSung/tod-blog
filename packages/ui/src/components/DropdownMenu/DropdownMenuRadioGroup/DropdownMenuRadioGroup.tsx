'use client';

import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

interface DropdownMenuRadioGroupProps extends ComponentProps<
  typeof DropdownMenuPrimitive.RadioGroup
> {}

const DropdownMenuRadioGroup = ({ ...props }: DropdownMenuRadioGroupProps) => {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot='dropdown-menu-radio-group'
      {...props}
    />
  );
};

export default DropdownMenuRadioGroup;
