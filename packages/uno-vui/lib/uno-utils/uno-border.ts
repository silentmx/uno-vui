import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

/**
 * 生成关于边框的unocss class string
 * @param theme {@link ThemeType} 主体色调
 * @param unoClassInfo {@link UnoClassInfo} 基础unocss class 分析结果
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoBorder = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): DeepReadonly<ComputedRef<string>> => {
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
          theme.value != "default"
        ]
      },
      {
        classVal: "b-gray",
        conditions: [
          !unoInfo.border['normal']?.hasColor,
          theme.value == "default"
        ]
      }
    ]);
  });

  return readonly(borderClass);
}