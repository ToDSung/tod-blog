import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardFooterProps extends ComponentProps<'div'> {}

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('flex items-center gap-2 border-t p-4', className)}
      data-slot='card-footer'
      {...props}
    />
  );
};

export default CardFooter;
