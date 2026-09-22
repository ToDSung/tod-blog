'use client';

import { cn } from 'cn';
import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectSeparatorProps extends ComponentProps<
  typeof SelectPrimitive.Separator
> {}

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => {
  return (
    <SelectPrimitive.Separator
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      data-slot='select-separator'
      {...props}
    />
  );
};

export default SelectSeparator;
