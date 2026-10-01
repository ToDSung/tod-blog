'use client';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TooltipProps extends ComponentProps<
  typeof TooltipPrimitive.Root
> {}

const Tooltip = ({ ...props }: TooltipProps) => {
  return <TooltipPrimitive.Root data-slot='tooltip' {...props} />;
};

export default Tooltip;
