import type { PropType } from 'vue';

export const commonProps = {
  theme: {
    type: String as PropType<"default" | "primary" | "accent" | "success" | "warn" | "error">,
    default: "default"
  }
}