<script setup lang="ts">
const val = ref("");
const op = 25;
const classVal = [
  "text-(blue lg) bg-blue",
  `bg-op-25`
]
</script>
<template>
  <div>
    <u-input v-model="val" label="something label" theme="primary" hover:bg="red op-10" class="text-red text-9xl"
      :class="[{ 'text-blue': true, 'text-8xl': true }, 'b-solid']"></u-input>
    <div bg-(red op-10)>{{ val }}</div>
  </div>
</template>