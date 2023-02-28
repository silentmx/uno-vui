import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';
import type { ColorRegionType, ThemeConfig } from '../composables/types';
import { setAllThemes } from '../composables/use-theme';
import { rules } from './rules';
import { safeListSet } from './safe-list';
import { shortcuts } from './shortcuts';

interface Config {
  themes?: ThemeConfig[],
  dark?: ColorRegionType,
  light?: ColorRegionType,
}

export const presetVui = (config: Config): Preset<Theme> => {
  // 去重复
  setAllThemes(Array.from(new Set(config.themes || [])), config.dark, config.light);

  return {
    name: "@silentmx/v-ui",
    rules,
    safelist: safeListSet(),
    shortcuts
  }
}