'use client';

import { cn } from 'cn';
import { Popover as PopoverPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface PopoverContentProps extends ComponentProps<
  typeof PopoverPrimitive.Content
> {}

const PopoverContent = ({
  align = 'center',
  className,
  sideOffset = 4,
  ...props
}: PopoverContentProps) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          'z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        data-slot='popover-content'
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

export default PopoverContent;
