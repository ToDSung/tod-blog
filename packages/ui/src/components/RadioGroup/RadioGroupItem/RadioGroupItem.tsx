'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const radioGroupItemVariants = cva(
  'group/radio-group-item peer relative flex aspect-square shrink-0 rounded-full border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary group-has-[:focus-visible]/field-label:data-checked:border-primary',
  {
    variants: {
      size: {
        sm: 'size-3.5 [&_[data-slot=radio-group-dot]]:size-1.5',
        md: 'size-4 [&_[data-slot=radio-group-dot]]:size-2',
        lg: 'size-5 [&_[data-slot=radio-group-dot]]:size-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface RadioGroupItemProps
  extends
    ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = ({
  className,
  size = 'md',
  ...props
}: RadioGroupItemProps) => {
  return (
    <RadioGroupPrimitive.Item
      className={cn(radioGroupItemVariants({ size, className }))}
      data-size={size}
      data-slot='radio-group-item'
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className='flex size-full items-center justify-center'
        data-slot='radio-group-indicator'
      >
        <span className='rounded-full bg-primary' data-slot='radio-group-dot' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

export default RadioGroupItem;
