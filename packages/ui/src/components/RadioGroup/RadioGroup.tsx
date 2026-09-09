'use client';

import { cn } from 'cn';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface RadioGroupProps extends ComponentProps<
  typeof RadioGroupPrimitive.Root
> {}

const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid w-full gap-2', className)}
      data-slot='radio-group'
      {...props}
    />
  );
};

export default RadioGroup;
