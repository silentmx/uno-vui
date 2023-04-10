import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * @typedef { Object } 阴影动画props
 * @prop `shadowAnimateClass` 阴影动画class
 * @prop `shadowAnimateStyle` width变量
 */
type BorderProps = {
  borderClass: DeepReadonly<ComputedRef<string>>;
  borderStyle: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于边框的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {@link BorderProps} 返回结果
 */
export const unoBorder = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): BorderProps => {
  const borderClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));

    return genUnoClassString([
      // border radius
      {
        classVal: "b-rd", conditions: [
          !unoInfo.border['normal']?.hasRadius
        ]
      },
      // border size
      {
        classVal: "b",
        conditions: [
          unoInfo.border['normal']?.hasBorder,
          !unoInfo.border['normal']?.size
        ]
      },
      // border color
      {
        classVal: `b-${theme.value}`,
        conditions: [
          !unoInfo.border['normal']?.hasColor,
          !unoInfo.border['normal']?.hasBorder,
          theme.value != "default" || !unoInfo.bg['normal']?.hasColor
        ]
      },
      {
        classVal: `text-[var(--un-border-color)]`,
        conditions: [
          !unoInfo.text['normal']?.hasColor,
          unoInfo.border['normal']?.hasBorder,
          unoInfo.bg['normal']?.hasColor
        ]
      },
      {
        classVal: "b-gray",
        conditions: [
          !unoInfo.border['normal']?.hasColor,
          !unoInfo.bg['normal']?.hasColor,
          theme.value == "default"
        ]
      }
    ]);
  });

  const borderStyle = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    let style = "";

    // color
    if (unoInfo.bg['normal']?.color) {
      style += `--un-border-color: ${unoInfo.bg['normal']?.color}`;
    }

    return style;
  })

  return {
    borderClass: readonly(borderClass),
    borderStyle: readonly(borderStyle),
  }
}