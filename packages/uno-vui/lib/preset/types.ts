import { theme } from 'unocss/preset-mini';

// Colors
export const ColorRegion = Object.keys(theme.colors.light);
export type ColorRegionType = keyof (typeof theme.colors.light);
export type ColorType = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

export const prefix = "--unovui";
export const ThemeKeys = ["default", "primary", "accent", "success", "warn", "error"] as const;
export type ThemeType = typeof ThemeKeys[number];
export type ThemeConfig = {
  [key in Exclude<ThemeType, "default">]: ColorType;
}
export const defaultTheme: ThemeConfig = {
  primary: "blue",
  accent: "purple",
  success: "green",
  warn: "yellow",
  error: "red"
}

export interface PresetConfig {
  themes?: Partial<ThemeConfig>[];
  light?: ColorRegionType;
  dark?: ColorRegionType;
}