import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClassString } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

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
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
): DeepReadonly<ComputedRef<string>> => {

  const textClass = computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    const disabledValue = unref(unref(disabled));

    return genUnoClassString([
      // text color
      {
        classVal: `text-${theme.value}`,
        conditions: [
          !unoInfo.text['normal']?.hasColor,
          unoInfo.border['normal']?.hasBorder,
          theme.value != "default",
        ]
      },
      {
        classVal: "text-light",
        conditions: [
          theme.value != "default",
          !unoInfo.text['normal']?.hasColor,
          !unoInfo.border['normal']?.hasBorder,
        ]
      },
      // text hover color
      {
        classVal: "hover:text-light",
        conditions: [
          !disabledValue,
          theme.value != "default",
          !unoInfo.text['normal']?.hasColor,
          !unoInfo.text['hover']?.hasColor,
          unoInfo.border['normal']?.hasBorder,
        ]
      }
    ]);
  });

  return readonly(textClass);
}