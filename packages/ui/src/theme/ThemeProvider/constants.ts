export const COLOR_THEMES = ['professional', 'ocean'] as const;

export type ColorTheme = (typeof COLOR_THEMES)[number];

export const DEFAULT_COLOR_THEME: ColorTheme = 'professional';

export const COLOR_THEME_STORAGE_KEY = 'tod-ui-color-theme';
