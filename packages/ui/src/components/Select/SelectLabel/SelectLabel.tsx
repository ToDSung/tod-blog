'use client';

import { cn } from 'cn';
import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectLabelProps extends ComponentProps<
  typeof SelectPrimitive.Label
> {}

const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
  return (
    <SelectPrimitive.Label
      className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
      data-slot='select-label'
      {...props}
    />
  );
};

export default SelectLabel;
