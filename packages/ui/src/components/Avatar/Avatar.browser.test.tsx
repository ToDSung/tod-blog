import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Avatar, {
  AvatarFallback,
  AvatarImage,
} from '@tod-workspace/ui/components/Avatar';

const PIXEL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

describe('Avatar', () => {
  it('replaces the fallback with the image once it loads', async () => {
    render(
      <Avatar>
        <AvatarImage alt='ToD' className='image-class' src={PIXEL} />
        <AvatarFallback>TD</AvatarFallback>
      </Avatar>
    );

    const image = await screen.findByRole('img', { name: 'ToD' });

    expect(image).toHaveClass('image-class', 'object-cover');
    expect(screen.queryByText('TD')).not.toBeInTheDocument();
  });
});
