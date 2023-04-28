import { defaultDocument, useCssVar } from '@vueuse/core';
import { computed, type ComputedRef } from 'vue';
import { prefix } from './constants';
import type { IconConfig, PresetConfig, ThemeConfig } from './types';

/**
 * 获取预设配置
 * @returns { ComputedRef<PresetConfig> }
 */
const usePreset: ComputedRef<PresetConfig | undefined> = computed(() => {
  const configString = useCssVar(`${prefix}-config`, defaultDocument?.body);
  return configString ? JSON.parse(configString.value) : undefined;
});

/**
 * 获取预设主题
 */
export const useThemes: ComputedRef<ThemeConfig[] | undefined> = computed(() => {
  return usePreset.value?.themes as ThemeConfig[] || [];
});

/**
 * 获取预设图标
 */
export const usePresetIcons: ComputedRef<IconConfig | undefined> = computed(() => {
  return usePreset.value?.icons as IconConfig || undefined;
});