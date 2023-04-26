<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    require: true,
  }
});
</script>

<template>
  <i :class="[name]"></i>
</template>