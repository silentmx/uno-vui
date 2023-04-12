import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 文本props
 * @prop `textClass` text class
 */
type TextProps = {
  textClass: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于文字颜色的unocss class string
 * @param theme theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoText = (
  themeType: Ref<ThemeType> | ThemeType,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
): TextProps => {

  const textClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const themeVal = unref(themeType);
    const disabledValue = unref(unref(disabled));

    return genUnoClass([
      // color
      {
        commonCondition: !unoInfo.text['normal']?.hasColor && themeVal != "default" && !unoInfo.bg['normal']?.hasColor,
        options: [
          {
            classVal: `text-${themeVal}`,
            conditions: [
              { condition: unoInfo.border['normal']?.hasBorder },
              { condition: unoInfo.bg['normal']?.op }
            ],
            relation: "or"
          },
        ]
      },
      {
        commonCondition: !unoInfo.text['normal']?.hasColor && unoInfo.bg['normal']?.hasColor,
        options: [
          {
            classVal: "text-[var(--unovui-bg-color)]",
            conditions: [
              { condition: unoInfo.border['normal']?.hasBorder },
              { condition: unoInfo.bg['normal']?.op }
            ],
            relation: "or"
          }
        ]
      },
      {
        commonCondition: !unoInfo.text['normal']?.hasColor && !unoInfo.border['normal']?.hasBorder && !unoInfo.bg['normal']?.op,
        options: [
          {
            classVal: "text-light",
            conditions: [
              { condition: themeVal != "default" },
              { condition: unoInfo.bg['normal']?.hasColor }
            ],
            relation: "or"
          }
        ]
      },
      // hover color
      {
        commonCondition: !unoInfo.text['hover']?.hasColor && !disabledValue && !unoInfo.bg['normal']?.op,
        options: [
          {
            classVal: "hover:text-light",
            conditions: [
              { condition: themeVal == "default" && unoInfo.bg['normal']?.hasColor },
              { condition: themeVal != "default" && unoInfo.border['normal']?.hasBorder },
            ],
            relation: "or"
          }
        ]
      }
    ]);
  });

  return {
    textClass: readonly(textClass),
  }
}