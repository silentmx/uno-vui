<script setup lang="ts">
const iconList = [
  { icon: "i-uim:500px", class: "bg-primary text-7xl" },
  { icon: "i-logos:unocss?mask", class: "text-accent text-lg" },
];
</script>
<template>
  <div class="flex flex-wrap gap-4 text-2xl">
    <u-icon v-for="item in iconList" :name="item.icon" :class="item.class"></u-icon>
    <div class="i-svg:desktop?mask c-warn/50 text-50px"></div>
  </div>
</template>