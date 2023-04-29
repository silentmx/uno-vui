<script setup lang="ts">
const iconList = [
  "i-uim:500px",
  "i-logos:unocss",
  "i-logos:vue",
  "i-logos:visual-studio-code",
  "i-logos:angular-icon",
  "i-logos:react",
  "i-ic:baseline-wechat",
  "i-mdi:github",
  "i-eos-icons:loading"
];
</script>
<template>
  <div class="flex flex-wrap gap-4 text-2xl">
    <u-icon v-for="icon in iconList" :name="icon"></u-icon>
    <div class="i-svg:desktop text-4xl"></div>
  </div>
</template>