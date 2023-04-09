import { genUnoClass } from "./uno-class";

export const unoCursor = (
  loading?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
) => {
  return computed(() => {
    return readonly([
      genUnoClass(true, [
        { condition: loading, trueVal: "cursor-wait" },
        { condition: disabled, trueVal: "cursor-not-allowed" }
      ])
    ]);
  });
}