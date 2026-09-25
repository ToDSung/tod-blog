'use client';

import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetCloseProps extends ComponentProps<
  typeof SheetPrimitive.Close
> {}

const SheetClose = ({ ...props }: SheetCloseProps) => {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />;
};

export default SheetClose;
