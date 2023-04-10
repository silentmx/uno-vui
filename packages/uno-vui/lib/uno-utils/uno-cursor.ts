import type { DeepReadonly } from "vue";
import { genUnoClassString } from "./uno-class";

/**
 * 生成关于鼠标状态的unocss class string
 * @param loading 是否加载中
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>} 返回结果
 */
export const unoCursor = (
  loading?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
): DeepReadonly<ComputedRef<string>> => {

  const cursorClass = computed(() => {
    return genUnoClassString([
      { classVal: "cursor-wait", conditions: [loading] },
      { classVal: "cursor-not-allowed", conditions: [disabled] },
    ]);
  })

  return readonly(cursorClass);
}