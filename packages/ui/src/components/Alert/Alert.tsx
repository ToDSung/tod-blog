import { cva } from 'class-variance-authority';
import { cn } from 'cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg px-2.5 py-2 text-left text-sm ring-1 ring-foreground/10 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground',
        destructive:
          'bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends ComponentProps<'div'>, VariantProps<typeof alertVariants> {}

const Alert = ({ className, variant = 'default', ...props }: AlertProps) => {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot='alert'
      data-variant={variant}
      role='alert'
      {...props}
    />
  );
};

export default Alert;
