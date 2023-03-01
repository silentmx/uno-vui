<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../composables/types';
import { getTheme } from '../../composables/use-theme';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType | "default">,
    default: "default",
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const theme = getTheme(props.type);
const classList = computed(() => {
  return [
    `flex items-center px-4 py-1 rounded-sm bg-${theme.color} dark:bg-${theme.color}-900 hover-bg-op-100`,
    props.type == "default" ? "bg-op-10" : "text-gray-100",
    props.disabled ? "cursor-not-allowed" : "",
    props.loading ? "cursor-wait" : "",
  ];
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" :disabled="isDisabled" :aria-disabled="isDisabled" :class="classList" ref="Vbtn">
    <!-- <div v-if="loading" class="i-carbon-circle-dash animate-spin"></div> -->
    <slot></slot>
  </component>
</template>