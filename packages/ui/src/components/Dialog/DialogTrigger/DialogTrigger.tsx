'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface DialogTriggerProps extends ComponentProps<
  typeof DialogPrimitive.Trigger
> {}

const DialogTrigger = ({ ...props }: DialogTriggerProps) => {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
};

export default DialogTrigger;
