'use client';

import { cn } from 'cn';
import { ChevronRightIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DropdownMenuSubTriggerProps extends ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> {
  inset?: boolean;
}

const DropdownMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: DropdownMenuSubTriggerProps) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-inset={inset}
      data-slot='dropdown-menu-sub-trigger'
      {...props}
    >
      {children}
      <ChevronRightIcon className='ml-auto' />
    </DropdownMenuPrimitive.SubTrigger>
  );
};

export default DropdownMenuSubTrigger;
