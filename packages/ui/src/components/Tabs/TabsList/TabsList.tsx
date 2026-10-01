'use client';

import { cva } from 'class-variance-authority';
import { cn } from 'cn';
import { Tabs as TabsPrimitive } from 'radix-ui';

import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

export const tabsListVariants = cva(
  'group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TabsListProps
  extends
    ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = ({
  className,
  variant = 'default',
  ...props
}: TabsListProps) => {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot='tabs-list'
      data-variant={variant}
      {...props}
    />
  );
};

export default TabsList;
