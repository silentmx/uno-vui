import { defaultDocument, useCssVar } from '@vueuse/core';
import { computed, type ComputedRef } from 'vue';
import { prefix } from '../preset/constants';
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
export const presetThemeConfigs: ComputedRef<ThemeConfig[] | undefined> = computed(() => {
  return presetConfig.value?.themes as ThemeConfig[] || [];
});

/**
 * 获取预设图标
 */
export const presetIconConfig: ComputedRef<IconConfig | undefined> = computed(() => {
  return presetConfig.value?.icons as IconConfig || undefined;
});