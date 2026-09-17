import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Switch from '@tod-workspace/ui/components/Switch';

const trackOf = (name: string) => {
  const track = screen.getByRole('switch', { name });
  // A read taken during the color transition returns the start value.
  track.style.transition = 'none';
  return track;
};

const thumbOf = (name: string) => {
  const thumb = trackOf(name).querySelector<HTMLElement>(
    '[data-slot="switch-thumb"]'
  )!;
  thumb.style.transition = 'none';
  return thumb;
};

const widthOf = (element: HTMLElement) => getComputedStyle(element).width;

const heightOf = (element: HTMLElement) =>
  parseFloat(getComputedStyle(element).height);

// The slide is a percentage translate, which Chrome reports unresolved, so it
// has to be measured off the rendered boxes.
const thumbOffsetIn = (name: string) =>
  thumbOf(name).getBoundingClientRect().left -
  trackOf(name).getBoundingClientRect().left;

describe('Switch', () => {
  it('renders a different track size for each size', () => {
    render(
      <>
        <Switch aria-label='Small' size='sm' />
        <Switch aria-label='Medium' size='md' />
        <Switch aria-label='Large' size='lg' />
      </>
    );

    expect(widthOf(trackOf('Small'))).toBe('24px');
    expect(widthOf(trackOf('Medium'))).toBe('32px');
    expect(widthOf(trackOf('Large'))).toBe('40px');

    expect(heightOf(trackOf('Small'))).toBeLessThan(
      heightOf(trackOf('Medium'))
    );
    expect(heightOf(trackOf('Medium'))).toBeLessThan(
      heightOf(trackOf('Large'))
    );
  });

  it('scales the thumb with the track', () => {
    render(
      <>
        <Switch aria-label='Small' size='sm' />
        <Switch aria-label='Medium' size='md' />
        <Switch aria-label='Large' size='lg' />
      </>
    );

    expect(widthOf(thumbOf('Small'))).toBe('12px');
    expect(widthOf(thumbOf('Medium'))).toBe('16px');
    expect(widthOf(thumbOf('Large'))).toBe('20px');
  });

  it('keeps the checked thumb inside the track at every size', () => {
    render(
      <>
        <Switch aria-label='Small' defaultChecked size='sm' />
        <Switch aria-label='Medium' defaultChecked size='md' />
        <Switch aria-label='Large' defaultChecked size='lg' />
      </>
    );

    for (const name of ['Small', 'Medium', 'Large']) {
      const track = trackOf(name).getBoundingClientRect();
      const thumb = thumbOf(name).getBoundingClientRect();

      expect(thumb.right).toBeLessThanOrEqual(track.right);
      expect(thumb.left).toBeGreaterThanOrEqual(track.left);
    }
  });

  it('slides the thumb to the right when checked', () => {
    render(
      <>
        <Switch aria-label='Off' />
        <Switch aria-label='On' defaultChecked />
      </>
    );

    expect(thumbOffsetIn('On')).toBeGreaterThan(thumbOffsetIn('Off'));
  });

  it('fills the track when checked', () => {
    render(
      <>
        <Switch aria-label='Off' />
        <Switch aria-label='On' defaultChecked />
      </>
    );

    expect(getComputedStyle(trackOf('On')).backgroundColor).not.toBe(
      getComputedStyle(trackOf('Off')).backgroundColor
    );
  });

  it('contrasts the thumb against the filled track', () => {
    render(<Switch aria-label='On' defaultChecked />);

    expect(getComputedStyle(thumbOf('On')).backgroundColor).not.toBe(
      getComputedStyle(trackOf('On')).backgroundColor
    );
  });

  it('dims the track and blocks the cursor while disabled', () => {
    render(
      <>
        <Switch aria-label='Enabled' />
        <Switch aria-label='Disabled' disabled />
        <Switch aria-label='Disabled checked' defaultChecked disabled />
      </>
    );

    expect(getComputedStyle(trackOf('Enabled')).opacity).toBe('1');

    for (const name of ['Disabled', 'Disabled checked']) {
      expect(getComputedStyle(trackOf(name)).opacity).toBe('0.5');
      expect(getComputedStyle(trackOf(name)).cursor).toBe('not-allowed');
    }
  });

  it('rings an invalid switch in both checked states', () => {
    render(
      <>
        <Switch aria-label='Valid' />
        <Switch aria-invalid aria-label='Invalid' />
        <Switch aria-invalid aria-label='Invalid checked' defaultChecked />
      </>
    );

    expect(getComputedStyle(trackOf('Valid')).boxShadow).toBe('none');

    for (const name of ['Invalid', 'Invalid checked']) {
      expect(getComputedStyle(trackOf(name)).boxShadow).not.toBe('none');
    }
  });
});
