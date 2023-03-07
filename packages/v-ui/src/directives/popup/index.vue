<script setup lang="ts" >
import { useFloating } from '@floating-ui/vue';
import type { PropType } from 'vue';

const props = defineProps({
  el: {
    type: Object as PropType<HTMLElement>,
    required: true
  }
});

const floating = ref<HTMLElement | null>();
const { x, y, strategy } = useFloating(toRef(props, "el"), floating);
</script>

<template>
  <Transition name="popup">
    <div ref="floating" :style="{ position: strategy, top: `${y ?? 0}px`, left: `${x ?? 0}px`, width: 'max-content' }">
      <slot></slot>
    </div>
  </Transition>
</template>