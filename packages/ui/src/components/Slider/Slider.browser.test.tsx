import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { SliderProps } from '@tod-workspace/ui/components/Slider';

import Slider from '@tod-workspace/ui/components/Slider';

const renderSlider = (props: SliderProps) =>
  render(
    <div className='w-[200px]'>
      <Slider aria-label='Volume' {...props} />
    </div>
  );

const rootOf = () =>
  document.querySelector<HTMLElement>('[data-slot="slider"]')!;

const partOf = (slot: string) =>
  document.querySelector<HTMLElement>(`[data-slot="slider-${slot}"]`)!;

const rectOf = (slot: string) => partOf(slot).getBoundingClientRect();

describe('Slider', () => {
  it('fills the track up to the value', () => {
    renderSlider({ defaultValue: [25] });

    expect(rectOf('range').width / rectOf('track').width).toBeCloseTo(0.25, 2);
  });

  it('fills only the span between the two values of a range', () => {
    renderSlider({ defaultValue: [25, 75] });

    const track = rectOf('track');
    const range = rectOf('range');

    expect(range.width / track.width).toBeCloseTo(0.5, 2);
    expect((range.left - track.left) / track.width).toBeCloseTo(0.25, 2);
  });

  it('places the thumb at the value', () => {
    renderSlider({ defaultValue: [75] });

    const track = rectOf('track');
    const thumb = screen.getByRole('slider').getBoundingClientRect();

    expect(
      (thumb.left + thumb.width / 2 - track.left) / track.width
    ).toBeCloseTo(0.75, 1);
  });

  it('contrasts the filled range against the rest of the track', () => {
    renderSlider({ defaultValue: [50] });

    expect(getComputedStyle(partOf('range')).backgroundColor).not.toBe(
      getComputedStyle(partOf('track')).backgroundColor
    );
  });

  it('keeps the thumb fill white in both modes', () => {
    render(
      <>
        <div className='w-[200px]'>
          <Slider aria-label='Light' defaultValue={[50]} />
        </div>
        <div className='dark w-[200px]'>
          <Slider aria-label='Dark' defaultValue={[50]} />
        </div>
      </>
    );

    const [light, dark] = screen.getAllByRole('slider');
    expect(getComputedStyle(light).backgroundColor).toBe('rgb(255, 255, 255)');
    expect(getComputedStyle(dark).backgroundColor).toBe('rgb(255, 255, 255)');
  });

  it('lays the track out horizontally by default', () => {
    renderSlider({ defaultValue: [50] });

    const track = rectOf('track');
    expect(track.width).toBeGreaterThan(track.height);
    expect(track.height).toBe(4);
  });

  it('lays the track out vertically when asked', () => {
    render(
      <div className='h-[200px]'>
        <Slider
          aria-label='Volume'
          defaultValue={[50]}
          orientation='vertical'
        />
      </div>
    );

    const track = rectOf('track');
    expect(track.height).toBeGreaterThan(track.width);
    expect(track.width).toBe(4);
  });

  it('dims the whole slider while disabled', () => {
    renderSlider({ defaultValue: [50], disabled: true });

    expect(getComputedStyle(rootOf()).opacity).toBe('0.5');
  });
});
