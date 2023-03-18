import { theme } from 'unocss/preset-mini';

// Colors
export const ColorRegion = Object.keys(theme.colors.light);
export type ColorRegionType = keyof (typeof theme.colors.light);
export type ColorType = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

export const prefix = "--unovui";
export const ThemeKeys = ["default", "primary", "accent", "success", "warn", "error"] as const;
export type ThemeType = typeof ThemeKeys[number];
export interface ThemeConfig {
  primary: ColorType;
  accent: ColorType;
  success?: ColorType;
  warn?: ColorType;
  error?: ColorType;
}
export const defaultTheme: Pick<ThemeConfig, "success" | "warn" | "error"> = {
  success: "green",
  warn: "yellow",
  error: "red"
}

export interface PresetConfig {
  themes?: ThemeConfig[];
  light?: ColorRegionType;
  dark?: ColorRegionType;
}