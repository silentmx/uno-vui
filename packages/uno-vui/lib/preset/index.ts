import { mergeDeep, type Preset } from 'unocss';
import type { Theme } from 'unocss/preset-mini';
import { setPreflights } from './preflights';
import { safelist } from "./safe-list";
import { shortcuts } from './shortcuts';
import { setTheme } from './theme';
import type { ThemeConfig } from './types';
import { defaultConfig, type PresetConfig } from './types';
export * from './types';

/**
 * Unovui组件库预设
 * @param {PresetConfig} config {@link PresetConfig} 预设配置
 * @returns {Preset<Theme>} {@link Preset} `preset`
 */
export function presetUnoVui(config: PresetConfig = {}): Preset<Theme> {
  const _config = mergeDeep<PresetConfig>(defaultConfig, config);
  _config.themes = _config.themes?.map(t => {
    return { ...defaultConfig.themes![0], ...t }
  });

  return {
    name: "uno-vui/preset",
    theme: setTheme(_config.themes![0] as ThemeConfig),
    safelist,
    shortcuts,
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: setPreflights(_config),
  }
}