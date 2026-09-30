import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import Toaster, { toast } from '@tod-workspace/ui/components/Toaster';

const colorOf = (element: Element) => getComputedStyle(element).color;

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
});

describe('Toaster', () => {
  it('colors the description with the muted foreground token over sonner’s own gray', async () => {
    render(
      <>
        <Toaster />
        <span className='text-muted-foreground'>Reference</span>
      </>
    );

    act(() => {
      toast('Link copied', { description: 'Paste it anywhere.' });
    });
    const description = await screen.findByText('Paste it anywhere.');

    expect(colorOf(description)).toBe(colorOf(screen.getByText('Reference')));
  });
});
