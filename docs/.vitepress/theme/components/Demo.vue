<script setup lang="ts">
import { useClipboard, useToggle } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  code: {
    type: String,
    default: ""
  },
  lang: {
    type: String,
    default: "vue",
  },
  highlightedCode: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: ""
  }
});

const decodeHighlightedCode = computed(() => {
  return decodeURIComponent(props.highlightedCode);
});

const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) });
const [value, toggle] = useToggle();
</script>

<template>
  <div>
    <div class="p-6 rd b-solid b b-light-900 dark:b-dark-50">
      <slot></slot>
    </div>
    <div class="mt-2 flex gap-1 flex-row-reverse">
      <button @click="toggle()" class="b b-default/40 b-solid rd-full flex aspect-square p-1">
        <i class="i-carbon:code"></i>
      </button>
      <button @click="copy()" class="b b-default/40 b-solid rd-full flex aspect-square p-1">
        <i class="i-carbon:copy"></i>
      </button>
    </div>
    <div v-show="value" :class="`language-${lang}`" v-html="decodeHighlightedCode"></div>
  </div>
</template>