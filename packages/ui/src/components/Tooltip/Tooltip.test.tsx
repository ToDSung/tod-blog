import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Button from '@tod-workspace/ui/components/Button';
import Tooltip, {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@tod-workspace/ui/components/Tooltip';

const renderTooltip = () =>
  render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Share</Button>
        </TooltipTrigger>
        <TooltipContent className='content-class'>
          Copy a link to this post
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

const content = () =>
  document.querySelector<HTMLElement>('[data-slot="tooltip-content"]');

describe('Tooltip', () => {
  it('opens on hover into a portal on document.body and describes the trigger', async () => {
    const { container } = renderTooltip();
    const trigger = screen.getByRole('button', { name: 'Share' });

    await userEvent.hover(trigger);
    await screen.findByRole('tooltip');

    expect(trigger).toHaveAccessibleDescription('Copy a link to this post');
    expect(container).not.toContainElement(content());
    expect(document.body).toContainElement(content());
  });

  it('opens without a hover delay by default', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button', { name: 'Share' }));

    expect(
      await screen.findByRole('tooltip', {}, { timeout: 100 })
    ).toBeInTheDocument();
  });

  it('points an arrow from the content at the trigger', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button', { name: 'Share' }));
    await screen.findByRole('tooltip');

    expect(content()).toContainElement(
      document.querySelector<HTMLElement>('[data-slot="tooltip-arrow"]')
    );
  });

  it('forwards a caller-supplied className alongside the base classes', async () => {
    renderTooltip();

    await userEvent.hover(screen.getByRole('button', { name: 'Share' }));
    await screen.findByRole('tooltip');

    expect(content()).toHaveClass(
      'content-class',
      'bg-foreground',
      'duration-100'
    );
  });
});
