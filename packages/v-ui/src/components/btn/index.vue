<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../preset/config';

const props = defineProps({
  type: {
    type: String as PropType<"button" | "submit" | "reset">,
    default: "button"
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "default",
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const binds = Object.assign({}, useAttrs(), props.to ? { href: props.to } : {});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => {
  const baseClass = [
    `flex items-center px-4 py-1 b-rd b bg-${props.theme} hover:bg-h${props.theme}`,
    props.theme == "default" ? `bg-op-10 hover:bg-op-50 hover:text-${props.theme}` : `text-gray-50`,
    props.disabled ? "cursor-not-allowed" : "",
    props.loading ? "cursor-wait" : "",
  ];

  return baseClass;
});
</script>

<template>
  <component :type="to ? '' : type" :is="to ? 'a' : 'button'" v-bind="binds" :class="classList" :disabled="isDisabled"
    :aria-disabled="isDisabled">
    <!-- <div v-if="loading" class="i-carbon-circle-dash animate-spin"></div> -->
    <slot></slot>
  </component>
</template>