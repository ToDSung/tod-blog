'use client';

import { cn } from 'cn';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AccordionContentProps extends ComponentProps<
  typeof AccordionPrimitive.Content
> {}

const AccordionContent = ({
  children,
  className,
  ...props
}: AccordionContentProps) => {
  return (
    <AccordionPrimitive.Content
      className='overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up'
      data-slot='accordion-content'
      {...props}
    >
      <div
        className={cn(
          'h-(--radix-accordion-content-height) pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
};

export default AccordionContent;
