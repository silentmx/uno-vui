<script setup lang="ts" >
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import type { PropType } from 'vue';

const props = defineProps({
  el: {
    type: Object as PropType<HTMLElement>,
    required: true
  },
  trigger: {
    type: String as PropType<"hover" | "click" | "context-menu" | "focus">,
    default: "hover"
  }
});

const emit = defineEmits<{
  (e: "destroy"): void
}>();

const floatingEl = ref<HTMLElement | null>();
const arrowEl = ref<HTMLElement | null>(null);
const { x, y, strategy, middlewareData } = useFloating(toRef(props, "el"), floatingEl, {
  placement: "bottom",
  middleware: [offset(0), flip(), shift(), arrow({ element: arrowEl })],
  whileElementsMounted: autoUpdate
});

const isHover = useElementHover(floatingEl);
const { isOutside } = useMouseInElement(toRef(props, "el"));
const isDestroy = computed(() => {
  if (props.trigger == "hover") {
    return !(isHover.value || !isOutside.value);
  }
  return false;
});

watch(isDestroy, () => {
  if (isDestroy.value) {
    emit("destroy");
  }
})
</script>

<template>
  <Transition name="popup">
    <div ref="floatingEl" class="bg-gray p-1 b-rd"
      :style="{ position: strategy, top: `${y ?? 0}px`, left: `${x ?? 0}px` }">
      <!-- <div ref="arrowEl" class="absolute w-10px h-10px bg-gray rotate-45 -z-1" :style="{
              left: `${middlewareData.arrow?.x}px`,
              top: `${-arrowEl?.offsetHeight / 2}px`
            }"></div> -->
      <slot></slot>
    </div>
  </Transition>
</template>