<script setup lang="ts">
import type { CSSObject } from 'unocss';
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset';
import { computUnoClassInfo, unoBg, unoBorder } from '../../uno-utils';

const props = defineProps({
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "primary"
  },
  placeholder: {
    type: String,
    default: " "
  },
  disabled: Boolean
});

const inputStyle = reactive<CSSObject>({
  "font-size": "inherit",
  "line-height": "inherit",
});

const baseClass = computed(() => {
  return [
    "flex gap-1 px-xs items-center transition-300",
  ];
});
const unoClassInfo = computUnoClassInfo(baseClass);
const { borderClass } = unoBorder(toRef(props, "theme"), unoClassInfo, toRef(props, "disabled"));
const bgClass = unoBg("default", unoClassInfo, toRef(props, "disabled"));
</script>

<template>
  <div :class="[baseClass, borderClass, bgClass]">
    <input :type="type" class="flex-auto py-0.25em" :style="inputStyle" :placeholder="placeholder" />
  </div>
</template>