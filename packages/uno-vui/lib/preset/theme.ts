import { theme, type Theme } from "unocss/preset-mini";
import { prefix, type ThemeConfig } from "./types";

/**
 * 生成unocss主题, 使用预设生成的css变量
 * ```ts
 * colors: {
 *   primary: {
 *     50: var(--unovui-primary-50),
 *     ...
 *   }
 *   ...
 * }
 * ```
 * @param themeConfig {@link ThemeConfig}
 * @returns { Theme } {@link Theme}
 */
export const setTheme = (themeConfig: ThemeConfig): Theme => {
  return {
    colors: {
      ...Object.fromEntries(Object.entries(themeConfig).map(([key, val]) => {
        return [`${key}`, Object.fromEntries(Object.keys(theme.colors[val]).map(region => {
          return [`${region}`, `rgb(var(${prefix}-${key}-${region}))`]
        }))];
      }))
    },
  }
}
