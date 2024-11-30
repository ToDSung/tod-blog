import { expect, fireEvent, fn, userEvent, within } from '@storybook/test';

import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ComponentProps } from 'react';

import ButtonLinaria from './Button.linaria';

type ButtonPropsAndCustomArgs = ComponentProps<typeof ButtonLinaria> & {
  style?: CSSProperties;
};

const meta: Meta<ButtonPropsAndCustomArgs> = {
  title: 'mui-with-linaria/ButtonLinaria',
  component: ButtonLinaria,
  args: {
    label: 'Button Label',
    variant: 'contained',
    children: 'Button',
    onClick: fn(),
    style: { width: 100, height: 20, padding: 16 },
  },
  render: ({ style, ...props }) => (
    <div style={style}>
      <ButtonLinaria {...props} />
    </div>
  ),
} satisfies Meta<ButtonPropsAndCustomArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Button Label')).toHaveTextContent('Button Label');

    expect(canvas.getByLabelText('Button Label')).toHaveTextContent('Button');
  },
};

export const ClickExample: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));

    expect(args.onClick).toHaveBeenCalledTimes(1);

    await fireEvent.click(canvas.getByRole('button'));

    expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
