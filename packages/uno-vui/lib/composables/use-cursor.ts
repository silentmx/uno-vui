import type { ComputedRef, DeepReadonly, Ref } from "vue";
import { genCompClass } from "./use-class";

/**
 * @typedef { Object } 鼠标状态props
 * @prop `cursorClass` 鼠标样式class
 */
type CursorProps = {
  cursorClass: DeepReadonly<ComputedRef<string[]>>
}

/**
 * 计算鼠标状态 unocss
 * @param loading 鼠标加载中
 * @param disabled 鼠标disabled
 * @returns `cursorProps` {@link CursorProps } 鼠标状态props
 */
export function useCursor(
  loading?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
) {
  const cursorClass = computed(() => {
    return [
      genCompClass([
        { condition: unref(loading), trueVal: "cursor-wait" },
        { condition: unref(disabled), trueVal: "cursor-not-allowed" }
      ])
    ]
  });

  return {
    cursorClass: readonly(cursorClass)
  }
}