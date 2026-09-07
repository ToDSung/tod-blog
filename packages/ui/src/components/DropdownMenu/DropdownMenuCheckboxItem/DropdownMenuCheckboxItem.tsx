'use client';

import { cn } from 'cn';
import { CheckIcon } from 'lucide-react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DropdownMenuCheckboxItemProps extends ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
> {
  inset?: boolean;
}

const DropdownMenuCheckboxItem = ({
  checked,
  children,
  className,
  inset,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-inset={inset}
      data-slot='dropdown-menu-checkbox-item'
      {...props}
    >
      <span
        className='pointer-events-none absolute right-2 flex items-center justify-center'
        data-slot='dropdown-menu-checkbox-item-indicator'
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

export default DropdownMenuCheckboxItem;
