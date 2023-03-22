<script setup lang="ts">
import { arrow, autoUpdate, flip, offset, useFloating, type Placement } from '@floating-ui/vue';
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
  },
  arrow: {
    type: Boolean,
    default: true
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

const arrowEl = ref<HTMLElement | null>(null);
const { x, y, strategy, middlewareData, placement } = useFloating(toRef(props, "el"), floatingEl, {
  placement: props.placement,
  middleware: [offset(props.arrow ? 10 : 5), flip(), arrow({ element: arrowEl })],
  whileElementsMounted: autoUpdate
});

const arrowStyle = computed(() => {
  if (middlewareData.value.arrow) {
    const { x, y } = middlewareData.value.arrow;
    if (placement.value.includes("bottom")) {
      return {
        left: x ? `${x}px` : "",
        top: "-5px",
      }
    }

    if (placement.value.includes("top")) {
      return {
        left: x ? `${x}px` : "",
        bottom: "-5px",
      }
    }

    if (placement.value.includes("left")) {
      return {
        top: y ? `${y}px` : "",
        right: "-5px",
      }
    }

    if (placement.value.includes("right")) {
      return {
        top: y ? `${y}px` : "",
        left: "-5px",
      }
    }
  }
});

const transformClass = computed(() => {
  let classString = "op-0 scale-85 ";
  if (placement.value.includes("bottom")) {
    classString += "translate-y--50%";
  }

  if (placement.value.includes("top")) {
    classString += "translate-y-50%";
  }

  if (placement.value.includes("left")) {
    classString += "translate-x-4";
  }

  if (placement.value.includes("right")) {
    classString += "translate-x--4";
  }
  return classString;
})
</script>

<template>
  <Transition :enter-from-class="transformClass" :leave-to-class="transformClass" enter-active-class="transition-300"
    leave-active-class="transition-300" @after-leave="emit('destroy')">
    <div v-show="visiable" ref="floatingEl" class="bg-light-800 dark:bg-dark-200 py-1 px-2 b-rd shadow-md"
      :style="{ position: strategy, top: `${y ?? 0}px`, left: `${x ?? 0}px` }">
      <div v-if="props.arrow" ref="arrowEl" class="absolute h-10px w-10px bg-light-800 dark:bg-dark-200 rotate-45"
        :style="arrowStyle">
      </div>
      <slot></slot>
    </div>
  </Transition>
</template>