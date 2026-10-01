'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const avatarVariants = cva(
  'group/avatar relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten',
  {
    variants: {
      size: {
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends
    ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = ({ className, size = 'md', ...props }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size, className }))}
      data-size={size}
      data-slot='avatar'
      {...props}
    />
  );
};

export default Avatar;
