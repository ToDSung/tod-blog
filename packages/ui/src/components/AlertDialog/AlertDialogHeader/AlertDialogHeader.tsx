import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface AlertDialogHeaderProps extends ComponentProps<'div'> {}

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      data-slot='alert-dialog-header'
      {...props}
    />
  );
};

export default AlertDialogHeader;
