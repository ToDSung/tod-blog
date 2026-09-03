import type { Meta, StoryObj } from '@storybook/react-vite';

import ThemeProvider from '@tod-workspace/ui/theme/ThemeProvider';
import ThemeToggle from '@tod-workspace/ui/theme/ThemeToggle';

const meta = {
  title: 'Theme/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
