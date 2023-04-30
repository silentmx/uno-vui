import { theme } from "unocss/preset-mini";
import { defaultConfig } from "../constants";
import { PresetConfig } from "../types";

/**
 * gen unocss safe list for uno-vui
 * @param config {@link PresetConfig}
 * @returns { string[] }
 */
export const genSafeList = (config: PresetConfig): string[] => {
  // 添加所有主题颜色白名单给theme-pick使用
  const colorSet = new Set<string>();
  config.themes?.forEach(th => {
    Object.values(th).forEach(c => {
      colorSet.add(`bg-${c}`);
    })
  });

  const iconSet = new Set<string>();
  Object.values(config.icons || {}).forEach(i => {
    iconSet.add(i);
  });

  return [
    ...Array.from(iconSet),
    ...Array.from(colorSet),
    ...genThemeSafeList(),
  ];
}

/**
 * 生成主题变量白名单
 * @example
 * `variants:names-keys-regions`
 * @returns { string []}
 */
function genThemeSafeList(): string[] {
  const safeList = new Set<string>();

  const variants = ["hover"];
  const names = ["bg", "text", "c", "b", "boder"];
  const keys = Object.keys(defaultConfig.themes[0]);
  const regions = Object.keys(theme.colors.blue);

  names.forEach(name => {
    keys.forEach(key => {
      safeList.add(`${name}-${key}`);
      safeList.add(`dark:${name}-${key}`);
      variants.forEach(variant => {
        safeList.add(`${variant}:${name}-${key}`);
        safeList.add(`dark:${variant}:${name}-${key}`);
      });
      regions.forEach(region => {
        safeList.add(`${name}-${key}-${region}`);
        safeList.add(`dark:${name}-${key}-${region}`);
        variants.forEach(variant => {
          safeList.add(`${variant}:${name}-${key}-${region}`);
          safeList.add(`dark:${variant}:${name}-${key}-${region}`);
        });
      })
    })
  });

  return Array.from(safeList);
}

