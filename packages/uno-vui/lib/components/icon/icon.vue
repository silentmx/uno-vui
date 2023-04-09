<script setup lang="ts">
import type { ThemeType } from '../../preset/types';
import { computUnoClassInfo, unoText } from '../../uno-utils';

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

const unoClassInfo = computUnoClassInfo();
const textClass = unoText(toRef(props, "type"), unoClassInfo);
</script>

<template>
  <div :class="[name, textClass]" v-if="name"></div>
</template>