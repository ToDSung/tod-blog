'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogTriggerProps extends ComponentProps<
  typeof AlertDialogPrimitive.Trigger
> {}

const AlertDialogTrigger = ({ ...props }: AlertDialogTriggerProps) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
  );
};

export default AlertDialogTrigger;
