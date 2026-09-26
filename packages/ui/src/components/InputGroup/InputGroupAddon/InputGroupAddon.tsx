'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps, MouseEvent } from 'react';

export const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 group-data-[size=sm]/input-group:[&>svg:not([class*='size-'])]:size-3 group-data-[size=lg]/input-group:[&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start':
          'order-first pl-2.5 group-data-[size=sm]/input-group:pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]',
        'inline-end':
          'order-last pr-2.5 group-data-[size=sm]/input-group:pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  }
);

export interface InputGroupAddonProps
  extends ComponentProps<'div'>, VariantProps<typeof inputGroupAddonVariants> {}

const InputGroupAddon = ({
  align = 'inline-start',
  className,
  onClick,
  ...props
}: InputGroupAddonProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    event.currentTarget.parentElement?.querySelector('input')?.focus();
  };

  return (
    <div
      className={cn(inputGroupAddonVariants({ align, className }))}
      data-align={align}
      data-slot='input-group-addon'
      onClick={handleClick}
      {...props}
    />
  );
};

export default InputGroupAddon;
