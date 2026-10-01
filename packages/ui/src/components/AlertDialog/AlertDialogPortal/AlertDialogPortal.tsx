'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AlertDialogPortalProps extends ComponentProps<
  typeof AlertDialogPrimitive.Portal
> {}

const AlertDialogPortal = ({ ...props }: AlertDialogPortalProps) => {
  return (
    <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
  );
};

export default AlertDialogPortal;
