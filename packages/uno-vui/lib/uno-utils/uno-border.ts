import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

export const unoBorder = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
) => {
  return computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    return readonly([
      // border radius
      genUnoClass(!unoInfo.border['normal']?.hasRadius, [
        { condition: true, trueVal: "b-rd" }
      ]),
      // border size
      genUnoClass(unoInfo.border['normal']?.hasBorder, [
        { condition: unoInfo.border['normal']?.size, falseVal: "b" }
      ]),
      // border color
      genUnoClass(unoInfo.border['normal']?.hasBorder, [
        { condition: unoInfo.border['normal']?.hasColor, trueVal: "" },
        { condition: theme.value == "default", trueVal: "b-gray", falseVal: `b-${theme.value}` }
      ]),
    ]);
  });
}