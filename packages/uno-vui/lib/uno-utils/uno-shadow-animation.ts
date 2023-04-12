import type { ComputedRef, DeepReadonly, Ref } from "vue";
import { prefix, type ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 */
type ShadowAnimationProps = {
  shadowAnimateClass: DeepReadonly<ComputedRef<string>>;
  shadowAnimateStyle: DeepReadonly<ComputedRef<string>>,
}

/**
 * 生成关于阴影动画的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoShadowAnimation = (
  theme: Ref<ThemeType> | ThemeType,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): ShadowAnimationProps => {

  const shadowAnimateClass = computed(() => {
    const themeVal = unref(theme);
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));
    const isSingleBorder = unoInfo.border["normal"]?.direction && !(
      ['x', 'y'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['r', 'l', 't', 'b'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['block', 'inline'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['bs', 'be', 'is', 'ie'].every(d => unoInfo.border["normal"]?.direction?.includes(d))
    );

    return genUnoClass([
      {
        commonCondition: !disabledValue && !isSingleBorder,
        options: [
          { classVal: "relative after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit" },
          { classVal: "after:active:shadow-none after:active:transition-0" },
          { classVal: `after:shadow-[0_0_0_var(--unovui-shadowAnimation-size)_var(--unovui-bg-color)]` },
          // active opacity
          {
            classVal: "after:active:op-40",
            conditions: [
              { condition: unoInfo.border['normal']?.hasBorder, prefix: "not" },
              { condition: !(themeVal != "default" || unoInfo.bg['normal']?.hasColor) || unoInfo.bg['normal']?.op }
            ]
          },
          {
            classVal: "after:active:op-100",
            conditions: [
              { condition: unoInfo.border['normal']?.hasBorder },
              { condition: (themeVal != "default" || unoInfo.bg['normal']?.hasColor) && !unoInfo.bg['normal']?.op }
            ],
            relation: "or"
          },
        ]
      },
      // active opacity
    ]);
  });

  const shadowAnimateStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    let style = "";

    // size
    if (unoInfo.border['normal']?.size) {
      style += `${prefix}-shadowAnimation-size: calc( ${unoInfo.border['normal']?.size} + 6px );`;
    } else {
      style += `${prefix}-shadowAnimation-size: 6px;`
    }

    return style;
  });

  return {
    shadowAnimateClass: readonly(shadowAnimateClass),
    shadowAnimateStyle: readonly(shadowAnimateStyle),
  }
}