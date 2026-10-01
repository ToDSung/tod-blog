import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardContentProps extends ComponentProps<'div'> {}

const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div
      className={cn('px-4', className)}
      data-slot='card-content'
      {...props}
    />
  );
};

export default CardContent;
