<script setup lang="ts">
const val = ref("");
</script>
<template>
  <div>
    <u-input v-model="val" label="something label" theme="primary" placeholder="placeholder"></u-input>
    <div>{{ val }}</div>
  </div>
</template>