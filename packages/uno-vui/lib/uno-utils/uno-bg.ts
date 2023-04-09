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
    const disabledValue = unref(unref(disabled))

    return readonly([
      // bg color
      genUnoClass(!unoInfo.bg['normal']?.hasColor, [
        {
          condition: theme.value == "default",
          trueVal: "bg-gray",
          falseVal: `bg-${theme.value}`
        }
      ]),

      // hover bg color
      disabledValue ? [] : genUnoClass(!unoInfo.bg['hover']?.hasColor, [
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "" },
        { condition: theme.value != "default", trueVal: `hover:bg-${theme.value}Heavy` }
      ]),

      // bg opacity
      disabledValue ? genUnoClass(!unoInfo.bg['normal']?.op, [
        { condition: unoInfo.border['normal']?.hasBorder, trueVal: "bg-op-10" },
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "bg-op-60" },
        { condition: theme.value == "default", trueVal: "bg-op-10", falseVal: "bg-op-80" },
      ]) : genUnoClass(!unoInfo.bg['normal']?.op, [
        { condition: unoInfo.border['normal']?.hasBorder, trueVal: "bg-op-10" },
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "bg-op-90" },
        { condition: theme.value == "default", trueVal: "bg-op-10" },
      ]),

      // bg hover opacity
      disabledValue ? [] : genUnoClass(!unoInfo.bg['hover']?.op, [
        { condition: unoInfo.bg['normal']?.hasColor, trueVal: "hover:bg-op-100" },
        { condition: theme.value == "default", trueVal: "hover:bg-op-20" }
      ]),
    ]);
  });
}