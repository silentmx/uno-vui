import { IconConfig, PresetConfig, ThemeConfig } from "@silentmx/preset";
import { defaultDocument, useCssVar } from "@vueuse/core";
import { computed } from 'vue';


const presetConfig = computed<PresetConfig>(() => {
  const configString = useCssVar("--unovui-config", defaultDocument?.body, { initialValue: "{}" });
  return JSON.parse(configString.value);
});

export const themeList = computed<ThemeConfig[]>(() => {
  return presetConfig.value?.themes as ThemeConfig[] || [];
});

export const presetIcons = computed<IconConfig>(() => {
  return presetConfig.value?.icons as IconConfig || {};
});