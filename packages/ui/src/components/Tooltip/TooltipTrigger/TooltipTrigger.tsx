'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TooltipTriggerProps extends ComponentProps<
  typeof TooltipPrimitive.Trigger
> {}

const TooltipTrigger = ({ ...props }: TooltipTriggerProps) => {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />;
};

export default TooltipTrigger;
