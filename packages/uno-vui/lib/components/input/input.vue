<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<"text" | "passowrd" | "email" | "password" | "tel" | "url">,
    default: "text"
  }
});

const binds = useAttrs();

const fieldClass = computed(() => {
  return [
    // 基础样式
    "flex flex-col",

    // 边框
    "b b-solid b-default hover:b-accent b-rd"
  ];
});

const inputClass = computed(() => {

  return [
    'px-0.875em py-0.25em'
  ]
});


</script>

<template>
  <div :class="fieldClass">
    <div>

    </div>
    <input :type="type" :class="inputClass" autocomplete="none" />
  </div>
</template>