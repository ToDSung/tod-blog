import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardDescriptionProps extends ComponentProps<'div'> {}

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <div
      className={cn('text-sm text-muted-foreground', className)}
      data-slot='card-description'
      {...props}
    />
  );
};

export default CardDescription;
