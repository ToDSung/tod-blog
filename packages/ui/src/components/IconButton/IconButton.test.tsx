import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PaletteIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import IconButton from '@tod-workspace/ui/components/IconButton';

describe('IconButton', () => {
  it('names the button by its aria-label', () => {
    render(
      <IconButton aria-label='Toggle theme'>
        <PaletteIcon />
      </IconButton>
    );

    expect(
      screen.getByRole('button', { name: 'Toggle theme' })
    ).toBeInTheDocument();
  });

  it('marks itself as an icon button and exposes variant and size', () => {
    render(
      <IconButton aria-label='Delete' size='lg' variant='destructive'>
        <PaletteIcon />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveAttribute('data-slot', 'icon-button');
    expect(button).toHaveAttribute('data-variant', 'destructive');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('replaces the button height and padding with a square size', () => {
    render(
      <IconButton aria-label='Toggle theme'>
        <PaletteIcon />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: 'Toggle theme' });
    expect(button).toHaveClass('size-8', 'p-0');
    expect(button).not.toHaveClass('h-8', 'px-2.5');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label='Toggle theme' onClick={onClick}>
        <PaletteIcon />
      </IconButton>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
