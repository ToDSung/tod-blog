import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Button from '@tod-workspace/ui/components/Button';
import Popover, {
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@tod-workspace/ui/components/Popover';

describe('Popover', () => {
  it('opens the content into a portal on document.body when the trigger is clicked', async () => {
    const { container } = render(
      <Popover>
        <PopoverTrigger asChild>
          <Button>Reading time</Button>
        </PopoverTrigger>
        <PopoverContent>About five minutes.</PopoverContent>
      </Popover>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Reading time' }));
    const content = await screen.findByRole('dialog');

    expect(container).not.toContainElement(content);
    expect(document.body).toContainElement(content);
  });

  it('forwards a caller-supplied className alongside the base classes', async () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Reading time</PopoverTrigger>
        <PopoverContent className='content-class'>
          <PopoverHeader className='header-class'>
            <PopoverTitle className='title-class'>Title</PopoverTitle>
            <PopoverDescription className='description-class'>
              Description
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    );

    expect(await screen.findByRole('dialog')).toHaveClass(
      'content-class',
      'w-72',
      'gap-2.5',
      'p-2.5',
      'ring-1',
      'ring-foreground/10'
    );
    expect(document.querySelector('[data-slot="popover-header"]')).toHaveClass(
      'header-class',
      'gap-1'
    );
    expect(screen.getByText('Title')).toHaveClass('title-class', 'text-base');
    expect(screen.getByText('Description')).toHaveClass(
      'description-class',
      'text-muted-foreground'
    );
  });
});
