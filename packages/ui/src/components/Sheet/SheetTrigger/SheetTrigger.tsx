'use client';

import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetTriggerProps extends ComponentProps<
  typeof SheetPrimitive.Trigger
> {}

const SheetTrigger = ({ ...props }: SheetTriggerProps) => {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />;
};

export default SheetTrigger;
