import type { ColorRegionType, ColorType } from "../composables/types";

export const prefix = "--vui";
export const ThemeList = ["default", "primary", "accent", "success", "warn", "error"] as const;
export type ThemeType = typeof ThemeList[number];

export interface ThemeConfig {
  primary: ColorType;
  accent: ColorType;
  success?: ColorType;
  warn?: ColorType;
  error?: ColorType;
}

export interface PresetConfig {
  themes?: ThemeConfig[];
  light?: ColorRegionType;
  dark?: ColorRegionType;
}