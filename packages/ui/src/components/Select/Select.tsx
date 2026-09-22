'use client';

import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectProps extends ComponentProps<
  typeof SelectPrimitive.Root
> {}

const Select = ({ ...props }: SelectProps) => {
  return <SelectPrimitive.Root data-slot='select' {...props} />;
};

export default Select;
