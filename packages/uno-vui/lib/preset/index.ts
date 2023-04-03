import type { Preset } from "unocss";
import type { Theme } from "unocss/preset-mini";
import { setPreflights } from "./preflights";
import { safelist } from "./safe-list";
import { shortcuts } from "./shortcuts";
import { theme } from "./theme";
import type { PresetConfig, ThemeConfig } from "./types";

const defaultTheme: ThemeConfig = {
  primary: "blue",
  accent: "purple",
  success: "green",
  warn: "yellow",
  error: "red"
}

export function presetUnoVui(config: PresetConfig = {}): Preset<Theme> {
  const {
    themes = [defaultTheme],
    light = 500,
    dark = 600
  } = config;

  const _themes = themes.length > 0 ? themes.map(t => { return { ...defaultTheme, ...t } }) : [defaultTheme];
  // 去重复
  const themes_strings = _themes?.map(v => JSON.stringify(v).trim());
  const removeDupList = Array.from(new Set(themes_strings));
  const res_themes: ThemeConfig[] = removeDupList.map(v => JSON.parse(v));

  return {
    name: "uno-vui/preset",
    theme,
    safelist,
    shortcuts,
    layers: {
      theme: 0,
      default: 1,
    },
    preflights: setPreflights(res_themes, dark, light)
  }
}