import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ScrollArea, { ScrollBar } from '@tod-workspace/ui/components/ScrollArea';

const scrollbars = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>(
      '[data-slot="scroll-area-scrollbar"]'
    )
  ).map(scrollbar => scrollbar.getAttribute('data-orientation'));

describe('ScrollArea', () => {
  it('draws the 2px focus ring on the viewport', () => {
    render(
      <ScrollArea>
        <p>Long content</p>
      </ScrollArea>
    );

    expect(
      document.querySelector('[data-slot="scroll-area-viewport"]')
    ).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-ring/50');
  });

  it('draws a vertical scrollbar by default', () => {
    render(
      <ScrollArea type='always'>
        <p>Long content</p>
      </ScrollArea>
    );

    expect(scrollbars()).toEqual(['vertical']);
  });

  it('draws a horizontal scrollbar when one is added', () => {
    render(
      <ScrollArea type='always'>
        <p>Wide content</p>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    );

    expect(scrollbars()).toEqual(
      expect.arrayContaining(['vertical', 'horizontal'])
    );
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <ScrollArea className='area-class' type='always'>
        <p>Long content</p>
        <ScrollBar className='bar-class' orientation='horizontal' />
      </ScrollArea>
    );

    expect(document.querySelector('[data-slot="scroll-area"]')).toHaveClass(
      'area-class',
      'relative'
    );
    expect(
      document.querySelector(
        '[data-slot="scroll-area-scrollbar"][data-orientation="horizontal"]'
      )
    ).toHaveClass('bar-class', 'touch-none');
  });
});
