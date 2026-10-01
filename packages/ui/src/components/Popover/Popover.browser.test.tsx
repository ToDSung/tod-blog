import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Popover, {
  PopoverContent,
  PopoverTrigger,
} from '@tod-workspace/ui/components/Popover';

describe('Popover', () => {
  it('opens 4px below the trigger by default', async () => {
    render(
      <div style={{ padding: '200px' }}>
        <Popover defaultOpen>
          <PopoverTrigger>Reading time</PopoverTrigger>
          <PopoverContent>About five minutes.</PopoverContent>
        </Popover>
      </div>
    );

    const content = await screen.findByRole('dialog');
    await Promise.all(
      document.getAnimations().map(animation => animation.finished)
    );
    const trigger = screen.getByRole('button', { name: 'Reading time' });

    expect(
      content.getBoundingClientRect().top -
        trigger.getBoundingClientRect().bottom
    ).toBeCloseTo(4, 0);
  });
});
