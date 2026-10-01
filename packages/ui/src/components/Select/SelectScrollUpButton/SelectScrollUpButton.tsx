'use client';

import { cn } from 'cn';
import { ChevronUpIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectScrollUpButtonProps extends ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
> {}

const SelectScrollUpButton = ({
  className,
  ...props
}: SelectScrollUpButtonProps) => {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot='select-scroll-up-button'
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
};

export default SelectScrollUpButton;
