'use client';

import { Dialog as SheetPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SheetPortalProps extends ComponentProps<
  typeof SheetPrimitive.Portal
> {}

const SheetPortal = ({ ...props }: SheetPortalProps) => {
  return <SheetPrimitive.Portal data-slot='sheet-portal' {...props} />;
};

export default SheetPortal;
