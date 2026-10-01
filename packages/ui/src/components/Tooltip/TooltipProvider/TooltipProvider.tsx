'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TooltipProviderProps extends ComponentProps<
  typeof TooltipPrimitive.Provider
> {}

const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    />
  );
};

export default TooltipProvider;
