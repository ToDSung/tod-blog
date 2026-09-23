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
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { className: 'w-80', size: 'md' },
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
