import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface AlertDialogFooterProps extends ComponentProps<'div'> {}

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => {
  return (
    <div
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 border-t p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
        className
      )}
      data-slot='alert-dialog-footer'
      {...props}
    />
  );
};

export default AlertDialogFooter;
