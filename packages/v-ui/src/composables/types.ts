/**
 * Auto genrator
 */
// theme type list
const ThemeList = ["primary", "secondary", "success", "warn", "error", "info", "default"] as const;
export type ThemeType = typeof ThemeList[number];

// colors type list
const ColorList = [
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
  "gray",
  "slate",
  "zinc",
  "neutral",
  "stone",
] as const;
export type ColorType = typeof ColorList[number];

// size type list
const SizeList = [
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
