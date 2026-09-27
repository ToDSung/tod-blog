'use client';

import { cn } from 'cn';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface AccordionTriggerProps extends ComponentProps<
  typeof AccordionPrimitive.Trigger
> {}

const AccordionTrigger = ({
  children,
  className,
  ...props
}: AccordionTriggerProps) => {
  return (
    <AccordionPrimitive.Header className='flex'>
      <AccordionPrimitive.Trigger
        className={cn(
          'group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        data-slot='accordion-trigger'
        {...props}
      >
        {children}
        <ChevronDownIcon
          className='pointer-events-none ml-auto size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden'
          data-slot='accordion-trigger-icon'
        />
        <ChevronUpIcon
          className='pointer-events-none ml-auto hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline'
          data-slot='accordion-trigger-icon'
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export default AccordionTrigger;
