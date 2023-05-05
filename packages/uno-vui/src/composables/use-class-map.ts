import { theme } from 'unocss/preset-mini';
import { computed, type ComputedRef, type DeepReadonly } from 'vue';

const sizeRegexp = new RegExp(/(\d+(?:px|rem|em)?)$/);
const colors = [
  "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "rgb", "rgba", "url", "#",
  "primary", "accent", "default", "success", "wan", "error",
  ...Object.keys(theme.colors)
];

const globalKeywords = [
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset",
];

const borderStyles = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "hidden",
  "none",
  "groove",
  "ridge",
  "inset",
  "outset",
  ...globalKeywords
];

type Variants = "hover" | "focus-within";
type Keys = "border-style" | "border-width" | "border-color" | "border-radius" |
  "bg-color" | "bg-opacity" | "text-color" | "others";

type MapKeys = Keys | `${Variants}-${Keys}`;

/**
 * 按class作用进行分组
 * @param classRef 
 * @returns { DeepReadonly<ComputedRef<Map<classMapKey, string>>> }
 */
export const useClassMap = (
  classRef: ComputedRef<string | undefined> | Ref<string | undefined>
): DeepReadonly<ComputedRef<Map<MapKeys, string>>> => {

  const classMap = computed(() => {
    const classMap = new Map<MapKeys, string>();
    (unref(classRef) || "").split(" ").filter(c => !!c).forEach(c => {
      const key = genMapKey(c);
      classMap.set(key, (classMap.get(key) || "") + ` ${c}`);
    });
    return classMap;
  });

  return readonly(classMap);
}

function genMapKey(classVal: string): MapKeys {
  const prefix = classVal.includes("focus-within") ?
    "focus-within-" :
    classVal.includes("hover") ? "hover-" : "";

  // border-style
  if (["b-", "border-"].some(v => classVal.includes(v)) && borderStyles.some(s => classVal.endsWith(s))) {
    return `${prefix}border-style`;
  }

  // border-radius
  if (["rd", "rounded"].some(v => classVal.includes(v))) {
    return `${prefix}border-radius`;
  }

  // border-color
  if (["b-", "border-"].some(v => classVal.includes(v)) && colors.some(v => classVal.includes(v))) {
    return `${prefix}border-color`;
  }

  // border-width
  if (["b", "border"].some(v => classVal == v) ||
    (["b-", "border-"].some(v => classVal.includes(v)) && sizeRegexp.test(classVal))) {
    return `${prefix}border-width`;
  }

  // bg color
  if (classVal.includes("bg-") && colors.some(v => classVal.includes(v))) {
    return `${prefix}bg-color`;
  }

  // bg opacity
  if (classVal.includes("bg-op-") || classVal.includes("bg-opacity-")) {
    return `${prefix}bg-opacity`;
  }

  // text color
  if (["c-", "color-", "text-"].some(v => classVal.includes(v)) && colors.some(v => classVal.includes(v))) {
    return `${prefix}text-color`;
  }

  // others
  return `${prefix}others`;
}