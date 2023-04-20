import type { theme } from 'unocss/preset-mini';

// Colors
export type ColorType = Exclude<keyof (typeof theme.colors), "inherit" | "current" | "transparent" | "black" | "white">;

export const prefix = "--unovui";
export const ThemeKeys = ["primary", "accent", "default", "success", "warn", "error"] as const;
export type ThemeType = typeof ThemeKeys[number];
/**
 * 主题, `primary`和`accent`是必填项
 * 
 * @default
 * [{ primary: "blue", accent: "purple", default: "gray", success: "green", warn: "yellow", error: "red"}]
 */
export type ThemeConfig = {
  [key in ThemeType]: ColorType;
}

/**
  * 默认使用的图标
  */
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

// 默认配置的值
export const defaultConfig: PresetConfig = {
  themes: [{
    primary: "blue",
    accent: "purple",
    default: "gray",
    success: "green",
    warn: "yellow",
    error: "red"
  }],
  icons: {
    loading: "i-eos-icons:loading"
  }
}

/**
 * 预设配置
 */
export type PresetConfig = {
  themes?: (Partial<ThemeConfig> & Pick<ThemeConfig, "primary" | "accent">)[];
  icons?: Partial<IconConfig>;
}