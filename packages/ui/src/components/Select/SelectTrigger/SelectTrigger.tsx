'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { ChevronDownIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const selectTriggerVariants = cva(
  "flex w-fit min-w-45 items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        sm: 'h-7 rounded-[min(var(--radius-md),12px)] text-[0.8rem]',
        md: 'h-8 text-sm',
        lg: 'h-9 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SelectTriggerProps
  extends
    ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = ({
  children,
  className,
  size = 'md',
  ...props
}: SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(selectTriggerVariants({ size, className }))}
      data-size={size}
      data-slot='select-trigger'
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className='pointer-events-none size-4 text-muted-foreground' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

export default SelectTrigger;
