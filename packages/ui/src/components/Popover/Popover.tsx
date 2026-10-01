'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface PopoverProps extends ComponentProps<
  typeof PopoverPrimitive.Root
> {}

const Popover = ({ ...props }: PopoverProps) => {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />;
};

export default Popover;
