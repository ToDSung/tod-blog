import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardActionProps extends ComponentProps<'div'> {}

const CardAction = ({ className, ...props }: CardActionProps) => {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      data-slot='card-action'
      {...props}
    />
  );
};

export default CardAction;
