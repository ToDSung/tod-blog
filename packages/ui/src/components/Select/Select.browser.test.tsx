import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Input from '@tod-workspace/ui/components/Input';
import Select, {
  SelectTrigger,
  SelectValue,
} from '@tod-workspace/ui/components/Select';

const heightOf = (element: HTMLElement) => getComputedStyle(element).height;

describe('Select', () => {
  it.each(['sm', 'md', 'lg'] as const)(
    'matches the Input height at the %s size',
    size => {
      render(
        <>
          <Input aria-label='Name' size={size} />
          <Select>
            <SelectTrigger aria-label='Fruit' size={size}>
              <SelectValue placeholder='Pick a fruit' />
            </SelectTrigger>
          </Select>
        </>
      );

      expect(heightOf(screen.getByRole('combobox', { name: 'Fruit' }))).toBe(
        heightOf(screen.getByRole('textbox', { name: 'Name' }))
      );
    }
  );
});
