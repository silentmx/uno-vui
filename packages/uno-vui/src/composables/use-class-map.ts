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

type classMapKey = "borderStyle" | "borderWidth" | "borderColor" | "borderRadius" |
  "bgColor" | "bgOp" | "textColor" | "other";

/**
 * 按class作用进行分组
 * @param classRef 
 * @returns { DeepReadonly<ComputedRef<Map<classMapKey, string>>> }
 */
export const useClassMap = (
  classRef: ComputedRef<string | undefined> | Ref<string | undefined>
): DeepReadonly<ComputedRef<Map<classMapKey, string>>> => {

  const classMap = computed(() => {
    const classMap = new Map<classMapKey, string>();
    const classList = (unref(classRef) || "").split(" ").filter(c => !!c);
    for (const c of classList) {

      // border styles
      if (["b-", "border-"].some(v => c.includes(v)) && borderStyles.some(s => c.includes(s))) {
        classMap.set("borderStyle", (classMap.get("borderStyle") || "") + ` ${c}`);
        continue;
      }

      // border radius
      if (["rd", "rounded"].some(v => c == v || c.includes(`${v}-`) || c.includes(`-${v}`))) {
        classMap.set("borderRadius", (classMap.get("borderRadius") || "") + ` ${c}`);
        continue;
      }

      // border width
      if (["b", "border"].some(v => c == v) ||
        (["b-", "border-"].some(v => c.includes(v)) && sizeRegexp.test(c))) {
        classMap.set("borderWidth", (classMap.get("borderWidth") || "") + ` ${c}`);
        continue;
      }

      // border color
      if (["b-", "border-"].some(v => c.includes(v)) && colors.some(v => c.includes(v))) {
        classMap.set("borderColor", (classMap.get("borderColor") || "") + ` ${c}`);
        continue;
      }

      // bg color
      if (c.includes("bg-") && colors.some(v => c.includes(v))) {
        classMap.set("bgColor", (classMap.get("bgColor") || "") + ` ${c}`);
        continue;
      }

      // bg opacity
      if (c.includes("bg-op-") || c.includes("bg-opacity-")) {
        classMap.set("bgOp", (classMap.get("bgOp") || "") + ` ${c}`);
        continue;
      }

      // text color
      if (["c-", "color-", "text-"].some(v => c.includes(v)) && colors.some(v => c.includes(v))) {
        classMap.set("textColor", (classMap.get("textColor") || "") + ` ${c}`);
        continue;
      }

      classMap.set("other", (classMap.get("other") || "") + ` ${c}`);
    }

    return classMap;
  });

  return readonly(classMap);
}