import type { Theme } from 'unocss/preset-uno';
import { prefix, ThemeList, type ThemeType } from './config';

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
    [`h${name}`]: `rgb(var(${prefix}-${name}-h))`,
  }
}