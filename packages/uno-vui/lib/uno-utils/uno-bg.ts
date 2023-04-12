import type { ComputedRef, DeepReadonly, Ref } from "vue";
import { prefix, type ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 背景props
 * @prop `bgClass` bg class
 * @prop `bgStyle` bg style
 */
type BgProps = {
  bgClass: DeepReadonly<ComputedRef<string>>;
  bgStyle: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于背景色的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns `bgProps` {@link BgProps} 返回结果
 */
export const unoBg = (
  theme: Ref<ThemeType> | ThemeType,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): BgProps => {

  const bgClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));
    const themeValue = unref(theme);

    return genUnoClass([
      // bg color
      {
        commonCondition: !unoInfo.bg['normal']?.hasColor,
        options: [
          {
            classVal: `bg-${themeValue}`,
            conditions: [
              { condition: themeValue != "default" }
            ]
          },
          {
            classVal: `bg-gray`,
            conditions: [
              { condition: themeValue == "default" }
            ]
          }
        ]
      },
      // bg hover color
      {
        commonCondition: !unoInfo.bg['normal']?.hasColor && !unoInfo.bg['hover']?.hasColor && !disabledValue,
        options: [
          {
            classVal: `hover:bg-${themeValue}Heavy`,
            conditions: [
              { condition: themeValue != "default" }
            ]
          }
        ]
      },
      // bg opacity
      {
        commonCondition: !unoInfo.bg['normal']?.op,
        options: [
          {
            classVal: "bg-op-10",
            conditions: [
              { condition: themeValue == "default" || unoInfo.border['normal']?.hasBorder },
              { condition: !unoInfo.bg['normal']?.hasColor || unoInfo.border['normal']?.hasBorder }
            ]
          },
          {
            classVal: "bg-op-70",
            conditions: [
              { condition: disabledValue },
              { condition: unoInfo.border['normal']?.hasBorder, prefix: "not" },
              { condition: unoInfo.bg['normal']?.hasColor || themeValue != "default" },
            ]
          },
          {
            classVal: "bg-op-85",
            conditions: [
              { condition: disabledValue, prefix: "not" },
              { condition: unoInfo.border['normal']?.hasBorder, prefix: "not" },
              { condition: unoInfo.bg['normal']?.hasColor },
            ]
          },
        ]
      },
      // bg hover opacity
      {
        commonCondition: !unoInfo.bg['hover']?.op && !disabledValue,
        options: [
          {
            classVal: "hover:bg-op-10",
            conditions: [
              { condition: parseInt(unoInfo.bg['normal']?.op || '100') < 10 }
            ]
          },
          {
            classVal: "hover:bg-op-20",
            conditions: [
              { condition: unoInfo.bg['normal']?.hasColor, prefix: "not" },
              { condition: themeValue == "default" },
            ]
          },
          {
            classVal: "hover:bg-op-100",
            conditions: [
              { condition: parseInt(unoInfo.bg['normal']?.op || '100') > 70 },
              { condition: unoInfo.bg['normal']?.hasColor },
            ]
          }
        ]
      }
    ]);
  });

  const bgStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const themeValue = unref(theme);
    let style = "";

    // color
    if (unoInfo.bg['normal']?.color) {
      style += `${prefix}-bg-color: ${unoInfo.bg['normal']?.color}`;
    } else {
      if (themeValue == "default") {
        // gray
        style += `${prefix}-bg-color: rgb(156, 163, 175)`;
      } else {
        style += `${prefix}-bg-color: rgb(var(${prefix}-${themeValue}))`;
      }
    }

    return style;
  });

  return {
    bgClass: readonly(bgClass),
    bgStyle: readonly(bgStyle),
  }
}