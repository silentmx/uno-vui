import { defaultDocument, useCssVar, useLocalStorage, type RemovableRef } from '@vueuse/core';
import { parseColor, theme } from 'unocss/preset-mini';
import { computed, type ComputedRef } from 'vue';
import { defaultConfig, prefix } from '../preset/constants';
import type { IconConfig, PresetConfig, ThemeConfig } from '../preset/types';

/**
 * 获取预设配置
 * @returns { ComputedRef<PresetConfig> }
 */
const presetConfig: ComputedRef<PresetConfig | undefined> = computed(() => {
  const configString = useCssVar(`${prefix}-config`, defaultDocument?.body);
  return configString.value ? JSON.parse(configString.value) : undefined;
});

/**
 * 获取预设主题
 */
export const presetThemeConfigs: ComputedRef<ThemeConfig[]> = computed(() => {
  return presetConfig.value?.themes as ThemeConfig[] || [defaultConfig.themes];
});
/**
 * 获取预设图标
 */
export const presetIconConfig: ComputedRef<IconConfig> = computed(() => {
  return presetConfig.value?.icons as IconConfig || defaultConfig.icons;
});

export const themeIndex: RemovableRef<number> = useLocalStorage("unovui-theme-index", 0);
/**
 * 更新主题
 * @param index 主题列表序号，从0开始
 */
export const changeTheme = (index: number) => {
  if (index == 0) {
    defaultDocument?.body.removeAttribute("style");
    themeIndex.value = index;
  } else {
    const config = presetThemeConfigs?.value[index];
    if (config) {
      themeIndex.value = index;
      Object.entries(config).forEach(([key, val]) => {
        Object.keys(theme.colors[val]).forEach(region => {
          defaultDocument?.body.style.setProperty(
            `${prefix}-${key}-${region}`,
            `${parseColor(`${val}-${region}`, theme)?.cssColor?.components.join(",")}`
          )
        })
      })
    } else {
      defaultDocument?.body.removeAttribute("style");
      themeIndex.value = 0;
    }
  }
}