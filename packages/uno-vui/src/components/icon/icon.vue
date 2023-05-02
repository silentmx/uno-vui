<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <i :class="name"></i>
</template>