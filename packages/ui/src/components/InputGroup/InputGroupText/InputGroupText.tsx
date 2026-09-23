import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface InputGroupTextProps extends ComponentProps<'span'> {}

const InputGroupText = ({ className, ...props }: InputGroupTextProps) => {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 group-data-[size=sm]/input-group:[&_svg:not([class*='size-'])]:size-3 group-data-[size=lg]/input-group:[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      data-slot='input-group-text'
      {...props}
    />
  );
};

export default InputGroupText;
