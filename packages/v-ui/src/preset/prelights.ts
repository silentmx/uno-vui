import { parseColor } from '@unocss/preset-mini/utils';
import type { Preflight } from "unocss";
import { theme } from 'unocss/preset-mini';
import type { Theme } from 'unocss/preset-uno';
import { colorRegion } from '../composables/types';
import { prefix, type PresetConfig } from "./config";

export function setPrelight(config?: PresetConfig): Preflight<Theme>[] {
  config = {
    themes: config?.themes ?? [{ primary: "blue", accent: "purple", success: "green", warn: "yellow", error: "red" }],
    light: config?.light ?? "400",
    dark: config?.dark ?? "500",
  }

  // 添加可选颜色默认值
  config.themes?.map(v => {
    v.success = v.success || "green";
    v.warn = v.warn || "yellow";
    v.error = v.error || "red";
    return v;
  });

  // 去重复
  const strings = config.themes?.map(v => JSON.stringify(v).trim());
  const removeDupList = Array.from(new Set(strings));
  config.themes = removeDupList.map(v => JSON.parse(v));
  const lightIndex = colorRegion.findIndex(v => v == config?.light);
  const darkIndex = colorRegion.findIndex(v => v == config?.dark);
  const hoverLight = colorRegion.at(lightIndex + 1) || colorRegion[9];
  const hoverDark = colorRegion.at(darkIndex + 1) || colorRegion[9];

  const css = config.themes.reduce((acc, cur, index) => {
    // 默认主题
    acc += `
${index == 0 ? ':root' : `.${cur.primary}-${cur.accent}`} {
  ${prefix}-default: ${parseColor(cur.primary + `-${config?.light}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-primary: ${parseColor(cur.primary + `-${config?.light}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-accent: ${parseColor(cur.accent + `-${config?.light}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-success: ${parseColor(cur.success + `-${config?.light}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-warn: ${parseColor(cur.warn + `-${config?.light}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-error: ${parseColor(cur.error + `-${config?.light}`, theme)?.cssColor?.components.join(',')};

  ${prefix}-default-h: ${parseColor(cur.primary + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-primary-h: ${parseColor(cur.primary + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-accent-h: ${parseColor(cur.accent + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-success-h: ${parseColor(cur.success + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-warn-h: ${parseColor(cur.warn + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-error-h: ${parseColor(cur.error + `-${hoverLight}`, theme)?.cssColor?.components.join(',')};
}

${index == 0 ? '.dark' : `.dark .${cur.primary}-${cur.accent}`}{
  ${prefix}-default: ${parseColor(cur.primary + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-primary: ${parseColor(cur.primary + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-accent: ${parseColor(cur.accent + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-success: ${parseColor(cur.success + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-warn: ${parseColor(cur.warn + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-error: ${parseColor(cur.error + `-${config?.dark}`, theme)?.cssColor?.components.join(',')};

  ${prefix}-default-h: ${parseColor(cur.primary + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-primary-h: ${parseColor(cur.primary + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-accent-h: ${parseColor(cur.accent + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-success-h: ${parseColor(cur.success + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-warn-h: ${parseColor(cur.warn + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
  ${prefix}-error-h: ${parseColor(cur.error + `-${hoverDark}`, theme)?.cssColor?.components.join(',')};
}
`;
    return acc;
  }, '');

  return [
    {
      layer: "theme",
      getCSS: () => css,
    }
  ]
}