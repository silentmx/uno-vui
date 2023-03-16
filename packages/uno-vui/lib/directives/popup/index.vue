<script setup lang="ts">
import { autoUpdate, flip, offset, shift, useFloating, type Placement } from '@floating-ui/vue';
import type { MaybeComputedRef } from '@vueuse/core';

const props = defineProps({
  el: {
    type: Object as PropType<MaybeComputedRef<any>>,
    required: true,
  },
  placement: {
    type: String as PropType<Placement>,
    default: "bottom"
  }
});

const emit = defineEmits<{
  (e: "destroy"): void
}>();

const floatingEl = ref<HTMLElement | null>(null);
const { x, y, strategy, middlewareData } = useFloating(toRef(props, "el"), floatingEl, {
  placement: props.placement,
  middleware: [offset(0), flip(), shift()],
  whileElementsMounted: autoUpdate
})
</script>

<template>
  <Transition name="popup">
    <div ref="floatingEl" class="bg-gray p-1 b-rd"
      :style="{ position: strategy, top: `${y ?? 0}px`, left: `${x ?? 0}px` }">
      <slot></slot>
    </div>
  </Transition>
</template>