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
    `transition-300 animate-shadow-ping`,
    `flex items-center px-4 py-1 b-rd b bg-${props.type} hover:bg-${props.type}Heavy box-shadow`,
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