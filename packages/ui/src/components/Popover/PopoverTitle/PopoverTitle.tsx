import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface PopoverTitleProps extends ComponentProps<'div'> {}

const PopoverTitle = ({ className, ...props }: PopoverTitleProps) => {
  return (
    <div
      className={cn('text-base font-medium', className)}
      data-slot='popover-title'
      {...props}
    />
  );
};

export default PopoverTitle;
