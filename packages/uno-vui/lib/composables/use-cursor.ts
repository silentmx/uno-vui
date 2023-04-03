import type { ComputedRef, DeepReadonly, Ref } from "vue";
import { genCompClass } from "./use-class";

/**
 * @typedef { Object } 鼠标状态props
 * @prop { DeepReadonly<ComputedRef<string[]>> } cursorClass: 鼠标样式class
 */
type CursorProps = {
  cursorClass: DeepReadonly<ComputedRef<string[]>>
}

/**
 * 计算鼠标状态 unocss
 * @param {Ref<boolean> | boolean} loading 鼠标加载中
 * @param {Ref<boolean> | boolean} disabled 鼠标disabled
 * @returns `cursorProps` {@link CursorProps } 鼠标状态props
 */
export function useCursor(
  loading?: Ref<boolean> | boolean,
  disabled?: Ref<boolean> | boolean,
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