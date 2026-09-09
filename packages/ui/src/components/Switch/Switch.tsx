'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { Switch as SwitchPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const switchVariants = cva(
  'group/switch peer relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-[14px] w-[24px] [&_[data-slot=switch-thumb]]:size-3',
        md: 'h-[18.4px] w-[32px] [&_[data-slot=switch-thumb]]:size-4',
        lg: 'h-[23px] w-[40px] [&_[data-slot=switch-thumb]]:size-5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends
    ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = ({ className, size = 'md', ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={cn(switchVariants({ size, className }))}
      data-size={size}
      data-slot='switch'
      {...props}
    >
      <SwitchPrimitive.Thumb
        className='pointer-events-none block rounded-full bg-background ring-0 transition-transform dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0'
        data-slot='switch-thumb'
      />
    </SwitchPrimitive.Root>
  );
};

export default Switch;
