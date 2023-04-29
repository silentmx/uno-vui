import type { theme } from 'unocss/preset-mini';

// Colors
export type Colors = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

// Theme
export type ThemeType = "default" | "primary" | "accent" | "success" | "warn" | "error";
export type ThemeConfig = {
  [key in ThemeType]: Colors;
}

// default Icon class
export type IconConfig = {
  /**
   * 加载图标
   * @default 
   * `i-eos-icons:loading`,
   * 
   * @example
   * `i-mingcute:loading-line animate-spin`
   */
  loading: string;
}

/**
 * preset config for uno vui
 */
export type PresetConfig = {
  themes?: (Partial<ThemeConfig> & Pick<ThemeConfig, "primary" | "accent">)[];
  icons?: Partial<IconConfig>;
}
