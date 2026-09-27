import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardTitleProps extends ComponentProps<'div'> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <div
      className={cn('text-base leading-snug font-medium', className)}
      data-slot='card-title'
      {...props}
    />
  );
};

export default CardTitle;
