<script setup lang="ts">
import { useText } from '../../composables';
import type { ThemeType } from '../../preset/types';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
});

const { textClass } = useText(toRef(props, "type"), false, true, true);
</script>

<template>
  <div :class="[name, textClass]" v-if="name"></div>
</template>