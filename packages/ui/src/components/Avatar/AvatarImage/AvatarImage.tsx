'use client';

import { cn } from 'cn';
import { Avatar as AvatarPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AvatarImageProps extends ComponentProps<
  typeof AvatarPrimitive.Image
> {}

const AvatarImage = ({ className, ...props }: AvatarImageProps) => {
  return (
    <AvatarPrimitive.Image
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className
      )}
      data-slot='avatar-image'
      {...props}
    />
  );
};

export default AvatarImage;
