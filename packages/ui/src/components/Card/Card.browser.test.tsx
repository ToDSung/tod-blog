import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card, {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@tod-workspace/ui/components/Card';

describe('Card', () => {
  it('places the header action beside the title at the right edge', () => {
    render(
      <div className='w-80'>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
            <CardAction>Action</CardAction>
          </CardHeader>
        </Card>
      </div>
    );

    const title = screen.getByText('Title').getBoundingClientRect();
    const action = screen.getByText('Action').getBoundingClientRect();
    const headerElement = document.querySelector<HTMLElement>(
      '[data-slot="card-header"]'
    )!;
    const header = headerElement.getBoundingClientRect();
    const headerPadding = parseFloat(
      getComputedStyle(headerElement).paddingRight
    );

    expect(action.top).toBe(title.top);
    expect(action.left).toBeGreaterThan(title.right);
    expect(action.right).toBe(header.right - headerPadding);
  });
});
