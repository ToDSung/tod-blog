import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Alert, {
  AlertDescription,
  AlertTitle,
} from '@tod-workspace/ui/components/Alert';

describe('Alert', () => {
  it('announces itself as an alert with the default variant', () => {
    render(<Alert>Saved</Alert>);

    expect(screen.getByRole('alert')).toHaveAttribute(
      'data-variant',
      'default'
    );
  });

  it('exposes the chosen variant as a data attribute', () => {
    render(<Alert variant='destructive'>Failed</Alert>);

    expect(screen.getByRole('alert')).toHaveAttribute(
      'data-variant',
      'destructive'
    );
  });

  it('colours only the text of a destructive alert', () => {
    render(<Alert variant='destructive'>Failed</Alert>);

    expect(screen.getByRole('alert')).toHaveClass(
      'bg-card',
      'text-destructive',
      '*:data-[slot=alert-description]:text-destructive/90'
    );
  });

  it('sizes a leading icon unless the caller sizes it', () => {
    render(<Alert>Saved</Alert>);

    expect(screen.getByRole('alert')).toHaveClass(
      "*:[svg:not([class*='size-'])]:size-4"
    );
  });

  it('lets the caller replace the alert role for content that is not urgent', () => {
    render(<Alert role='note'>Heads up</Alert>);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('note')).toBeInTheDocument();
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <Alert className='alert-class'>
        <AlertTitle className='title-class'>Title</AlertTitle>
        <AlertDescription className='description-class'>
          Description
        </AlertDescription>
      </Alert>
    );

    expect(screen.getByRole('alert')).toHaveClass(
      'alert-class',
      'ring-1',
      'ring-foreground/10'
    );
    expect(screen.getByText('Title')).toHaveClass('title-class');
    expect(screen.getByText('Description')).toHaveClass('description-class');
  });
});
