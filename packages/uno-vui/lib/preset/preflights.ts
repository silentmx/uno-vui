import type { Preflight } from "unocss";
import { parseColor, theme, type Theme } from "unocss/preset-mini";
import { ColorRegion, prefix, type ColorRegionType, type ColorType, type ThemeConfig } from "./types";

export function setPreflights(themes: ThemeConfig[], dark: ColorRegionType, light: ColorRegionType): Preflight<Theme>[] {
  return [
    {
      layer: "theme",
      getCSS: () => genPrelightCss(themes, dark, light),
    }
  ];
}

function genPrelightCss(themes: ThemeConfig[], dark: ColorRegionType, light: ColorRegionType): string {

  const css = themes.reduce((acc, cur, index) => {
    const items = index == 0 ? [':root', '.dark'] : [`.${cur.primary}-${cur.accent}`, `.dark .${cur.primary}-${cur.accent}`];
    acc += items.map(item => {
      let itemCss = `${item} {\n  `;
      itemCss += Object.entries({ ...cur, ...{ default: "gray" as ColorType } }).map(([key, val]) => {
        const color = val;
        return genCssVar(key, color, item.includes('dark') ? dark : light);
      }).join("\n  ")
      itemCss += `\n}\n`;
      return itemCss;
    }).join("\n");
    acc += "\n";
    return acc;
  }, "");

  return css;
}

function genCssVar(key: string, color: ColorType, region: ColorRegionType): string {
  return ["", "light", "heavy"].map(type => {
    const regionIndex = ColorRegion.findIndex(c => c == `${region}`);
    let _region = `${region}`;
    if (type == "light") {
      _region = ColorRegion.at(regionIndex - 1) || ColorRegion[0];
    }
    if (type == "heavy") {
      _region = ColorRegion.at(regionIndex + 1) || ColorRegion[9];
    }
    return `${prefix}-${key}${type ? `-${type}` : ""}: ${parseColor(color + "-" + _region, theme)?.cssColor?.components.join(",")};`;
  }).join("\n  ");
}