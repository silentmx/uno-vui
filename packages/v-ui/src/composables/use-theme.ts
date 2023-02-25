import type { Ref } from 'vue';
import type { ThemeConfig } from "./types";

// 默认主题
export const selectedTheme: Ref<ThemeConfig> = ref<ThemeConfig>({
  primary: "blue",
  secondary: "purple"
});

// 所有主题
export const allThemes: Ref<ThemeConfig[]> = ref<ThemeConfig[]>([
  selectedTheme.value,
  {
    primary: "amber",
    secondary: "gray"
  }
]); 