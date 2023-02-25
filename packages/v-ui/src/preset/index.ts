import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';
import type { ThemeConfig } from '../composables/types';
import { allThemes, selectedTheme } from '../composables/use-theme';
import { rules } from './rules';
import { safeListSet } from './safe-list';
import { shortcuts } from './shortcuts';

export const presetVui = (config?: ThemeConfig[]): Preset<Theme> => {

  // 去重复
  if (config && config.length > 0) {
    allThemes.value = Array.from(new Set(config));
    selectedTheme.value = allThemes.value[0];
  }

  return {
    name: "@silentmx/v-ui",
    rules,
    safelist: safeListSet(),
    shortcuts
  }
}