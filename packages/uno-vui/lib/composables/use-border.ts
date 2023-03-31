// border颜色正则表达式
const BorderColorReg = new RegExp(/^(?:border|b)-()(?:color-)?(.+)$/);

// border样式正则表达式
const BorderStyleReg = new RegExp(/^(?:border|b)-(?:style-)?()(.+)$/);

/**
 * 组件通用的关于border的class样式计算属性
 * @param { string } extraClass 使用组件时在组件属性上添加的class样式,可以通过一下方式获取
 * ```
 * import { useAttrs } from 'vue';
 * const attrs = useAttrs();
 * const extraClass = attrs.class;
 * ```
 * 
 * @returns {{ hasBorder: Ref<boolean>, borderClass: ComputedRef<string[]> }}
 * 
 * - hasBorder: 组件是否有border
 * - borderClass: 组件关于border的class样式
 */
export function useBorder(extraClass: string): { hasBorder: Ref<boolean>; borderClass: ComputedRef<string[]>; } {
  const hasBorder = ref(false);
  const borderClass = computed(() => {
    return [""];
  })

  return {
    hasBorder,
    borderClass
  }
}

/**
 * 判断一组unocss class样式字符串里是否含有对border颜色的描述
 * @param { string } classString unocss class样式字符串
 * @returns { boolean }  是否包含border颜色
 */
function containBorderColor(classString: string): boolean {
  const reg = new RegExp(/^(?:border|b)-()(?:color-)?(.+)$/);
  return classString.split(" ").some(c => reg.test(c));
}

function containBorderStyle(classString: string): boolean {
  const reg = new RegExp(/^(?:border|b)-(?:style-)?()(.+)$/);
  return false;
}
