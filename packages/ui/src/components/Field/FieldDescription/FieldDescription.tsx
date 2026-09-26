import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface FieldDescriptionProps extends ComponentProps<'p'> {}

const FieldDescription = ({ className, ...props }: FieldDescriptionProps) => {
  return (
    <p
      className={cn(
        'text-left text-xs leading-4 font-normal text-muted-foreground group-has-data-horizontal/field:text-balance',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className
      )}
      data-slot='field-description'
      {...props}
    />
  );
};

export default FieldDescription;
