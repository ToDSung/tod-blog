import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface SheetHeaderProps extends ComponentProps<'div'> {}

const SheetHeader = ({ className, ...props }: SheetHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col gap-0.5 p-4', className)}
      data-slot='sheet-header'
      {...props}
    />
  );
};

export default SheetHeader;
