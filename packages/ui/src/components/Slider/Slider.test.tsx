import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Slider from '@tod-workspace/ui/components/Slider';

const thumbs = () => screen.getAllByRole('slider');

const partOf = (slot: string) =>
  document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);

describe('Slider', () => {
  it('renders one thumb per value of a range', () => {
    render(<Slider aria-label='Price' defaultValue={[25, 75]} />);

    expect(thumbs()).toHaveLength(2);
  });

  it('renders a single thumb when neither value nor defaultValue is given', () => {
    render(<Slider aria-label='Volume' />);

    expect(thumbs()).toHaveLength(1);
  });

  it('raises the value with the arrow keys', async () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} />);

    await userEvent.tab();
    expect(thumbs()[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '51');
  });

  it('renders one thumb per controlled value and stays at it', async () => {
    render(<Slider aria-label='Price' value={[25, 75]} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()).toHaveLength(2);
    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '25');
  });

  it('clips the track and keeps the thumb white', () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} />);

    expect(partOf('slider-track')).toHaveClass('overflow-hidden');
    expect(thumbs()[0]).toHaveClass('bg-white');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Slider
        aria-label='Volume'
        className='custom-class'
        defaultValue={[50]}
      />
    );

    expect(partOf('slider')).toHaveClass('custom-class', 'relative');
  });
});
