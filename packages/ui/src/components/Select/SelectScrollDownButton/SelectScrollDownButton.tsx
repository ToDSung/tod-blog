'use client';

import { cn } from 'cn';
import { ChevronDownIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SelectScrollDownButtonProps extends ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
> {}

const SelectScrollDownButton = ({
  className,
  ...props
}: SelectScrollDownButtonProps) => {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot='select-scroll-down-button'
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
};

export default SelectScrollDownButton;
