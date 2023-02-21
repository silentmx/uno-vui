<script lang="ts" setup>

const props = defineProps({
  code: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div class="mt-6" v-bind="$attrs">
    <div>
      <slot></slot>
    </div>
  </div>
</template>