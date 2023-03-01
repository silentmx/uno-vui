import type { Ref } from 'vue';
import type { ColorRegionType, ColorType, ThemeConfig, ThemeType } from "./types";

// 默认主题
export const selectedTheme: Ref<ThemeConfig> = ref<ThemeConfig>({
  primary: "blue",
  accent: "purple",
  success: "green",
  warn: "yellow",
  error: "red",
});

// 所有主题
let darkRegion: ColorRegionType = "700";
let lightRegion: ColorRegionType = "500";
export let allThemes: ThemeConfig[] = [selectedTheme.value];

export function setAllThemes(
  themes: ThemeConfig[],
  dark: ColorRegionType = darkRegion,
  light: ColorRegionType = lightRegion
) {
  if (themes && themes.length > 0) {
    allThemes = themes;
  }

  console.log(allThemes);
  darkRegion = dark;
  lightRegion = light;
  selectedTheme.value = allThemes[0];
}

// 获取当前主题颜色
export function getTheme(name: ThemeType | "default") {
  let color: ColorType = selectedTheme.value.primary;
  if (name !== "default") {
    color = selectedTheme.value[name];
  }

  return {
    color,
    darkRegion,
    lightRegion
  }
}