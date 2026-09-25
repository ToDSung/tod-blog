import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface SheetFooterProps extends ComponentProps<'div'> {}

const SheetFooter = ({ className, ...props }: SheetFooterProps) => {
  return (
    <div
      className={cn('mt-auto flex gap-2 border-t p-4 *:flex-1', className)}
      data-slot='sheet-footer'
      {...props}
    />
  );
};

export default SheetFooter;
