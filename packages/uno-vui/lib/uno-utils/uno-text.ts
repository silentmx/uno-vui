import type { ComputedRef, DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 * @prop `shadowAnimateStyle` width变量
 */
type TextProps = {
  textClass: DeepReadonly<ComputedRef<string>>;
  textStyle: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于文字颜色的unocss class string
 * @param theme theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoText = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean,
  onlyText?: ComputedRef<boolean> | Ref<boolean> | boolean,
): TextProps => {

  const textClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));
    const isOnlyText = unref(unref(onlyText));

    return genUnoClassString([
      // text color
      {
        classVal: `text-${theme.value}`,
        conditions: [
          !unoInfo.text['normal']?.hasColor,
          !unoInfo.bg['normal']?.hasColor,
          (unoInfo.border['normal']?.hasBorder || parseInt(unoInfo.bg['normal']?.op || '100') < 50 || isOnlyText),
          theme.value != "default",
        ]
      },
      {
        classVal: "text-light",
        conditions: [
          !unoInfo.text['normal']?.hasColor,
          !unoInfo.border['normal']?.hasBorder,
          !isOnlyText,
          !unoInfo.bg['normal']?.hasColor,
          !unoInfo.bg['normal']?.op || parseInt(unoInfo.bg['normal']?.op || '100') > 50,
          theme.value != "default"
        ]
      },
      {
        classVal: `text-[var(--un-text-color)]`,
        conditions: [
          !unoInfo.text['normal']?.hasColor,
          !isOnlyText,
          unoInfo.border['normal']?.hasBorder || parseInt(unoInfo.bg['normal']?.op || '100') < 50,
          unoInfo.bg['normal']?.hasColor
        ]
      },
      // text hover color
      {
        classVal: "hover:text-light",
        conditions: [
          !disabledValue,
          !unoInfo.text['normal']?.hasColor,
          !unoInfo.text['hover']?.hasColor,
          !isOnlyText,
          parseInt(unoInfo.bg['normal']?.op || '100') > 50,
          unoInfo.border['normal']?.hasBorder,
          theme.value != "default" || unoInfo.bg['normal']?.hasColor,
        ]
      }
    ]);
  });

  const textStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    let style = "";

    // color
    if (unoInfo.bg['normal']?.color) {
      style += `--un-text-color: ${unoInfo.bg['normal']?.color}`;
    }

    return style;
  })

  return {
    textClass: readonly(textClass),
    textStyle: readonly(textStyle),
  }
}