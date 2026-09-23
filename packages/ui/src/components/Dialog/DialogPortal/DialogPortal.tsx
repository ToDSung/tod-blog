'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogPortalProps extends ComponentProps<
  typeof DialogPrimitive.Portal
> {}

const DialogPortal = ({ ...props }: DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
};

export default DialogPortal;
