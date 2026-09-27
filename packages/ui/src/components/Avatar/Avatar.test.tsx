import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Avatar, {
  AvatarFallback,
  AvatarImage,
} from '@tod-workspace/ui/components/Avatar';

const avatar = () =>
  document.querySelector<HTMLElement>('[data-slot="avatar"]');

describe('Avatar', () => {
  it('shows the fallback instead of an image that has not loaded', () => {
    render(
      <Avatar>
        <AvatarImage alt='ToD' src='/avatar.png' />
        <AvatarFallback>TD</AvatarFallback>
      </Avatar>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('TD')).toBeInTheDocument();
  });

  it('renders at the md size by default', () => {
    render(<Avatar />);

    expect(avatar()).toHaveAttribute('data-size', 'md');
    expect(avatar()).toHaveClass('size-8');
  });

  it.each([
    ['sm', 'size-6'],
    ['lg', 'size-10'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(<Avatar size={size} />);

    expect(avatar()).toHaveAttribute('data-size', size);
    expect(avatar()).toHaveClass(expectedClass);
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Avatar className='avatar-class'>
        <AvatarFallback className='fallback-class'>TD</AvatarFallback>
      </Avatar>
    );

    expect(avatar()).toHaveClass('avatar-class', 'rounded-full');
    expect(screen.getByText('TD')).toHaveClass('fallback-class', 'size-full');
  });

  it('shrinks the fallback text only at the sm size', () => {
    render(
      <Avatar>
        <AvatarFallback>TD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('TD')).toHaveClass(
      'text-sm',
      'group-data-[size=sm]/avatar:text-xs'
    );
    expect(screen.getByText('TD').className).not.toContain('size=lg');
  });
});
