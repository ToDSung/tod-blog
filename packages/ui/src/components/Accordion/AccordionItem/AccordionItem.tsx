'use client';

import { cn } from 'cn';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AccordionItemProps extends ComponentProps<
  typeof AccordionPrimitive.Item
> {}

const AccordionItem = ({ className, ...props }: AccordionItemProps) => {
  return (
    <AccordionPrimitive.Item
      className={cn('not-last:border-b', className)}
      data-slot='accordion-item'
      {...props}
    />
  );
};

export default AccordionItem;
