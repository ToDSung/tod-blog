import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Checkbox from '@tod-workspace/ui/components/Checkbox';

describe('Checkbox', () => {
  it('shows the check icon when checked and the minus icon when indeterminate', () => {
    const { rerender } = render(<Checkbox aria-label='Accept terms' checked />);

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox.querySelector('.lucide-check')).toBeVisible();
    expect(checkbox.querySelector('.lucide-minus')).not.toBeVisible();

    rerender(<Checkbox aria-label='Accept terms' checked='indeterminate' />);

    expect(checkbox.querySelector('.lucide-check')).not.toBeVisible();
    expect(checkbox.querySelector('.lucide-minus')).toBeVisible();
  });
});
