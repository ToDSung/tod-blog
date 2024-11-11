import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import SwitchLinaria from './Switch.linaria';

const meta = {
  title: 'mui-with-linaria/SwitchLinaria',
  component: SwitchLinaria,
} satisfies Meta<typeof SwitchLinaria>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,

    children: 'Switch Label',
  },
  render: args => {
    const [{ checked }, updateArgs] = useArgs();

    const onChange = () => {
      updateArgs({ checked: !checked });
    };

    return <SwitchLinaria {...args} onChange={onChange}></SwitchLinaria>;
  },
};
