import type { Preset } from "unocss";
import type { Theme } from "unocss/preset-mini";
import { setPreflights } from "./preflights";
import { setSafelist } from "./safe-list";
import { shortcuts } from "./shortcuts";
import { setTheme } from "./theme";
import { defaultTheme, type PresetConfig, type ThemeConfig } from "./types";

export function presetUnoVui(config: PresetConfig): Preset<Theme> {
  const {
    themes = [{ primary: "blue", accent: "purple" }],
    light = 400,
    dark = 500
  } = config;

  const _themes = themes.map(t => { return { ...defaultTheme, ...t } });
  // 去重复
  const themes_strings = _themes?.map(v => JSON.stringify(v).trim());
  const removeDupList = Array.from(new Set(themes_strings));
  const res_themes: ThemeConfig[] = removeDupList.map(v => JSON.parse(v));

  return {
    name: "uno-vui/preset",
    theme: setTheme(res_themes[0]),
    safelist: setSafelist(res_themes[0]),
    shortcuts,
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: setPreflights(res_themes, dark, light)
  }
}