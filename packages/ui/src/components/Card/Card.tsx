import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardProps extends ComponentProps<'div'> {}

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0',
        className
      )}
      data-slot='card'
      {...props}
    />
  );
};

export default Card;
