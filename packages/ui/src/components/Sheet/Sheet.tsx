'use client';

import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetProps extends ComponentProps<
  typeof SheetPrimitive.Root
> {}

const Sheet = ({ ...props }: SheetProps) => {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />;
};

export default Sheet;
