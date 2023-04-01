import { parseColor, theme } from 'unocss/preset-mini';

export const globalKeywords = ["inherit", "initial", "revert", "revert-layer", "unset"];

/**
 * 判断一个字符串是否可以被unocss解析成颜色
 * @param { string} color - 颜色字符串 
 * @returns { boolean }
 */
export function hasParseableColor(color: string | undefined): boolean {
  return color != null && !!parseColor(color, theme)?.color;
}