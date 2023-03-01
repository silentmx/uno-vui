import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';
import type { ColorRegionType, ColorType } from '../composables/types';
import { setAllThemes } from '../composables/use-theme';
import { rules } from './rules';
import { safeListSet } from './safe-list';
import { shortcuts } from './shortcuts';

interface Config {
  themes?: {
    primary: ColorType,
    accent: ColorType,
    success?: ColorType;
    warn?: ColorType;
    error?: ColorType;
  }[],
  dark?: ColorRegionType,
  light?: ColorRegionType,
}

export const presetVui = (config: Config): Preset<Theme> => {
  // 去重复
  const themesSet = new Set((config.themes || []).map(item => {
    return {
      ...item,
      success: item.success || "green",
      warn: item.warn || "yellow",
      error: item.error || "red",
    }
  }));

  setAllThemes(Array.from(themesSet), config.dark, config.light);

  return {
    name: "@silentmx/v-ui",
    rules,
    safelist: safeListSet(),
    shortcuts
  }
}