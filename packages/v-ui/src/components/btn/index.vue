<script setup lang="ts">
import type { PropType } from 'vue';
import type { ThemeType } from '../../composables/types';
import { getThemeColor } from '../../composables/use-theme';

const isDark = useDark();

const props = defineProps({
  type: {
    type: String as PropType<ThemeType>,
    default: "default",
  },
  to: String,
  loading: Boolean,
  disabled: Boolean,
});

const isDisabled = computed(() => {
  return props.loading || props.disabled;
});

const classList = computed(() => {
  // 色调
  let res: string[] = [`bg-${getThemeColor(props.type)}`, "hover:bg-op-20"];

  return res;
});
</script>

<template>
  <component :is="to ? 'a' : 'button'" :disabled="isDisabled" :aria-disabled="isDisabled" :class="classList">
    <div v-if="loading" class="i-carbon-circle-dash animate-spin"></div>
    <slot></slot>
  </component>
</template>