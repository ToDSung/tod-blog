'use client';

import { cn } from 'cn';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

import ScrollBar from '@tod-workspace/ui/components/ScrollArea/ScrollBar';

export interface ScrollAreaProps extends ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {}

const ScrollArea = ({ children, className, ...props }: ScrollAreaProps) => {
  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative', className)}
      data-slot='scroll-area'
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className='size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-ring/50'
        data-slot='scroll-area-viewport'
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
};

export default ScrollArea;
