import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { XIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import InputGroup, {
  InputGroupAddon,
  InputGroupButton,
  InputGroupIconButton,
  InputGroupInput,
} from '@tod-workspace/ui/components/InputGroup';

const textbox = () => screen.getByRole('textbox', { name: 'Website' });

const group = () => screen.getByRole('group', { name: 'Website group' });

describe('InputGroup', () => {
  it('focuses the input when an addon is clicked', async () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon align='inline-end'>.com</InputGroupAddon>
      </InputGroup>
    );

    await userEvent.click(screen.getByText('.com'));

    expect(textbox()).toHaveFocus();
  });

  it('calls a caller-supplied onClick on the addon', async () => {
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon onClick={onClick}>https://</InputGroupAddon>
      </InputGroup>
    );

    await userEvent.click(screen.getByText('https://'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('leaves focus on a button inside the addon', async () => {
    const onClick = vi.fn();
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton onClick={onClick}>Copy</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(textbox()).not.toHaveFocus();
  });

  it('does not submit the surrounding form from its buttons', async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    render(
      <form onSubmit={event => onSubmit(event.nativeEvent as SubmitEvent)}>
        <InputGroup>
          <InputGroupInput aria-label='Website' />
          <InputGroupAddon align='inline-end'>
            <InputGroupButton>Copy</InputGroupButton>
            <InputGroupIconButton aria-label='Clear'>
              <XIcon />
            </InputGroupIconButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('renders its buttons as ghost buttons by default', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton>Copy</InputGroupButton>
          <InputGroupIconButton aria-label='Clear'>
            <XIcon />
          </InputGroupIconButton>
        </InputGroupAddon>
      </InputGroup>
    );

    expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute(
      'data-variant',
      'ghost'
    );
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveAttribute(
      'data-variant',
      'ghost'
    );
  });

  it('renders at the md size by default', () => {
    render(
      <InputGroup aria-label='Website group'>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    expect(group()).toHaveAttribute('data-size', 'md');
    expect(group()).toHaveClass('h-8');
  });

  it.each([
    ['sm', 'h-7'],
    ['lg', 'h-9'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(
      <InputGroup aria-label='Website group' size={size}>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    expect(group()).toHaveAttribute('data-size', size);
    expect(group()).toHaveClass(expectedClass);
  });

  it('keeps the 180px minimum width', () => {
    render(
      <InputGroup aria-label='Website group'>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    expect(group()).toHaveClass('min-w-45');
  });

  it('places an inline-end addon after the input', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon align='inline-end'>.com</InputGroupAddon>
      </InputGroup>
    );

    expect(screen.getByText('.com')).toHaveClass('order-last');
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <InputGroup aria-label='Website group' className='group-class'>
        <InputGroupInput aria-label='Website' className='input-class' />
        <InputGroupAddon className='addon-class'>https://</InputGroupAddon>
        <InputGroupAddon align='inline-end'>
          <InputGroupButton className='button-class'>Copy</InputGroupButton>
          <InputGroupIconButton aria-label='Clear' className='icon-class'>
            <XIcon />
          </InputGroupIconButton>
        </InputGroupAddon>
      </InputGroup>
    );

    expect(group()).toHaveClass('group-class', 'border-input');
    expect(textbox()).toHaveClass('input-class', 'border-0');
    expect(screen.getByText('https://')).toHaveClass(
      'addon-class',
      'order-first'
    );
    expect(screen.getByRole('button', { name: 'Copy' })).toHaveClass(
      'button-class',
      'h-6'
    );
    expect(screen.getByRole('button', { name: 'Clear' })).toHaveClass(
      'icon-class',
      'size-6'
    );
  });
});
