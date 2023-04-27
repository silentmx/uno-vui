import { defaultDocument, useCssVar } from "@vueuse/core";
import { computed } from 'vue';

const presetConfig = computed<any>(() => {
  const configString = useCssVar("--unovui-config", defaultDocument?.body, { initialValue: "{}" });
  return JSON.parse(configString.value);
});

export const themeList = computed<any[]>(() => {
  return presetConfig.value?.themes as any[] || [];
});

export const presetIcons = computed<any>(() => {
  return presetConfig.value?.icons as any || {};
});