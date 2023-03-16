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
  },
  trigger: {
    type: String as PropType<"hover" | "click" | "contextmenu" | "focus">,
    default: "hover"
  }
});

const emit = defineEmits<{
  (e: "destroy"): void
}>();

const isMounted = ref(false);
let isHoveredTarget = useElementHover(props.el, {
  delayLeave: 200,
});
const isFocusTarget = useFocus(props.el);
onMounted(() => {
  isMounted.value = true;
  if (props.trigger == "hover") {
    isHoveredTarget.value = true;
  }

  if (props.trigger == "focus") {
    isFocusTarget.focused.value = true;
  }
});

const floatingEl = ref<HTMLElement | null>(null);
const isHovered = useElementHover(floatingEl, {
  delayLeave: 200,
});
onClickOutside(floatingEl, () => {
  isMounted.value = false;
}, {
  ignore: [props.el]
});

const visiable = computed(() => {
  if (props.trigger == "hover") {
    return isHoveredTarget.value || isHovered.value;
  }

  if (props.trigger == "focus") {
    return isFocusTarget.focused.value || isHovered.value;
  }

  return isMounted.value || isHovered.value;
});

const { x, y, strategy, middlewareData } = useFloating(toRef(props, "el"), floatingEl, {
  placement: props.placement,
  middleware: [offset(5), flip(), shift()],
  whileElementsMounted: autoUpdate
});
</script>

<template>
  <Transition name="popup" @after-leave="emit('destroy')">
    <div v-show="visiable" ref="floatingEl" class="bg-gray p-1 b-rd"
      :style="{ position: strategy, top: `${y ?? 0}px`, left: `${x ?? 0}px` }">
      <slot></slot>
    </div>
  </Transition>
</template>