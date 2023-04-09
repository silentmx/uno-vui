import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

export const unoText = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
) => {
  return computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    return readonly([
      // text color
      genUnoClass(!unoInfo.text['normal']?.hasColor, [
        { condition: theme.value == "default", trueVal: "" },
        { condition: unoInfo.border['normal']?.hasBorder, trueVal: `text-${theme.value}`, falseVal: "text-light" }
      ]),
      // text hover color
      genUnoClass(!unoInfo.text['hover']?.hasColor, [
        { condition: theme.value == "default", trueVal: "" },
        { condition: unoInfo.border['normal']?.hasBorder, trueVal: `hover:text-light` }
      ]),
    ]);
  });
}