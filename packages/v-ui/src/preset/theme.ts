import type { Theme } from 'unocss/preset-uno';
import { prefix, ThemeList, type ThemeType } from './config';

/**
 * 生成主题颜色变量
 */
export const theme: Theme = {
  colors: {
    ...ThemeList.reduce((obj, key) => {
      obj = { ...obj, ...genThemeVar(key) }
      return obj;
    }, {})
  }
}

function genThemeVar(name: ThemeType) {
  return {
    [`${name}`]: `rgb(var(${prefix}-${name}))`,
    [`${name}Light`]: `rgb(var(${prefix}-${name}-light))`,
    [`${name}Heavy`]: `rgb(var(${prefix}-${name}-heavy))`,
  }
}