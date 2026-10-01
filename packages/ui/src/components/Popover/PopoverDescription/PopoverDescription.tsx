import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface PopoverDescriptionProps extends ComponentProps<'p'> {}

const PopoverDescription = ({
  className,
  ...props
}: PopoverDescriptionProps) => {
  return (
    <p
      className={cn('text-muted-foreground', className)}
      data-slot='popover-description'
      {...props}
    />
  );
};

export default PopoverDescription;
