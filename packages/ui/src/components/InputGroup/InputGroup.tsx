import { cva } from 'class-variance-authority';
import { cn } from 'cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const inputGroupVariants = cva(
  'group/input-group relative flex w-full min-w-45 items-center rounded-lg border border-input transition-colors outline-none has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-2 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2',
  {
    variants: {
      size: {
        sm: 'h-7 rounded-[min(var(--radius-md),12px)]',
        md: 'h-8',
        lg: 'h-9',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface InputGroupProps
  extends ComponentProps<'div'>, VariantProps<typeof inputGroupVariants> {}

const InputGroup = ({ className, size = 'md', ...props }: InputGroupProps) => {
  return (
    <div
      className={cn(inputGroupVariants({ size, className }))}
      data-size={size}
      data-slot='input-group'
      role='group'
      {...props}
    />
  );
};

export default InputGroup;
