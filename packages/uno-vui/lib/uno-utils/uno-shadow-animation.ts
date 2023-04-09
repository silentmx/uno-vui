import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 * @prop `shadowAnimateStyle` width变量
 */
type ShadowAnimationProps = {
  shadowAnimateClass: DeepReadonly<ComputedRef<string[]>>;
  shadowAnimateStyle: DeepReadonly<ComputedRef<string>>;
}

export const unoShadowAnimation = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): ShadowAnimationProps => {

  const shadowAnimateClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    return [
      genUnoClass(!unref(unref(disabled)), [
        {
          condition: true,
          trueVal: "relative after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit"
        },
        {
          condition: true,
          trueVal: "after:active:shadow-none after:active:transition-0 after:shadow-[0_0_0_var(--un-shadowAnimation-size)_var(--un-shadow-color)]"
        },
      ], true),
      genUnoClass(!unref(unref(disabled)), [
        // color
        { condition: unoInfo.afterShadow['normal']?.hasColor, trueVal: `` },
        { condition: theme.value == "default", trueVal: "after:shadow-gray", falseVal: `after:shadow-${theme.value}Heavy` },
      ]),
      genUnoClass(!unref(unref(disabled)), [
        // opacity
        {
          condition: theme.value == "default",
          trueVal: "after:active:op-20 dark:after:active:op-30",
          falseVal: `after:active:op-50 dark:after:active:op-90`
        },
      ]),
    ];
  });

  const shadowAnimateStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    if (unoInfo.border['normal']?.size) {
      return `--un-shadowAnimation-size: calc( ${unoInfo.border['normal']?.size} + 6px )`;
    } else {
      return `--un-shadowAnimation-size: 6px;`
    }
  });

  return {
    shadowAnimateClass: readonly(shadowAnimateClass),
    shadowAnimateStyle: readonly(shadowAnimateStyle),
  }
}