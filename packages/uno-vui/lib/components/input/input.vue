<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset';
import { computUnoClassInfo, unoBg, unoBorder, unoText } from '../../uno-utils';

const props = defineProps({
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  label: String,
  labelPosition: {
    type: String as PropType<"left" | "top" | "floating">,
    default: "floating"
  },
  placeholder: String,
  disabled: Boolean
});

const baseClass = computed(() => {
  return [
    "relative flex flex-col gap-1 transition-300 bg-op-5",
    "px-0.5em py-0.25em",
    props.disabled ? "hover:bg-op-5" : "hover:bg-op-7",
  ];
});

const unoClassInfo = computUnoClassInfo(baseClass);
const { bgClass, bgStyle } = unoBg(toRef(props, "theme"), unoClassInfo, toRef(props, "disabled"));
const { borderClass } = unoBorder(toRef(props, "theme"), unoClassInfo, toRef(props, "disabled"));
const { textClass } = unoText("default", unoClassInfo, false);
</script>

<template>
  <div class="flex flex-col relative">
    <label class="text-0.875em" v-if="label">{{ label }}</label>
    <div :class="[baseClass, borderClass, bgClass, textClass]" :style="bgStyle" v-bind="$attrs">
      <input :type="type" class="flex-auto bg-clip-text text-size-inherit lh-inherit" :placeholder="placeholder" />
    </div>
  </div>
</template>