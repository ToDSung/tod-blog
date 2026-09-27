'use client';

import { cn } from 'cn';
import { Tabs as TabsPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {}

const Tabs = ({ className, ...props }: TabsProps) => {
  return (
    <TabsPrimitive.Root
      className={cn(
        'group/tabs flex gap-2 data-horizontal:flex-col',
        className
      )}
      data-slot='tabs'
      {...props}
    />
  );
};

export default Tabs;
