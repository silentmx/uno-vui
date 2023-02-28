import type { Ref } from 'vue';
import type { ColorRegionType, ThemeConfig, ThemeType } from "./types";

const isDark = useDark();

// 默认主题
export const selectedTheme: Ref<ThemeConfig> = ref<ThemeConfig>({
  primary: "blue",
  secondary: "purple"
});

// 所有主题
export let allThemes: { themes: ThemeConfig[], dark: ColorRegionType, light: ColorRegionType } = {
  themes: [selectedTheme.value],
  dark: "700",
  light: "500"
}

export function setAllThemes(themes: ThemeConfig[], dark: ColorRegionType = "700", light: ColorRegionType = "500") {
  if (!themes || themes.length <= 0) {
    themes = [selectedTheme.value];
  }

  allThemes = {
    themes,
    dark,
    light
  };

  selectedTheme.value = allThemes.themes[0];
}

// 获取当前主题颜色
export function getTheme(name: ThemeType, element?: Ref<HTMLElement | null>) {
  let color: string = selectedTheme.value.primary;
  switch (name) {
    case "secondary": {
      color = selectedTheme.value.secondary;
      break;
    }
    case "success": {
      color = "green";
      break;
    }
    case "warn": {
      color = "yellow";
      break;
    }
    case "error": {
      color = "red";
      break;
    }
    case "info": {
      color = "gray";
      break;
    }
    default: {
      break;
    }
  }

  return {
    color,
    isDark,
    isHovered: useElementHover(element),
    region: isDark.value ? allThemes.dark : allThemes.light,
  }
}