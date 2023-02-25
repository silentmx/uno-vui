
import { parseColor } from '@unocss/preset-mini/utils';
import { theme } from 'unocss/preset-mini';
import type { Theme } from 'unocss/preset-uno';
import type { ThemeConfig } from '../composables/types';
import { allThemes, selectedTheme } from '../composables/use-theme';

const darkMode = 500;
const lightMode = 700;

export const themeSet = (config?: ThemeConfig[]): Theme => {
  // 去重复
  if (config && config.length > 0) {
    allThemes.value = Array.from(new Set(config));
    selectedTheme.value = allThemes.value[0];
  }

  let themeColors: any = {};
  allThemes.value.forEach((v) => {
    themeColors[`${v.primary}${v.secondary}`] = {
      "primarylight": parseColor(`${v.primary}-${lightMode}`, theme)?.color,
      "primarydark": parseColor(`${v.primary}-${darkMode}`, theme)?.color,
      "secondarylight": parseColor(`${v.secondary}-${lightMode}`, theme)?.color,
      "secondarydark": parseColor(`${v.secondary}-${darkMode}`, theme)?.color,
    }
  });

  return {
    colors: {
      ...themeColors,
      ...{
        "successlight": parseColor(`green-${lightMode}`, theme)?.color,
        "successdark": parseColor(`green-${darkMode}`, theme)?.color,
        "warnlight": parseColor(`yellow-${lightMode}`, theme)?.color,
        "warndark": parseColor(`yellow-${darkMode}`, theme)?.color,
        "errorlight": parseColor(`red-${lightMode}`, theme)?.color,
        "errordark": parseColor(`red-${darkMode}`, theme)?.color,
        "infolight": parseColor(`gray-${lightMode}`, theme)?.color,
        "infodark": parseColor(`gray-${darkMode}`, theme)?.color,
      }
    }
  }
}