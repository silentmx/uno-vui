import { defaultDocument, useCssVar } from '@vueuse/core';
import { computed } from 'vue';
import { prefix } from './constants';
import type { IconConfig, PresetConfig, ThemeConfig } from './types';

/**
 * 获取预设配置
 * @returns { ComputedRef<PresetConfig> }
 */
const usePreset = computed<PresetConfig>(() => {
  const configString = useCssVar(`${prefix}-config`, defaultDocument?.body, { initialValue: "{}" });
  return JSON.parse(configString.value);
});

/**
 * 获取预设主题
 */
export const useThemes = computed<ThemeConfig[]>(() => {
  return usePreset.value.themes as ThemeConfig[] || [];
});

/**
 * 获取预设图标
 */
export const usePresetIcons = computed<IconConfig>(() => {
  return usePreset.value.icons as IconConfig;
});