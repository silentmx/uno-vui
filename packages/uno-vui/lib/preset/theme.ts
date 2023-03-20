import type { Theme } from "unocss/preset-mini";
import { prefix, type ThemeConfig } from "./types";

export function setTheme(theme: ThemeConfig): Theme {
  const themeKeys = Object.keys(theme);
  themeKeys.push("default");
  return {
    colors: {
      ...themeKeys.reduce((obj, key) => {
        obj = { ...obj, ...genThemeVar(key) };
        return obj;
      }, {})
    }
  }
}

function genThemeVar(name: string) {
  return {
    [`${name}`]: `rgb(var(${prefix}-${name}))`,
    [`${name}Light`]: `rgb(var(${prefix}-${name}-light))`,
    [`${name}Heavy`]: `rgb(var(${prefix}-${name}-heavy))`,
  }
}