<script setup lang="ts">
import type { ColorType, SizeType, ThemeType } from '@/composables/types';
import type { PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<ThemeType | ColorType>,
    default: "default"
  },
  size: {
    type: String as PropType<SizeType>,
    default: "md"
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => {

});
</script>

<template>
  <component :is="to ? 'a' : 'button'" :disabled="isDisabled" :aria-disabled="isDisabled" :class="classList">
    <div v-if="loading" class="i-carbon-circle-dash animate-spin"></div>
    <slot></slot>
  </component>
</template>