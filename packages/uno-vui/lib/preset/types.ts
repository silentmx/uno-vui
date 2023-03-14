import { theme } from 'unocss/preset-mini';

// Colors
export const ColorRegion = Object.keys(theme.colors.light);
export type ColorRegionType = keyof (typeof theme.colors.light);
export type ColorType = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

export const prefix = "--unovui";
export interface ThemeConfig {
  primary: ColorType;
  accent: ColorType;
  success?: ColorType;
  warn?: ColorType;
  error?: ColorType;
}
export const defaultTheme: Pick<ThemeConfig, "primary" | "accent" | "success" | "warn" | "error"> = {
  primary: "blue",
  accent: "purple",
  success: "green",
  warn: "yellow",
  error: "red"
}
export type ThemeType = "default" | keyof (typeof defaultTheme);

export interface PresetConfig {
  themes?: ThemeConfig[];
  light?: ColorRegionType;
  dark?: ColorRegionType;
}
export const defaultConfig: Pick<PresetConfig, "themes" | "light" | "dark"> = {
  themes: [
    defaultTheme
  ],
  light: 400,
  dark: 500
}