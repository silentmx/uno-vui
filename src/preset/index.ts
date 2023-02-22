import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';
import { rules } from './rules';
import { safelist } from './safe-list';
import { shortcuts } from './shortcuts';
import { themeSet } from './theme';

export const presetVui = (): Preset<Theme> => {
  return {
    name: "@silentmx/v-ui",
    theme: themeSet(),
    rules,
    safelist,
    shortcuts
  }
}