import { unref, type ComputedRef, type DeepReadonly } from 'vue';

/**
 * 生成关于鼠标状态的unocss class string
 * @param loading 是否加载中
 * @param disabled 是否被禁用
 * @returns {DeepReadonly<ComputedRef<string>>}
 */
export const useCursorClass = (
  loading?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
): DeepReadonly<ComputedRef<string>> => {

  const cursorClass = computed(() => {
    if (unref(loading)) {
      return "cursor-wait";
    } else if (unref(disabled)) {
      return "cursor-not-allowed"
    }
    return "";
  })

  return readonly(cursorClass);
}