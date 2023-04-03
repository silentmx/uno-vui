import { theme } from 'unocss/preset-mini';

// Colors
export const ColorRegion = Object.keys(theme.colors.light);
export type ColorRegionType = keyof (typeof theme.colors.light);
export type ColorType = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

export const prefix = "--unovui";
export const ThemeKeys = ["primary", "accent", "success", "warn", "error"] as const;
export type ThemeType = "default" | typeof ThemeKeys[number];
export type ThemeConfig = {
  [key in Exclude<ThemeType, "default">]: ColorType;
}

export interface PresetConfig {
  themes?: (Partial<ThemeConfig> & Pick<ThemeConfig, "primary" | "accent">)[];
  light?: ColorRegionType;
  dark?: ColorRegionType;
}