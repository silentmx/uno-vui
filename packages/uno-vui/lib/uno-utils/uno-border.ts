import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 边框props
 * @prop `borderClass` 边框class
 */
type BorderProps = {
  borderClass: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于边框的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {@link BorderProps} 返回结果
 */
export const unoBorder = (
  themeType: Ref<ThemeType> | ThemeType,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): BorderProps => {

  const borderClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const themeVal = unref(themeType);
    const disabledValue = unref(unref(disabled));

    return genUnoClass([
      // radius
      {
        commonCondition: !unoInfo.border['normal']?.hasRadius,
        options: [
          { classVal: "b-rd" }
        ]
      },
      // size
      {
        commonCondition: unoInfo.border['normal']?.hasBorder,
        options: [
          {
            classVal: "b", conditions: [
              { condition: unoInfo.border['normal']?.size, prefix: "not" }
            ]
          }
        ]
      },
      // color
      {
        commonCondition: unoInfo.border['normal']?.hasBorder && !unoInfo.border['normal']?.hasColor,
        options: [
          {
            classVal: "b-gray", conditions: [
              { condition: themeVal == "default" },
              { condition: unoInfo.bg['normal']?.hasColor, prefix: "not" }
            ]
          },
          {
            classVal: `b-${themeVal}`, conditions: [
              { condition: themeVal != "default" },
              { condition: unoInfo.bg['normal']?.hasColor, prefix: "not" }
            ]
          },
          {
            classVal: `b-[var(--unovui-bg-color)]`, conditions: [
              { condition: unoInfo.bg['normal']?.hasColor }
            ]
          }
        ]
      }
    ]);
  });

  return {
    borderClass: readonly(borderClass),
  }
}