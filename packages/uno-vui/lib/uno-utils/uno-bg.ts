import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * 生成关于背景色的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoBg = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): DeepReadonly<ComputedRef<string>> => {

  const bgClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));

    return genUnoClassString([
      // bg color
      {
        classVal: `bg-${theme.value}`,
        conditions: [
          theme.value != "default",
          !unoInfo.bg['normal']?.hasColor
        ]
      },
      {
        classVal: "bg-gray",
        conditions: [
          theme.value == "default",
          !unoInfo.bg['normal']?.hasColor
        ]
      },
      // bg hover color
      {
        classVal: `hover:bg-${theme.value}Heavy`,
        conditions: [
          !disabledValue,
          theme.value != "default",
          !unoInfo.bg['hover']?.hasColor,
          !unoInfo.bg['normal']?.hasColor
        ]
      },
      // bg opacity
      {
        classVal: "bg-op-10",
        conditions: [
          !unoInfo.bg['normal']?.op,
          unoInfo.border['normal']?.hasBorder || theme.value == "default",
        ]
      },
      {
        classVal: "bg-op-85",
        conditions: [
          !disabledValue,
          !unoInfo.border['normal']?.hasBorder,
          unoInfo.bg['normal']?.hasColor
        ]
      },
      {
        classVal: "bg-op-70",
        conditions: [
          disabledValue,
          !unoInfo.border['normal']?.hasBorder,
          unoInfo.bg['normal']?.hasColor || theme.value != "default",
        ],
      },
      // bg hover opacity
      {
        classVal: "hover:bg-op-20",
        conditions: [
          !disabledValue,
          theme.value == "default",
          !unoInfo.bg['hover']?.op,
          !unoInfo.bg['normal']?.hasColor
        ]
      },
      {
        classVal: "hover:bg-op-100",
        conditions: [
          !disabledValue,
          !unoInfo.bg['hover']?.op,
          !unoInfo.bg['normal']?.op,
          unoInfo.bg['normal']?.hasColor || unoInfo.border['normal']?.hasBorder
        ]
      },
      {
        classVal: "hover:bg-op-10",
        conditions: [
          !disabledValue,
          !unoInfo.bg['hover']?.op,
          unoInfo.bg['normal']?.op,
          unoInfo.bg['normal']?.hasColor || unoInfo.border['normal']?.hasBorder
        ]
      }
    ]);
  });

  return readonly(bgClass);
}