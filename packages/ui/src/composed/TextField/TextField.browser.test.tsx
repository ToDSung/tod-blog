import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { TextFieldProps } from '@tod-workspace/ui/composed/TextField';

import TextField from '@tod-workspace/ui/composed/TextField';

const heightOf = (props: Partial<TextFieldProps>) => {
  const { unmount } = render(<TextField label='Email' {...props} />);
  const height = screen.getByRole('group').getBoundingClientRect().height;
  unmount();
  return height;
};

describe('TextField', () => {
  it('keeps the same height with no helper, a description or an error', () => {
    const empty = heightOf({});

    expect(heightOf({ description: 'We never share it.' })).toBe(empty);
    expect(heightOf({ error: 'Email is required.' })).toBe(empty);
  });

  it('reserves one 16px line under the input when there is no helper', () => {
    render(<TextField label='Email' />);

    const input = screen.getByRole('textbox', { name: 'Email' });
    const group = screen.getByRole('group');

    expect(
      group.getBoundingClientRect().bottom -
        input.getBoundingClientRect().bottom
    ).toBe(4 + 16);
  });
});
