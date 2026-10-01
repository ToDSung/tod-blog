'use client';

import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectValueProps extends ComponentProps<
  typeof SelectPrimitive.Value
> {}

const SelectValue = ({ ...props }: SelectValueProps) => {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />;
};

export default SelectValue;
