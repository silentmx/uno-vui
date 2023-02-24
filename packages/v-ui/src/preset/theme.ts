
import type { Theme } from 'unocss/preset-uno';
import type { ColorType } from '../composables/types';

export const themeSet = (config?: { primary: ColorType, secondary: ColorType }[]): Theme => {
  // 默认主题
  let themes = [{
    primary: "blue",
    secondary: "purple"
  }];

  // 去重复
  if (config && config.length > 0) {
    themes = Array.from(new Set(config));
  }

  const themeColors: any = {};
  themes.forEach((v) => {
    themeColors[`${v.primary}-${v.primary}`] = {
      "primary": v.primary,
      "secondary": v.secondary
    }
  })

  return {
    colors: {
      ...themeColors
    }
  }
}