import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface AlertDialogHeaderProps extends ComponentProps<'div'> {}

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => {
  return (
    <div
      className={cn(
        'grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center sm:group-data-[size=md]/alert-dialog-content:place-items-start sm:group-data-[size=md]/alert-dialog-content:text-left',
        className
      )}
      data-slot='alert-dialog-header'
      {...props}
    />
  );
};

export default AlertDialogHeader;
