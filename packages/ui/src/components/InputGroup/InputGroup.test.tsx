import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { XIcon } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import InputGroup, {
  InputGroupAddon,
  InputGroupButton,
  InputGroupIconButton,
  InputGroupInput,
  InputGroupText,
} from '@tod-workspace/ui/components/InputGroup';

const textbox = () => screen.getByRole('textbox', { name: 'Website' });

describe('InputGroup', () => {
  it('renders a group holding the input and its addons', () => {
    render(
      <InputGroup aria-label='Website group'>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );

    const group = screen.getByRole('group', { name: 'Website group' });

    expect(group).toContainElement(textbox());
    expect(screen.getByText('https://')).toHaveAttribute(
      'data-slot',
      'input-group-text'
    );
  });

  it('focuses the input when an addon is clicked', async () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
        <InputGroupAddon align='inline-end'>
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
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
        <InputGroupAddon onClick={onClick}>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );

    await userEvent.click(screen.getByText('https://'));

    expect(onClick).toHaveBeenCalledOnce();
    expect(textbox()).toHaveFocus();
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

    const button = screen.getByRole('button', { name: 'Copy' });
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
    expect(button).toHaveFocus();
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
    expect(screen.getByRole('button', { name: 'Copy' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('accepts typing into the input', async () => {
    render(
      <InputGroup>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    await userEvent.type(textbox(), 'example');

    expect(textbox()).toHaveValue('example');
  });

  it('forwards disabled and aria-invalid to the input', () => {
    render(
      <InputGroup>
        <InputGroupInput aria-invalid aria-label='Website' disabled />
      </InputGroup>
    );

    expect(textbox()).toBeDisabled();
    expect(textbox()).toHaveAttribute('aria-invalid', 'true');
    expect(textbox()).toHaveAttribute('data-slot', 'input-group-control');
  });

  it('renders at the md size by default', () => {
    render(
      <InputGroup aria-label='Website group'>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    const group = screen.getByRole('group', { name: 'Website group' });

    expect(group).toHaveAttribute('data-size', 'md');
    expect(group).toHaveClass('h-8');
  });

  it.each([
    ['sm', 'h-7'],
    ['md', 'h-8'],
    ['lg', 'h-9'],
  ] as const)('renders the %s size', (size, expectedClass) => {
    render(
      <InputGroup aria-label='Website group' size={size}>
        <InputGroupInput aria-label='Website' />
      </InputGroup>
    );

    const group = screen.getByRole('group', { name: 'Website group' });

    expect(group).toHaveAttribute('data-size', size);
    expect(group).toHaveClass(expectedClass);
  });

  it('forwards a caller-supplied className alongside the base classes', () => {
    render(
      <InputGroup aria-label='Website group' className='group-class'>
        <InputGroupInput aria-label='Website' className='input-class' />
        <InputGroupAddon className='addon-class'>
          <InputGroupText className='custom-class'>https://</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    );

    expect(screen.getByRole('group', { name: 'Website group' })).toHaveClass(
      'group-class',
      'border-input'
    );
    expect(textbox()).toHaveClass('input-class', 'border-0');
    expect(screen.getByText('https://')).toHaveClass(
      'custom-class',
      'text-muted-foreground'
    );
    expect(screen.getByText('https://').parentElement).toHaveClass(
      'addon-class',
      'order-first'
    );
  });
});
