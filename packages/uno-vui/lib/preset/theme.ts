import type { Theme } from "unocss/preset-mini";
import { defaultTheme, prefix } from "./types";

export const theme: Theme = {
  colors: {
    ...[...Object.keys(defaultTheme), ...["default"]].reduce((obj, key) => {
      obj = { ...obj, ...genThemeVar(key) };
      return obj;
    }, {})
  }
}

function genThemeVar(name: string) {
  return {
    [`${name}`]: `rgb(var(${prefix}-${name}))`,
    [`${name}Light`]: `rgb(var(${prefix}-${name}-light))`,
    [`${name}Heavy`]: `rgb(var(${prefix}-${name}-heavy))`,
  }
}