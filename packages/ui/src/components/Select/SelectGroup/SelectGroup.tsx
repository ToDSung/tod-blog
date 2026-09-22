'use client';

import { cn } from 'cn';
import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectGroupProps extends ComponentProps<
  typeof SelectPrimitive.Group
> {}

const SelectGroup = ({ className, ...props }: SelectGroupProps) => {
  return (
    <SelectPrimitive.Group
      className={cn('scroll-my-1 p-1', className)}
      data-slot='select-group'
      {...props}
    />
  );
};

export default SelectGroup;
