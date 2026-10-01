'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogProps extends ComponentProps<
  typeof DialogPrimitive.Root
> {}

const Dialog = ({ ...props }: DialogProps) => {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
};

export default Dialog;
