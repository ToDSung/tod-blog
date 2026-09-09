import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Slider from '@tod-workspace/ui/components/Slider';

const trackRect = () =>
  document
    .querySelector<HTMLElement>('[data-slot="slider-track"]')!
    .getBoundingClientRect();

describe('Slider', () => {
  it('lays the track out horizontally by default', () => {
    render(
      <div className='w-[200px]'>
        <Slider aria-label='Volume' defaultValue={[50]} />
      </div>
    );

    const track = trackRect();
    expect(track.height).toBeGreaterThan(0);
    expect(track.width).toBeGreaterThan(track.height);
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

    const track = trackRect();
    expect(track.width).toBeGreaterThan(0);
    expect(track.height).toBeGreaterThan(track.width);
  });
});
