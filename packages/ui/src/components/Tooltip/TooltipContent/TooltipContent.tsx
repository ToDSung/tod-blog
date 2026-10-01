'use client';

import { cn } from 'cn';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TooltipContentProps extends ComponentProps<
  typeof TooltipPrimitive.Content
> {}

const TooltipContent = ({
  children,
  className,
  sideOffset = 0,
  ...props
}: TooltipContentProps) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className={cn(
          'z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className
        )}
        data-slot='tooltip-content'
        sideOffset={sideOffset}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow
          className='z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground'
          data-slot='tooltip-arrow'
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export default TooltipContent;
