<script setup lang="ts">

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
}>()
</script>

<template>
  <Transition name="popup">
    <div ref="floatingEl" class="bg-gray p-1 b-rd">
      <slot></slot>
    </div>
  </Transition>
</template>