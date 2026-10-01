'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogProps extends ComponentProps<
  typeof AlertDialogPrimitive.Root
> {}

const AlertDialog = ({ ...props }: AlertDialogProps) => {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />;
};

export default AlertDialog;
