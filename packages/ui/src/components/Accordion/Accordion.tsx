'use client';

import { cn } from 'cn';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

// An interface cannot extend the single/multiple union that Root's props are.
export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;

const Accordion = ({ className, ...props }: AccordionProps) => {
  return (
    <AccordionPrimitive.Root
      className={cn('flex w-full flex-col', className)}
      data-slot='accordion'
      {...props}
    />
  );
};

export default Accordion;
