import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface CardHeaderProps extends ComponentProps<'div'> {}

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'grid auto-rows-min items-start gap-1 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
        className
      )}
      data-slot='card-header'
      {...props}
    />
  );
};

export default CardHeader;
