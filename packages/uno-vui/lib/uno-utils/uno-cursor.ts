import type { ComputedRef, DeepReadonly } from "vue";
import { genUnoClass } from "./uno-class";

/**
 * @typedef { Object } 鼠标状态props
 * @prop `cursorClass` 鼠标状态 class
 */
type CusorProps = {
  cursorClass: DeepReadonly<ComputedRef<string>>;
}

/**
 * 生成关于鼠标状态的unocss class string
 * @param loading 是否加载中
 * @param disabled 是否被禁用
 * @returns {@link CusorProps} 返回结果
 */
export const unoCursor = (
  loading?: ComputedRef<boolean> | Ref<boolean>,
  disabled?: ComputedRef<boolean> | Ref<boolean>,
): CusorProps => {

  const cursorClass = computed(() => {

    return genUnoClass([
      {
        commonCondition: true,
        options: [
          {
            classVal: "cursor-wait",
            conditions: [
              { condition: loading },
              { condition: disabled, prefix: "not" }
            ]
          },
          {
            classVal: "cursor-not-allowed",
            conditions: [
              { condition: disabled }
            ]
          }
        ]
      },
    ]);
  })

  return {
    cursorClass: readonly(cursorClass),
  }
}