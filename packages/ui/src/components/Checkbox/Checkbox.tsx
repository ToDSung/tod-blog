'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const checkboxVariants = cva(
  'group/checkbox peer relative flex shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground dark:data-[state=indeterminate]:bg-primary [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: "size-3.5 rounded-[3px] [&_svg:not([class*='size-'])]:size-3",
        md: "size-4 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "size-5 rounded-[5px] [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends
    ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = ({ className, size = 'md', ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxVariants({ size, className }))}
      data-size={size}
      data-slot='checkbox'
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className='grid place-content-center text-current transition-none'
        data-slot='checkbox-indicator'
      >
        <CheckIcon className='group-data-[state=indeterminate]/checkbox:hidden' />
        <MinusIcon className='hidden group-data-[state=indeterminate]/checkbox:block' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default Checkbox;
