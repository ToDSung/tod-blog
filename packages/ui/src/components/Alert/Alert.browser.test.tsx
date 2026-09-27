import { render, screen } from '@testing-library/react';
import { InfoIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import Alert, {
  AlertDescription,
  AlertTitle,
} from '@tod-workspace/ui/components/Alert';

describe('Alert', () => {
  it('puts a leading icon in its own column with the text aligned beside it', () => {
    render(
      <div className='w-80'>
        <Alert>
          <InfoIcon />
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      </div>
    );

    const icon = screen
      .getByRole('alert')
      .querySelector('svg')!
      .getBoundingClientRect();
    const title = screen.getByText('Title').getBoundingClientRect();
    const description = screen.getByText('Description').getBoundingClientRect();

    expect(title.left).toBeGreaterThan(icon.right);
    expect(description.left).toBe(title.left);
    expect(description.top).toBeGreaterThan(title.top);
  });
});
