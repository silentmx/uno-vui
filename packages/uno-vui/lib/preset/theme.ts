import type { Theme } from "unocss/preset-mini";
import { prefix, ThemeKeys } from "./types";

export const theme: Theme = {
  colors: {
    ...ThemeKeys.reduce((obj, key) => {
      obj = { ...obj, ...genThemeVar(key) };
      return obj;
    }, {})
  },
  animation: {
    keyframes: {
      "shadow-ping": "{0%{box-shadow:0 0 0 5px rgba(0, 0, 0, 0.2);transition:0s;}75%,100%{box-shadow:none; transition: 0s;}}",
    },
    counts: {
      'shadow-ping': '1',
    },
    properties: {
      'shadow-ping': {
        transition: '0s'
      }
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