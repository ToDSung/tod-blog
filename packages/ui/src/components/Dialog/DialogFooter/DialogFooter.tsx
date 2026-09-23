import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface DialogFooterProps extends ComponentProps<'div'> {}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  return (
    <div
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 border-t p-4 sm:flex-row sm:justify-end',
        className
      )}
      data-slot='dialog-footer'
      {...props}
    />
  );
};

export default DialogFooter;
