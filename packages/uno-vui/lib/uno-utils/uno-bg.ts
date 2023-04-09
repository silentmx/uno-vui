import type { DeepReadonly, Ref } from "vue";
import type { ThemeType } from "../preset";
import { genUnoClass } from "./uno-class";
import type { UnoClassInfo } from "./uno-type";

export const unoBg = (
  theme: Ref<ThemeType>,
  unoClassInfo: DeepReadonly<ComputedRef<UnoClassInfo>>,
  disabled?: ComputedRef<boolean> | Ref<boolean> | boolean
) => {
  return computed(() => {
    const unoInfo = unref(unref(unoClassInfo));
    return readonly([
      // bg color
      genUnoClass(!unoInfo.bg['normal']?.hasColor, [
        {
          condition: theme.value == "default",
          trueVal: "bg-gray",
          falseVal: `bg-${theme.value}`
        }
      ]),
      // bg opacity
      genUnoClass(!unoInfo.bg['normal']?.op && !unref(unref(disabled)), [
        {
          condition: unoInfo.border['normal']?.hasBorder,
          trueVal: "bg-op-10",
        },
        {
          condition: theme.value == "default" && !unoInfo.bg['normal']?.hasColor,
          trueVal: "bg-op-20"
        }
      ]),
      // bg hover color
      genUnoClass(!unoInfo.bg['hover']?.hasColor || !unref(unref(disabled)), [
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "" },
        {
          condition: theme.value == "default",
          trueVal: "hover:bg-gray-500",
          falseVal: `hover:bg-${theme.value}Heavy`
        }
      ]),
      // bg hover opacity
      genUnoClass(!unoInfo.bg['hover']?.op || !unref(unref(disabled)), [
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "" },
        {
          condition: theme.value == "default",
          trueVal: "hover:bg-op-25"
        }
      ]),
    ]);
  });
}