'use client';

import { cn } from 'cn';
import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface ScrollBarProps extends ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {}

const ScrollBar = ({
  className,
  orientation = 'vertical',
  ...props
}: ScrollBarProps) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={cn(
        'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
        className
      )}
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className='relative flex-1 rounded-full bg-border'
        data-slot='scroll-area-thumb'
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
};

export default ScrollBar;
