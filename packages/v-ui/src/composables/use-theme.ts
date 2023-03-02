import type { Ref } from 'vue';
import { colorRegion, type ColorRegionType, type ColorType, type ThemeConfig, type ThemeType } from "./types";

const isDark = useDark();

// 默认主题
export const selectedTheme: Ref<ThemeConfig> = ref<ThemeConfig>({
  primary: "blue",
  accent: "purple",
  success: "green",
  warn: "yellow",
  error: "red",
});

let darkRegion: ColorRegionType = "500";
let lightRegion: ColorRegionType = "400";
// 所有主题
export let allThemes: Ref<ThemeConfig[]> = ref<ThemeConfig[]>([]);

export function setAllThemes(
  themes: ThemeConfig[],
  dark: ColorRegionType = darkRegion,
  light: ColorRegionType = lightRegion
) {
  console.log(themes);
  if (themes && themes.length > 0) {
    allThemes.value = themes;
  }
  darkRegion = dark;
  lightRegion = light;
  console.log(allThemes.value);
  selectedTheme.value = allThemes.value[0];
}

export function getTheme(type: ThemeType | "default", el?: Ref<HTMLElement | null>) {
  let color: ColorType = selectedTheme.value.primary;
  if (type !== "default") {
    color = selectedTheme.value[type];
  }

  const region = isDark.value ? darkRegion : lightRegion;
  const regionIndex = colorRegion.findIndex(v => v == region);
  const hoverRegion = colorRegion.at(regionIndex + 1) || colorRegion[9];

  return {
    color,
    isDark,
    region,
    isHover: useElementHover(el),
    hoverRegion,
  }
}