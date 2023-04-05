<script setup lang="ts">
import type { PropType } from 'vue';
import { genCompClass, useBg, useBorder, useCursor, useShadowAnimation, useText } from '../../composables';
import type { ThemeType } from '../../preset';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  icon: String,
  text: Boolean,
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
    `relative flex justify-center items-center gap-1 transition-300`,
    // 如果只有图标, padding值设置为0.25rem，并且长宽保持1:1,否则只设定常规padding
    genCompClass([
      { condition: onlyIcon.value, trueVal: "aspect-square p-1", falseVal: "px-0.875em py-0.25em" }
    ]),
  ];
});
const { hasBorder, borderClass } = useBorder(toRef(props, "type"), isDisabled);
const { hasBg, bgClass } = useBg(toRef(props, "type"), hasBorder, toRef(props, "text"), isDisabled);
const { textClass } = useText(toRef(props, "type"), hasBg, hasBorder, toRef(props, "text"), isDisabled);
const { cursorClass } = useCursor(toRef(props, "loading"), toRef(props, "disabled"));
const { shadowAnimateClass } = useShadowAnimation(toRef(props, "type"), hasBorder, toRef(props, "text"), isDisabled);
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="extraAttrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="[baseClass, borderClass, bgClass, textClass, shadowAnimateClass, cursorClass]">
    <div v-if="loading" class="i-eos-icons:loading"></div>
    <div v-else-if="icon" :class="icon"></div>
    <slot></slot>
  </component>
</template>