<script setup lang="ts">
const iconList = [
  { icon: "i-uim:500px", color: "bg-primary" },
  { icon: "i-logos:unocss?mask", color: "text-accent" },
];
</script>
<template>
  <div class="flex flex-wrap gap-4 text-2xl">
    <u-icon v-for="item in iconList" :name="item.icon" :class="item.color"></u-icon>
    <div class="i-svg:desktop?mask c-warn/50"></div>
  </div>
</template>