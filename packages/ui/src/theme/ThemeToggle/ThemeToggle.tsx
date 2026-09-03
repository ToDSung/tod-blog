'use client';

import { MonitorIcon, MoonIcon, PaletteIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import type { ColorTheme } from '@tod-workspace/ui/theme/ThemeProvider';

import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tod-workspace/ui/components/DropdownMenu';
import IconButton from '@tod-workspace/ui/components/IconButton';
import {
  COLOR_THEMES,
  useColorTheme,
} from '@tod-workspace/ui/theme/ThemeProvider';

const MODES = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: MonitorIcon },
] as const;

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label='Toggle theme' variant='outline'>
          <PaletteIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={colorTheme}
          onValueChange={value => setColorTheme(value as ColorTheme)}
        >
          {COLOR_THEMES.map(name => (
            <DropdownMenuRadioItem key={name} value={name}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          {MODES.map(({ value, label, Icon }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon aria-hidden='true' />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
