import { cva } from 'class-variance-authority';
import { cn } from 'cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const inputVariants = cva(
  'w-full min-w-0 rounded-lg border border-input bg-transparent py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground read-only:cursor-default read-only:bg-muted focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:read-only:bg-input/50 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      size: {
        sm: 'h-7 rounded-[min(var(--radius-md),12px)] px-2 md:text-[0.8rem]',
        md: 'h-8 px-2.5 md:text-sm',
        lg: 'h-9 px-2.5 md:text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputProps
  extends
    Omit<ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = ({ className, size = 'md', ...props }: InputProps) => {
  return (
    <input
      className={cn(inputVariants({ size, className }))}
      data-size={size}
      data-slot='input'
      {...props}
    />
  );
};

export default Input;
