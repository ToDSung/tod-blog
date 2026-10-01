'use client';

import { Popover as PopoverPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface PopoverTriggerProps extends ComponentProps<
  typeof PopoverPrimitive.Trigger
> {}

const PopoverTrigger = ({ ...props }: PopoverTriggerProps) => {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />;
};

export default PopoverTrigger;
