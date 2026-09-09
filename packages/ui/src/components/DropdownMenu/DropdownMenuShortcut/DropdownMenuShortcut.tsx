'use client';

import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface DropdownMenuShortcutProps extends ComponentProps<'span'> {}

const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground',
        className
      )}
      data-slot='dropdown-menu-shortcut'
      {...props}
    />
  );
};

export default DropdownMenuShortcut;
