import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card, {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@tod-workspace/ui/components/Card';

const slot = (name: string) =>
  document.querySelector<HTMLElement>(`[data-slot="${name}"]`);

describe('Card', () => {
  it('outlines the card with a ring instead of a border', () => {
    render(<Card>Content</Card>);

    expect(slot('card')).toHaveClass('ring-1', 'ring-foreground/10');
    expect(slot('card')).not.toHaveClass('border');
  });

  it('separates the footer with a top border and no tinted background', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(slot('card-footer')).toHaveClass('border-t', 'gap-2');
    expect(slot('card-footer')).not.toHaveClass('bg-muted/50');
  });

  it('keeps the title line height loose enough to wrap', () => {
    render(<CardTitle>Title</CardTitle>);

    expect(screen.getByText('Title')).toHaveClass('leading-snug');
  });

  it('forwards a caller-supplied className on every part', () => {
    render(
      <Card className='card-class'>
        <CardHeader className='header-class'>
          <CardTitle className='title-class'>Title</CardTitle>
          <CardDescription className='description-class'>
            Description
          </CardDescription>
          <CardAction className='action-class'>Action</CardAction>
        </CardHeader>
        <CardContent className='content-class'>Content</CardContent>
        <CardFooter className='footer-class'>Footer</CardFooter>
      </Card>
    );

    expect(slot('card')).toHaveClass('card-class', 'rounded-xl');
    expect(slot('card-header')).toHaveClass('header-class', 'gap-1');
    expect(slot('card-title')).toHaveClass('title-class', 'text-base');
    expect(slot('card-description')).toHaveClass(
      'description-class',
      'text-sm'
    );
    expect(slot('card-action')).toHaveClass('action-class', 'col-start-2');
    expect(slot('card-content')).toHaveClass('content-class', 'px-4');
    expect(slot('card-footer')).toHaveClass('footer-class', 'border-t');
  });
});
