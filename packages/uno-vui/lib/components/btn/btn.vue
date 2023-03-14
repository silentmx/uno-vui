<script setup lang="ts">
const props = defineProps({
  theme: {
    type: String,
    default: "default"
  }
})
</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>