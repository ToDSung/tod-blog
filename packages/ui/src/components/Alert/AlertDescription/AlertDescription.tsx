import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface AlertDescriptionProps extends ComponentProps<'div'> {}

const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => {
  return (
    <div
      className={cn(
        'text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className
      )}
      data-slot='alert-description'
      {...props}
    />
  );
};

export default AlertDescription;
