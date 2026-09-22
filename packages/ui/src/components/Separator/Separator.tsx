'use client';

import { cn } from 'cn';
import { Separator as SeparatorPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SeparatorProps extends ComponentProps<
  typeof SeparatorPrimitive.Root
> {}

const Separator = ({
  className,
  decorative = true,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) => {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        'shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
        className
      )}
      data-slot='separator'
      decorative={decorative}
      orientation={orientation}
      {...props}
    />
  );
};

export default Separator;
