import { render, screen } from '@testing-library/react';
import { CopyIcon, SearchIcon, XIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import Input from '@tod-workspace/ui/components/Input';
import InputGroup, {
  InputGroupAddon,
  InputGroupButton,
  InputGroupIconButton,
  InputGroupInput,
  InputGroupText,
} from '@tod-workspace/ui/components/InputGroup';

const heightOf = (element: HTMLElement) =>
  element.getBoundingClientRect().height;

describe('InputGroup', () => {
  it.each([
    ['sm', 28, 20],
    ['md', 32, 24],
    ['lg', 36, 28],
  ] as const)(
    'matches the Input height and fits its buttons at the %s size',
    (size, groupHeight, buttonHeight) => {
      render(
        <>
          <Input aria-label='Plain' size={size} />
          <InputGroup aria-label='Website group' size={size}>
            <InputGroupInput aria-label='Website' />
            <InputGroupAddon align='inline-end'>
              <InputGroupButton>Copy</InputGroupButton>
              <InputGroupIconButton aria-label='Clear'>
                <XIcon />
              </InputGroupIconButton>
            </InputGroupAddon>
          </InputGroup>
        </>
      );

      const group = screen.getByRole('group', { name: 'Website group' });

      expect(heightOf(group)).toBe(
        heightOf(screen.getByRole('textbox', { name: 'Plain' }))
      );
      expect(heightOf(group)).toBe(groupHeight);
      expect(heightOf(screen.getByRole('button', { name: 'Copy' }))).toBe(
        buttonHeight
      );
      expect(heightOf(screen.getByRole('button', { name: 'Clear' }))).toBe(
        buttonHeight
      );
    }
  );

  it.each([
    ['sm', 12],
    ['md', 14],
    ['lg', 16],
  ] as const)(
    'draws %s addon icons at %ipx and button icons at 14px',
    (size, addonIconSize) => {
      const { container } = render(
        <InputGroup aria-label='Search group' size={size}>
          <InputGroupInput aria-label='Search' />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <InputGroupText>
              <SearchIcon />
            </InputGroupText>
            <InputGroupButton>
              <CopyIcon />
              Copy
            </InputGroupButton>
            <InputGroupIconButton aria-label='Clear'>
              <XIcon />
            </InputGroupIconButton>
          </InputGroupAddon>
        </InputGroup>
      );

      const widths = [...container.querySelectorAll('svg')].map(
        icon => icon.getBoundingClientRect().width
      );

      expect(widths).toEqual([addonIconSize, addonIconSize, 14, 14]);
    }
  );

  it.each(['sm', 'md', 'lg'] as const)(
    'starts a leading icon where plain %s Input text starts and leaves 8px before the text',
    size => {
      const { container } = render(
        <>
          <Input aria-label='Plain' size={size} />
          <InputGroup aria-label='Search group' size={size}>
            <InputGroupInput aria-label='Search' />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </>
      );

      const plain = screen.getByRole('textbox', { name: 'Plain' });
      const group = screen.getByRole('group', { name: 'Search group' });
      const input = screen.getByRole('textbox', { name: 'Search' });
      const icon = container.querySelector('svg')!.getBoundingClientRect();
      const plainTextStart = parseFloat(getComputedStyle(plain).paddingLeft);
      const inputTextStart =
        input.getBoundingClientRect().left +
        parseFloat(getComputedStyle(input).paddingLeft);

      expect(icon.left - group.getBoundingClientRect().left - 1).toBe(
        plainTextStart
      );
      expect(inputTextStart - icon.right).toBe(8);
    }
  );

  it('draws the focus ring on the group, not the input', () => {
    render(
      <InputGroup aria-label='Website group'>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    const group = screen.getByRole('group', { name: 'Website group' });
    const input = screen.getByRole('textbox', { name: 'Website' });
    group.style.transition = 'none';
    input.focus();

    expect(getComputedStyle(group).boxShadow).toContain('0px 0px 0px 2px');
    expect(getComputedStyle(input).boxShadow).not.toMatch(/0px 0px 0px [1-9]/);
  });
});
