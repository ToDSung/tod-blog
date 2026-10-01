import { render, screen, within } from '@testing-library/react';
import { CopyIcon, SearchIcon, XIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';

import Input from '@tod-workspace/ui/components/Input';
import InputGroup, {
  InputGroupAddon,
  InputGroupButton,
  InputGroupIconButton,
  InputGroupInput,
} from '@tod-workspace/ui/components/InputGroup';

const SIZES = ['sm', 'md', 'lg'] as const;

const heightOf = (element: HTMLElement) =>
  element.getBoundingClientRect().height;

const widthOf = (element: Element | null) =>
  element!.getBoundingClientRect().width;

describe('InputGroup', () => {
  it.each(SIZES)(
    'matches the Input height and insets its buttons evenly at the %s size',
    size => {
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
      expect(
        heightOf(group) - heightOf(screen.getByRole('button', { name: 'Copy' }))
      ).toBe(8);
      expect(
        heightOf(group) -
          heightOf(screen.getByRole('button', { name: 'Clear' }))
      ).toBe(8);
    }
  );

  it('scales addon icons with the group size and keeps button icons the same', () => {
    render(
      <>
        {SIZES.map(size => (
          <InputGroup key={size} aria-label={`${size} group`} size={size}>
            <InputGroupInput aria-label={`${size} search`} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align='inline-end'>
              <InputGroupButton>
                <CopyIcon />
                Copy
              </InputGroupButton>
              <InputGroupIconButton aria-label={`${size} clear`}>
                <XIcon />
              </InputGroupIconButton>
            </InputGroupAddon>
          </InputGroup>
        ))}
      </>
    );

    const iconWidths = SIZES.map(size => {
      const group = screen.getByRole('group', { name: `${size} group` });

      return {
        addon: widthOf(
          group.querySelector('[data-slot=input-group-addon] > svg')
        ),
        button: widthOf(
          within(group)
            .getByRole('button', { name: 'Copy' })
            .querySelector('svg')
        ),
        iconButton: widthOf(
          within(group)
            .getByRole('button', { name: `${size} clear` })
            .querySelector('svg')
        ),
      };
    });
    const [sm, md, lg] = iconWidths;

    expect(sm.addon).toBeLessThan(md.addon);
    expect(md.addon).toBeLessThan(lg.addon);
    expect(new Set(iconWidths.map(widths => widths.button)).size).toBe(1);
    expect(new Set(iconWidths.map(widths => widths.iconButton)).size).toBe(1);
  });

  it.each(SIZES)(
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

  it.each(SIZES)(
    'starts its text where plain %s Input text starts when it has no addon',
    size => {
      render(
        <>
          <Input aria-label='Plain' size={size} />
          <InputGroup size={size}>
            <InputGroupInput aria-label='Search' />
          </InputGroup>
        </>
      );

      expect(
        getComputedStyle(screen.getByRole('textbox', { name: 'Search' }))
          .paddingLeft
      ).toBe(
        getComputedStyle(screen.getByRole('textbox', { name: 'Plain' }))
          .paddingLeft
      );
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

  it.each([
    ['invalid', { 'aria-invalid': true }],
    ['disabled', { disabled: true }],
    ['read-only', { readOnly: true }],
  ] as const)(
    'draws the %s state on the group like a plain Input',
    (_state, props) => {
      render(
        <>
          <Input aria-label='Plain' {...props} />
          <InputGroup aria-label='Website group'>
            <InputGroupInput aria-label='Website' {...props} />
          </InputGroup>
        </>
      );

      const plain = getComputedStyle(
        screen.getByRole('textbox', { name: 'Plain' })
      );
      const group = getComputedStyle(
        screen.getByRole('group', { name: 'Website group' })
      );

      expect({
        background: group.backgroundColor,
        border: group.borderColor,
        opacity: group.opacity,
        ring: group.boxShadow,
      }).toEqual({
        background: plain.backgroundColor,
        border: plain.borderColor,
        opacity: plain.opacity,
        ring: plain.boxShadow,
      });
    }
  );
});
