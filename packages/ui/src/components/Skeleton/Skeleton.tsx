import { cn } from 'cn';

import type { ComponentProps } from 'react';

export interface SkeletonProps extends ComponentProps<'div'> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      data-slot='skeleton'
      {...props}
    />
  );
};

export default Skeleton;
