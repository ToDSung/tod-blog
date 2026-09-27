import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@tod-workspace/ui/components/Accordion';

const renderAccordion = () =>
  render(
    <Accordion className='accordion-class' collapsible type='single'>
      <AccordionItem className='item-class' value='shipping'>
        <AccordionTrigger className='trigger-class'>Shipping</AccordionTrigger>
        <AccordionContent className='content-class'>
          Ships in two days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='returns'>
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Returns within 30 days.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );

describe('Accordion', () => {
  it('expands the item whose trigger is clicked', async () => {
    renderAccordion();
    const shipping = screen.getByRole('button', { name: 'Shipping' });

    await userEvent.click(shipping);

    expect(shipping).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Ships in two days.')).toBeVisible();
  });

  it('swaps the down chevron for the up chevron while expanded', () => {
    renderAccordion();
    const [down, up] = screen
      .getByRole('button', { name: 'Shipping' })
      .querySelectorAll('[data-slot="accordion-trigger-icon"]');

    expect(down).toHaveClass(
      'lucide-chevron-down',
      'group-aria-expanded/accordion-trigger:hidden'
    );
    expect(up).toHaveClass(
      'lucide-chevron-up',
      'hidden',
      'group-aria-expanded/accordion-trigger:inline'
    );
  });

  it('wraps each trigger in a heading', () => {
    renderAccordion();

    expect(screen.getByRole('heading', { name: 'Shipping' })).toContainElement(
      screen.getByRole('button', { name: 'Shipping' })
    );
  });

  it('applies the content className to the inner box, not the animated region', async () => {
    renderAccordion();

    await userEvent.click(screen.getByRole('button', { name: 'Shipping' }));
    const text = screen.getByText('Ships in two days.');

    expect(text).toHaveClass('content-class', 'pb-2.5');
    expect(screen.getByRole('region')).not.toHaveClass('content-class');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    renderAccordion();

    expect(document.querySelector('[data-slot="accordion"]')).toHaveClass(
      'accordion-class'
    );
    expect(document.querySelector('[data-slot="accordion-item"]')).toHaveClass(
      'item-class'
    );
    expect(screen.getByRole('button', { name: 'Shipping' })).toHaveClass(
      'trigger-class',
      'focus-visible:ring-2',
      'rounded-md'
    );
  });
});
