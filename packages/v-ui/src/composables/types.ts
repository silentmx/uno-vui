/**
 * Auto genrator
 */
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
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "red",
  "gray",
  "slate",
  "zinc",
  "neutral",
  "stone",
  "light",
  "dark",
  "lightblue",
  "lightBlue",
  "warmgray",
  "warmGray",
  "truegray",
  "trueGray",
  "coolgray",
  "coolGray",
  "bluegray",
  "blueGray",
] as const;
export type ColorType = typeof ColorList[number];

// size type list
export const SizeList = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const;
export type SizeType = typeof SizeList[number];
