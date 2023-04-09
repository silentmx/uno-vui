<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset';
import { computUnoClassInfo, unoBg, unoBorder, unoCursor, unoShadowAnimation, unoText } from '../../uno-utils';

const props = defineProps({
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  to: String,
});

const slots = useSlots();
const onlyIcon = computed(() => props.icon && !slots.default);
const extraAttrs = Object.assign({}, props.to ? { href: props.to, role: "link" } : { type: "button", role: "button" });

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const baseClass = computed(() => {
  return [
    // 基础样式
    `flex justify-center items-center gap-1 transition-300`,
    // 如果只有图标, padding值设置为0.25rem，并且长宽保持1:1,否则只设定常规padding
    onlyIcon.value ? "aspect-square p-1" : "px-0.875em py-0.25em"
  ];
});
const unoClassInfo = computUnoClassInfo(baseClass);
const borderClass = unoBorder(toRef(props, "theme"), unoClassInfo, isDisabled);
const bgClass = unoBg(toRef(props, "theme"), unoClassInfo, isDisabled);
const textClass = unoText(toRef(props, "theme"), unoClassInfo, isDisabled);
const cursorClass = unoCursor(toRef(props, "loading"), toRef(props, "disabled"));
const { shadowAnimateClass, shadowAnimateStyle } = unoShadowAnimation(toRef(props, "theme"), unoClassInfo, isDisabled);
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="extraAttrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="[baseClass, borderClass, bgClass, textClass, cursorClass, shadowAnimateClass]" :style="shadowAnimateStyle">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <div v-else-if="icon" :class="icon"></div>
    <slot></slot>
  </component>
</template>