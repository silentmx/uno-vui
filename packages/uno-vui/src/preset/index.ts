import { mergeDeep, type Preset } from "unocss";
import type { Theme } from "unocss/preset-mini";
import { defaultConfig } from "./constants";
import { genPreflights } from "./preflights";
import { genSafeList } from "./safe-list";
import { genTheme } from "./theme";
import type { PresetConfig, ThemeConfig } from "./types";

/**
 * preset for uno-vui
 * @param config {@link PresetConfig}
 * @returns { Preset<Theme> }
 */
export const presetUnoVui = (config: PresetConfig = {}): Preset<Theme> => {
  const _config = mergeDeep<PresetConfig>(defaultConfig, config);
  _config.themes = _config.themes?.map(t => {
    return { ...defaultConfig.themes![0], ...t }
  });

  return {
    name: "uno-vui/preset",
    layers: {
      theme: 0,
      default: 1,
    },
    safelist: genSafeList(_config),
    theme: genTheme(_config.themes![0] as ThemeConfig),
    preflights: genPreflights(_config),
  }
}