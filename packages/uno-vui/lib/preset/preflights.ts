import type { Preflight } from "unocss";
import { parseColor, theme, type Theme } from "unocss/preset-mini";
import { prefix, type PresetConfig, type ThemeConfig } from "./types";

const cssContent = `:root {
  ${prefix}-config: $config;
  $vars
}`;

/**
 * :root 生成css变量,只生成一组变量，通过改变变量的值来达到切换主题颜色的目的
 * @param config {@link PresetConfig}
 * @returns {Preflight<Theme>[]} {@link Preflight}
 */
export const setPreflights = (config: PresetConfig): Preflight<Theme>[] => {
  return [
    {
      layer: "theme",
      getCSS: () => genPrelightCss(config),
    },
  ];
}

/**
 * 生成结果如下
 * ```css
 * :root {
 *   --unovui-config: $config;
 *   --unovui-primary-50: #faf5ff;
 *   --unovui-primary-100: #f3e8ff;
 *   ...
 * }
 * ```
 * @param config {@link PresetConfig}
 * @returns {string}
 */
function genPrelightCss(config: PresetConfig): string {
  // 保存config到css变量
  const configContents = cssContent.replace("$config", JSON.stringify(config));

  // 默认主题为第一个
  const defaultTheme = config.themes![0] as ThemeConfig;
  const vars = Object.entries(defaultTheme).map(([key, val]) => {
    return Object.keys(theme.colors[val]).map(region => {
      return `${prefix}-${key}-${region}: ${parseColor(`${val}-${region}`, theme)?.cssColor?.components.join(",")};`;
    }).join("\n  ");
  });

  return configContents.replace('$vars', vars.join("\n  "));
}