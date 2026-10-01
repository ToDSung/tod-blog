import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface PopoverHeaderProps extends ComponentProps<'div'> {}

const PopoverHeader = ({ className, ...props }: PopoverHeaderProps) => {
  return (
    <div
      className={cn('flex flex-col gap-1', className)}
      data-slot='popover-header'
      {...props}
    />
  );
};

export default PopoverHeader;
