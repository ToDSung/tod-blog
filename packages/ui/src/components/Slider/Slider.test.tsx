import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Slider from '@tod-workspace/ui/components/Slider';

const thumbs = () => screen.getAllByRole('slider');

describe('Slider', () => {
  it('renders one thumb for a single value', () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} />);

    expect(thumbs()).toHaveLength(1);
  });

  it('renders one thumb per value of a range', () => {
    render(<Slider aria-label='Price' defaultValue={[25, 75]} />);

    expect(thumbs()).toHaveLength(2);
  });

  it('renders a single thumb when neither value nor defaultValue is given', () => {
    render(<Slider aria-label='Volume' />);

    expect(thumbs()).toHaveLength(1);
  });

  it('exposes the value and the bounds on the thumb', () => {
    render(
      <Slider aria-label='Volume' defaultValue={[50]} max={200} min={10} />
    );

    const [thumb] = thumbs();
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
    expect(thumb).toHaveAttribute('aria-valuemin', '10');
    expect(thumb).toHaveAttribute('aria-valuemax', '200');
  });

  it('defaults the bounds to 0 and 100', () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} />);

    const [thumb] = thumbs();
    expect(thumb).toHaveAttribute('aria-valuemin', '0');
    expect(thumb).toHaveAttribute('aria-valuemax', '100');
  });

  it('raises the value with the arrow keys', async () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} />);

    await userEvent.tab();
    expect(thumbs()[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '51');
  });

  it('moves by the step size', async () => {
    render(<Slider aria-label='Volume' defaultValue={[40]} step={20} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '60');
  });

  it('stops at the maximum', async () => {
    render(<Slider aria-label='Volume' defaultValue={[100]} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '100');
  });

  it('reports the new value through onValueChange', async () => {
    const onValueChange = vi.fn();
    render(
      <Slider
        aria-label='Volume'
        defaultValue={[50]}
        onValueChange={onValueChange}
      />
    );

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(onValueChange).toHaveBeenCalledExactlyOnceWith([51]);
  });

  it('stays at the value the caller controls', async () => {
    render(<Slider aria-label='Volume' value={[50]} />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '50');
  });

  it('does not move while disabled', async () => {
    render(<Slider aria-label='Volume' defaultValue={[50]} disabled />);

    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');

    expect(thumbs()[0]).toHaveAttribute('aria-valuenow', '50');
  });

  it('marks the orientation on the root', () => {
    const { rerender } = render(
      <Slider aria-label='Volume' defaultValue={[50]} />
    );

    expect(thumbs()[0]).toHaveAttribute('aria-orientation', 'horizontal');

    rerender(
      <Slider aria-label='Volume' defaultValue={[50]} orientation='vertical' />
    );

    expect(thumbs()[0]).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Slider
        aria-label='Volume'
        className='custom-class'
        defaultValue={[50]}
      />
    );

    const root = thumbs()[0].closest('[data-slot="slider"]');
    expect(root).toHaveClass('custom-class');
    expect(root).toHaveClass('relative');
  });
});
