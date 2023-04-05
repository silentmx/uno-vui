import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genCompClass, getAttrsClass } from "./use-class";
import { hasParseableColor } from "./use-unocss";

const shadowColorRegList = [
  /after[:-]shadow-(\S+)/gm
];

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 */
type ShadowAnimationProps = {
  shadowAnimateClass: DeepReadonly<ComputedRef<string[]>>
}

export const useShadowAnimation = (
  type: Ref<ThemeType>,
  hasBorder?: ComputedRef<boolean> | Ref<boolean> | boolean,
  text?: ComputedRef<boolean> | Ref<boolean> | boolean,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): ShadowAnimationProps => {

  const shadowAnimateClass = computed(() => {
    if (unref(unref(disabled))) {
      return []
    } else {
      const hasColor = shadowColorRegList.some(reg => handlerShadowColorReg(getAttrsClass().matchAll(reg)));
      return [
        // base
        "after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit",
        "after:active:shadow-none after:active:transition-0",

        genCompClass([
          // 宽度
          {
            condition: unref(unref(hasBorder)),
            trueVal: "after:shadow-[0_0_0_7px_var(--un-shadow-color)]",
            falseVal: "after:shadow-[0_0_0_6px_var(--un-shadow-color)]",
          },
          // 颜色
          {
            condition: !hasColor && unref(type) == "default",
            trueVal: `after:shadow-light-900 dark:after:shadow-dark-200`,
          },
          {
            condition: !hasColor && unref(type) != "default",
            trueVal: `after:shadow-${unref(type)}Heavy`,
          },
          // 透明度
          {
            condition: unref(unref(text)) && !unref(unref(hasBorder)) && unref(type) != "default",
            trueVal: "after:active:op-20 dark:after:active:op-30",
            falseVal: "after:active:op-50 dark:after:active:op-90"
          }
        ], true)
      ];
    }
  });

  return {
    shadowAnimateClass: readonly(shadowAnimateClass)
  }
}

function handlerShadowColorReg(matchAllArray: IterableIterator<RegExpMatchArray> | null): boolean {
  if (matchAllArray == null) {
    return false;
  }

  return Array.from(matchAllArray).some(match => {
    const [, c]: string[] = match;
    if (c.includes("url") || hasParseableColor(c)) {
      return true;
    }
  })
}