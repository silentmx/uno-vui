import type { PropType } from "vue";
import type { ThemeType } from "../preset";

/**
 * 组件共有的参数
 * - theme 主题色调
 */
export const commonProps = {
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
}