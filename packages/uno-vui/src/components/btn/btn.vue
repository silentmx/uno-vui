<script setup lang="ts">
import { presetIconConfig } from '../../composables';
import type { ThemeType } from '../../preset/types';

const props = withDefaults(defineProps<{
  theme: ThemeType;
  appear: "fill" | "outlined" | "text";
  to?: string;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
}>(), {
  theme: "default",
  appear: "fill"
});

const attrs = Object.assign({}, props.to ? { href: props.to, role: "link" } : { type: "button", role: "button" });
const slots = useSlots();
const onlyIcon = computed(() => {
  return (props.class || "").split(" ").some(c => c.startsWith("i-")) && !slots.default;
});
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const baseClass = computed(() => {
  // 基础样式
  let base = "flex justify-center items-center gap-1 b-rd";

  // 动画
  if (!isDisabled.value) {
    base += " animate-scale active:hover:animate-none active:focus:animate-none" +
      " active:hover:transform-scale-95 active:focus:transform-scale-95" +
      " transition-duration-200 animate-ease";
  }

  if (onlyIcon.value) {
    base += " aspect-square p-1";
  } else {
    base += " px-0.875em py-0.25em"
  }

  // 背景
  if (props.theme == "default") {
    base += ` bg-default-200 hover:bg-${props.theme}-300 dark:bg-default-700 dark:hover:bg-default-600`;
  } else {
    base += ` bg-${props.theme} hover:bg-${props.theme}-500`;
  }

  if (props.appear == "outlined") {
    base += ` bg-op-10 text-${props.theme} hover:text-light b b-solid b-${props.theme}`;
  } else if (props.appear == "text") {
    base += ` bg-op-0 hover:bg-op-10 text-${props.theme}`;
  }

  return base;
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="attrs" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="baseClass">
    <i v-if="loading" :class="presetIconConfig?.loading"></i>
    <slot></slot>
  </component>
</template>