import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface AlertTitleProps extends ComponentProps<'div'> {}

const AlertTitle = ({ className, ...props }: AlertTitleProps) => {
  return (
    <div
      className={cn(
        'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
        className
      )}
      data-slot='alert-title'
      {...props}
    />
  );
};

export default AlertTitle;
