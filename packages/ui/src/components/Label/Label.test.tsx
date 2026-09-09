import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Label from '@tod-workspace/ui/components/Label';

describe('Label', () => {
  it('is the accessible name of the control it is associated with', () => {
    render(
      <>
        <Label htmlFor='email'>Email</Label>
        <input id='email' type='text' />
      </>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('is the accessible name of a control nested inside it', () => {
    render(
      <Label>
        Email
        <input type='text' />
      </Label>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('moves focus to its associated control when clicked', async () => {
    const user = userEvent.setup();

    render(
      <>
        <Label htmlFor='email'>Email</Label>
        <input id='email' type='text' />
      </>
    );

    await user.click(screen.getByText('Email'));

    expect(screen.getByLabelText('Email')).toHaveFocus();
  });

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
