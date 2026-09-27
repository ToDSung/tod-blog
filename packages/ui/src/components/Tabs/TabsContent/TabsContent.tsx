'use client';

import { cn } from 'cn';
import { Tabs as TabsPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TabsContentProps extends ComponentProps<
  typeof TabsPrimitive.Content
> {}

const TabsContent = ({ className, ...props }: TabsContentProps) => {
  return (
    <TabsPrimitive.Content
      className={cn('flex-1 text-sm outline-none', className)}
      data-slot='tabs-content'
      {...props}
    />
  );
};

export default TabsContent;
