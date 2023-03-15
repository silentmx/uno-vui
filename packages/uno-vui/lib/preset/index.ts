import type { Preset } from "unocss";
import type { Theme } from "unocss/preset-mini";
import { setPreflights } from "./preflights";
import { safelist } from "./safe-list";
import { shortcuts } from "./shortcuts";
import { theme } from "./theme";
import { defaultConfig, defaultTheme, type PresetConfig } from "./types";

export function presetUnoVui(config: PresetConfig = defaultConfig): Preset<Theme> {
  config = { ...defaultConfig, ...config };
  if (!config.themes?.length) {
    config.themes = [defaultTheme];
  } else {
    config.themes = config.themes.map(v => {
      return { ...defaultTheme, ...v };
    });

    // 去重复
    const strings = config.themes?.map(v => JSON.stringify(v).trim());
    const removeDupList = Array.from(new Set(strings));
    config.themes = removeDupList.map(v => JSON.parse(v));
  }

  return {
    name: "uno-vui/preset",
    theme,
    safelist,
    shortcuts,
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: setPreflights(config)
  }
}