import type { Preflight } from "unocss";
import { parseColor, theme, type Theme } from "unocss/preset-mini";
import { prefix } from "../constants";
import { PresetConfig, ThemeConfig } from "../types";

const configCssContent = `:root {
  ${prefix}-config: $config;
  $vars
}`;

/**
 * 生成css变量，存放在:root 选择器下
 * @param config {@link PresetConfig}
 * @returns {Preflight<Theme>[]} {@link Preflight}
 */
export const genPreflights = (config: PresetConfig): Preflight<Theme>[] => {
  return [
    {
      layer: "theme",
      getCSS: () => genPrelightCss(config),
    },
  ];
}

function genPrelightCss(config: PresetConfig): string {
  // 保存config到css变量
  const configContents = configCssContent.replace("$config", JSON.stringify(config));

  // 默认主题为第一个
  const defaultTheme = config.themes![0] as ThemeConfig;
  const vars = Object.entries(defaultTheme).map(([key, val]) => {
    return Object.keys(theme.colors[val]).map(region => {
      return `${prefix}-${key}-${region}: ${parseColor(`${val}-${region}`, theme)?.cssColor?.components.join(",")};`;
    }).join("\n  ");
  });

  return configContents.replace('$vars', vars.join("\n  "));
}