'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogCloseProps extends ComponentProps<
  typeof DialogPrimitive.Close
> {}

const DialogClose = ({ ...props }: DialogCloseProps) => {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
};

export default DialogClose;
