'use client';

import { cn } from 'cn';
import { Progress as ProgressPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

// The indicator offset assumes Radix's default max of 100.
export interface ProgressProps extends Omit<
  ComponentProps<typeof ProgressPrimitive.Root>,
  'max'
> {}

const Progress = ({ className, value, ...props }: ProgressProps) => {
  return (
    <ProgressPrimitive.Root
      className={cn(
        'relative flex h-1 w-full items-center overflow-hidden rounded-full bg-muted',
        className
      )}
      data-slot='progress'
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className='size-full flex-1 bg-primary transition-transform'
        data-slot='progress-indicator'
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
};

export default Progress;
