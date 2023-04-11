import type { ComputedRef, DeepReadonly, Ref } from "vue";
import { prefix, type ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 * @prop `shadowAnimateStyle` width变量
 */
type ShadowAnimationProps = {
  shadowAnimateClass: DeepReadonly<ComputedRef<string>>;
  shadowAnimateStyle: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于阴影动画的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoShadowAnimation = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): ShadowAnimationProps => {

  const shadowAnimateClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));
    const isSingleBorder = unoInfo.border["normal"]?.direction && !(
      ['x', 'y'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['r', 'l', 't', 'b'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['block', 'inline'].every(d => unoInfo.border["normal"]?.direction?.includes(d)) ||
      ['bs', 'be', 'is', 'ie'].every(d => unoInfo.border["normal"]?.direction?.includes(d))
    );

    return genUnoClassString([
      // base class
      {
        classVal: "relative after:content-none after:absolute after:inset-0 after:op-0 after:transition-600 after:rd-inherit",
        conditions: [!disabledValue && !isSingleBorder]
      },
      // base active class
      {
        classVal: "after:active:shadow-none after:active:transition-0",
        conditions: [!disabledValue && !isSingleBorder]
      },
      // color and size var
      {
        classVal: "after:shadow-[0_0_0_var(--un-shadowAnimation-size)_var(--un-shadowAnimation-color)]",
        conditions: [!disabledValue && !isSingleBorder]
      },
      // active opacity
      {
        classVal: "after:active:op-40",
        conditions: [
          !disabledValue && !isSingleBorder,
          !unoInfo.border['normal']?.hasBorder &&
          (theme.value == "default" || parseInt(unoInfo.bg['normal']?.op || '100') < 50),
        ]
      },
      {
        classVal: "after:active:op-100",
        conditions: [
          !disabledValue && !isSingleBorder,
          unoInfo.border['normal']?.hasBorder ||
          (theme.value != "default" && parseInt(unoInfo.bg['normal']?.op || '100') > 50),
        ]
      },
    ]);
  });

  const shadowAnimateStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    let style = "";

    // size
    if (unoInfo.border['normal']?.size) {
      style += `--un-shadowAnimation-size: calc( ${unoInfo.border['normal']?.size} + 6px );`;
    } else {
      style += `--un-shadowAnimation-size: 6px;`
    }

    // color
    if (unoInfo.bg['normal']?.color) {
      style += `--un-shadowAnimation-color: ${unoInfo.bg['normal']?.color}`;
    } else {
      if (theme.value == "default") {
        // gray
        style += `--un-shadowAnimation-color: rgb(156, 163, 175)`;
      } else {
        style += `--un-shadowAnimation-color: rgb(var(${prefix}-${theme.value}))`;
      }
    }

    return style;
  });

  return {
    shadowAnimateClass: readonly(shadowAnimateClass),
    shadowAnimateStyle: readonly(shadowAnimateStyle),
  }
}