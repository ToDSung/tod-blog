'use client';

import { cn } from 'cn';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AvatarFallbackProps extends ComponentProps<
  typeof AvatarPrimitive.Fallback
> {}

const AvatarFallback = ({ className, ...props }: AvatarFallbackProps) => {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
        className
      )}
      data-slot='avatar-fallback'
      {...props}
    />
  );
};

export default AvatarFallback;
