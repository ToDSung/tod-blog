import { describe, expect, it } from 'vitest';

import { cn } from './utils';

describe('cn', () => {
  it('merges conditional class names', () => {
    expect(cn('a', false, 'c')).toBe('a c');
  });

  it('lets later tailwind utilities win over earlier conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('keeps non-conflicting utilities', () => {
    expect(cn('p-2', 'text-sm')).toBe('p-2 text-sm');
  });
});
