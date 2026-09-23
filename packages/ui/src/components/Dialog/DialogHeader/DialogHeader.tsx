import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface DialogHeaderProps extends ComponentProps<'div'> {}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col gap-2', className)}
      data-slot='dialog-header'
      {...props}
    />
  );
};

export default DialogHeader;
