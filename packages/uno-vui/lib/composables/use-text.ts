import type { ComputedRef, DeepReadonly } from "vue"

/**
 * @typedef { Object } 文字颜色 props
 * @prop { DeepReadonly<ComputedRef<string[]>> } textClass: 文字颜色样式class
 */
type TextProps = {
  textClass: DeepReadonly<ComputedRef<string[]>>
}

export function useText() {

}