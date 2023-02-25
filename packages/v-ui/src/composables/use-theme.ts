import type { Ref } from 'vue';
import type { ThemeConfig, ThemeType } from "./types";

// 默认主题
export const selectedTheme: Ref<ThemeConfig> = ref<ThemeConfig>({
  primary: "blue",
  secondary: "purple"
});

// 所有主题
export const allThemes: Ref<ThemeConfig[]> = ref<ThemeConfig[]>([
  selectedTheme.value,
]);

export function getThemeColor(name: ThemeType) {
  switch (name) {
    case "secondary": {
      return selectedTheme.value.secondary;
    }
    case "success": {
      return "green";
    }
    case "warn": {
      return "yellow";
    }
    case "error": {
      return "red";
    }
    case "info": {
      return "gray";
    }
    case "primary":
    default: {
      return selectedTheme.value.primary;
    }
  }
}