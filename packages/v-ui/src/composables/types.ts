/**
 * Auto genrator
 */
// theme type list
export const ThemeList = ["primary", "secondary", "success", "warn", "error", "info", "default"] as const;
export type ThemeType = typeof ThemeList[number];
export interface ThemeConfig {
  primary: ColorType,
  secondary: ColorType,
}

//颜色区间
export const colorRegion = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const;
export type ColorRegionType = typeof colorRegion[number];

// colors type list
export const ColorList = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "lime",
  "amber",
  "orange",
  "slate",
  "zinc",
  "neutral",
  "stone",
  "warmgray",
  "warmgray",
  "truegray",
  "truegray",
  "coolgray",
  "coolgray",
  "bluegray",
  "bluegray",
] as const;
export type ColorType = typeof ColorList[number];

// size type list
export const SizeList = [
  "default",
  "none",
  "xs",
  "sm",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
] as const;
export type SizeType = typeof SizeList[number];
