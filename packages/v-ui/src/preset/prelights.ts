import { parseColor } from '@unocss/preset-mini/utils';
import type { Preflight } from "unocss";
import { theme } from 'unocss/preset-mini';
import type { Theme } from 'unocss/preset-uno';
import { colorRegion, type ColorRegionType, type ColorType } from '../composables/types';
import { prefix, ThemeList, type PresetConfig, type ThemeConfig, type ThemeType } from "./config";

const defaultThemes: ThemeConfig[] = [
  { primary: "blue", accent: "purple", success: "green", warn: "yellow", error: "red" }
];
const defaultLight: ColorRegionType = "400";
const defaultDark: ColorRegionType = "500";
const defaultColor: {
  [key: string]: ColorType
} = {
  success: "green",
  warn: "yellow",
  error: "red"
}

export function setPrelight(config?: PresetConfig): Preflight<Theme>[] {
  const _config = {
    themes: config?.themes ?? defaultThemes,
    light: config?.light ?? defaultLight,
    dark: config?.dark ?? defaultDark,
  }

  // 添加可选颜色默认值
  _config.themes = _config.themes?.map(v => {
    v.success = v.success || defaultColor.success;
    v.warn = v.warn || defaultColor.warn;
    v.error = v.error || defaultColor.error;
    return v;
  });

  // 去重复
  const strings = _config.themes?.map(v => JSON.stringify(v).trim());
  const removeDupList = Array.from(new Set(strings));
  _config.themes = removeDupList.map(v => JSON.parse(v));

  return [
    {
      layer: "theme",
      getCSS: () => genPrelightCss(config?.themes || defaultThemes, config?.dark || defaultDark, config?.light || defaultLight),
    }
  ]
}

function genPrelightCss(themes: ThemeConfig[], dark: ColorRegionType, light: ColorRegionType): string {

  const css = themes.reduce((acc, cur, index) => {
    const items = index == 0 ? [':root', '.dark'] : [`.${cur.primary}-${cur.accent}`, `.dark .${cur.primary}-${cur.accent}`];
    acc += items.map(item => {
      let itemCss = `${item} {\n  `;
      itemCss += ThemeList.map(key => {
        const color = key == "default" ? cur.primary : cur[key] || defaultColor[key];
        return genCssVar(key, color, `${item.includes('dark') ? dark : light}`);
      }).join("\n  ")
      itemCss += `\n}\n`;
      return itemCss;
    }).join("\n");
    acc += "\n";
    return acc;
  }, "");

  return css;
}

function genCssVar(key: ThemeType, color: ColorType, region: ColorRegionType): string {
  return ["", "light", "heavy"].map(type => {
    const regionIndex = colorRegion.findIndex(c => c == region);
    let _region = region;
    if (type == "light") {
      _region = colorRegion.at(regionIndex - 1) || colorRegion[0];
    }
    if (type == "heavy") {
      _region = colorRegion.at(regionIndex + 1) || colorRegion[9];
    }
    return `${prefix}-${key}${type ? `-${type}` : ""}: ${parseColor(color + "-" + _region, theme)?.cssColor?.components.join(",")};`;
  }).join("\n  ");
}