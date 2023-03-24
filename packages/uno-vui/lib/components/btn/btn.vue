<script setup lang="ts">
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : { type: "button" });
const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => {
  return [
    `after:content-none after:absolute after:inset-0 after:op-0 after:transition-700 after:rd-inherit`,
    `after:shadow-[0_0_0_6px_var(--un-shadow-color)] after:shadow-${props.type}Heavy`,
    `after:active:shadow-none after:active:op-40 dark:after:active:op-85 after:active:transition-0`,
    `relative flex items-center px-4 py-1 b-rd b bg-${props.type} hover:bg-${props.type}Heavy`,
    props.type == "default" ? `bg-op-10 hover:bg-op-30 hover:text-defaultHeavy dark:hover:text-defaultLight` : `text-light`,
    props.disabled ? "cursor-not-allowed bg-op-80" : "",
    props.loading ? "cursor-wait bg-op-80" : "",
  ];
})
</script>

<template>
  <component :is="to ? 'a' : 'button'" v-bind="binds" :disabled="isDisabled" :aria-disabled="isDisabled"
    :class="classList">
    <slot></slot>
  </component>
</template>