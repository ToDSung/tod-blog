'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ButtonProps } from '@tod-workspace/ui/components/Button';
import type { ComponentProps } from 'react';

import Button from '@tod-workspace/ui/components/Button';

export interface AlertDialogCancelProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Cancel>,
    Pick<ButtonProps, 'size' | 'variant'> {}

const AlertDialogCancel = ({
  size = 'md',
  variant = 'outline',
  ...props
}: AlertDialogCancelProps) => {
  return (
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Cancel data-slot='alert-dialog-cancel' {...props} />
    </Button>
  );
};

export default AlertDialogCancel;
