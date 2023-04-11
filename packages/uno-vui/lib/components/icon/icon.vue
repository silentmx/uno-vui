<script setup lang="ts">
import type { ThemeType } from '../../preset/types';
import { computUnoClassInfo, unoText } from '../../uno-utils';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  theme: {
    type: String as PropType<ThemeType>,
    default: "default"
  },
});

const unoClassInfo = computUnoClassInfo();
const { textClass } = unoText(toRef(props, "theme"), unoClassInfo, false, true);
</script>

<template>
  <div :class="[name, textClass]" v-if="name"></div>
</template>