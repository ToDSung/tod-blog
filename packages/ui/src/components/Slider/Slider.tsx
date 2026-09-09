'use client';

import { cn } from 'cn';
import { Slider as SliderPrimitive } from 'radix-ui';

import type { ComponentProps } from 'react';

export interface SliderProps extends ComponentProps<
  typeof SliderPrimitive.Root
> {}

const Slider = ({ className, defaultValue, value, ...props }: SliderProps) => {
  const thumbCount = value?.length ?? defaultValue?.length ?? 1;

  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col',
        className
      )}
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track
        className='relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1'
        data-slot='slider-track'
      >
        <SliderPrimitive.Range
          className='absolute bg-primary select-none data-horizontal:h-full data-vertical:w-full'
          data-slot='slider-range'
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          // A background token would sink the knob into the dark track, so it stays white in both modes.
          className='relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50'
          data-slot='slider-thumb'
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;
