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
      "shadow-ping": "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
    },
    timingFns: {
      'shadow-ping': 'cubic-bezier(0,0,.2,1)',
    },
    counts: {
      'shadow-ping': 'infinite',
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