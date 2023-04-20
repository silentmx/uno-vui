<script setup lang="ts">
const a = ref("");
</script>
<template>
  <div class="flex flex-col gap-2 bg-error/30">
    <u-input theme="primary" label="名称" v-model="a" placeholder="input"></u-input>
    {{ a }}
  </div>
</template>