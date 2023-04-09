<script setup lang="ts">
import type { PropType } from 'vue';
import { computUnoClassInfo } from '../../uno-utils';

const props = defineProps({
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  },
  disabled: Boolean
});

const baseClass = computed(() => {
  return [
    "flex px-0.875em py-0.25em gap-1 items-center",
  ];
});
const a = computUnoClassInfo(baseClass);

</script>

<template>
  <div :class="[baseClass]">
    <div>prefix</div>
    <input :type="type" class="flex-auto" autocomplete="none" />
    <div>suffix</div>
    {{ a }}
  </div>
</template>