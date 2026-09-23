import { CopyIcon, SearchIcon, XIcon } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import InputGroup, {
  InputGroupAddon,
  InputGroupButton,
  InputGroupIconButton,
  InputGroupInput,
} from '@tod-workspace/ui/components/InputGroup';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  args: { className: 'w-80' },
  render: args => (
    <InputGroup {...args}>
      <InputGroupInput aria-label='Search' placeholder='Search posts' />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithButton: Story = {
  render: args => (
    <InputGroup {...args}>
      <InputGroupInput aria-label='Share link' defaultValue='tod.blog/post/1' />
      <InputGroupAddon align='inline-end'>
        <InputGroupButton>
          <CopyIcon />
          Copy
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithIconButton: Story = {
  render: args => (
    <InputGroup {...args}>
      <InputGroupInput aria-label='Search' defaultValue='react' />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align='inline-end'>
        <InputGroupIconButton aria-label='Clear'>
          <XIcon />
        </InputGroupIconButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: args => (
    <div className='flex flex-col gap-3'>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <InputGroup key={size} {...args} size={size}>
          <InputGroupInput aria-label={size} defaultValue={size} />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align='inline-end'>
            <InputGroupButton>
              <CopyIcon />
              Copy
            </InputGroupButton>
            <InputGroupIconButton aria-label='Clear'>
              <XIcon />
            </InputGroupIconButton>
          </InputGroupAddon>
        </InputGroup>
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: args => (
    <InputGroup {...args}>
      <InputGroupInput aria-invalid aria-label='Search' defaultValue='??' />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: args => (
    <InputGroup {...args}>
      <InputGroupInput aria-label='Search' defaultValue='react' disabled />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};
