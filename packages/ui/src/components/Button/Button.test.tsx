import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '@tod-workspace/ui/components/Button';

describe('Button', () => {
  it('defaults to the default variant at md size', () => {
    render(<Button>Save</Button>);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveAttribute('data-variant', 'default');
    expect(button).toHaveAttribute('data-size', 'md');
  });

  it('keeps the 2px rings and lets a caller size its own icon', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'focus-visible:ring-2',
      'aria-invalid:ring-2',
      "[&_svg:not([class*='size-'])]:size-4"
    );
  });

  it('merges a caller className', () => {
    render(<Button className='w-full'>Save</Button>);

    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass('w-full');
  });

  it('exposes variant and size as data attributes', () => {
    render(
      <Button size='lg' variant='destructive'>
        Delete
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveAttribute('data-variant', 'destructive');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick while disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the child element instead of a button when asChild is set', () => {
    render(
      <Button asChild>
        <a href='/cv'>Resume</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Resume' });
    expect(link).toHaveAttribute('data-slot', 'button');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
