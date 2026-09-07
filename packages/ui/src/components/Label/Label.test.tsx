import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Label from '@tod-workspace/ui/components/Label';

describe('Label', () => {
  it('suppresses the text selection a double click would otherwise make', () => {
    render(<Label htmlFor='email'>Email</Label>);
    const label = screen.getByText('Email');

    const firstClick = createEvent.mouseDown(label, { detail: 1 });
    fireEvent(label, firstClick);
    expect(firstClick.defaultPrevented).toBe(false);

    const secondClick = createEvent.mouseDown(label, { detail: 2 });
    fireEvent(label, secondClick);
    expect(secondClick.defaultPrevented).toBe(true);
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Label className='custom-class' htmlFor='email'>
        Email
      </Label>
    );

    const label = screen.getByText('Email');
    expect(label).toHaveClass('custom-class');
    expect(label).toHaveClass('text-sm');
  });
});
