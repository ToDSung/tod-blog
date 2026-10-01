'use client';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ButtonProps } from '@tod-workspace/ui/components/Button';
import type { ComponentProps } from 'react';

import Button from '@tod-workspace/ui/components/Button';

export interface AlertDialogActionProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Action>,
    Pick<ButtonProps, 'size' | 'variant'> {}

const AlertDialogAction = ({
  size = 'md',
  variant = 'default',
  ...props
}: AlertDialogActionProps) => {
  return (
    <Button asChild size={size} variant={variant}>
      <AlertDialogPrimitive.Action data-slot='alert-dialog-action' {...props} />
    </Button>
  );
};

export default AlertDialogAction;
