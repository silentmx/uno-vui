<script setup lang="ts">
const a = "solid";
</script>
<template>
  <div class="flex gap-2">
    <u-btn class="i-ic:baseline-account-circle">button</u-btn>
    <u-btn theme="primary" appear="outlined">primary</u-btn>
    <u-btn theme="accent" appear="text" class="hover:bg-red" text-accent :class="`b-${a}`">accent</u-btn>
  </div>
</template>