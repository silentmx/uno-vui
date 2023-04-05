<script setup lang="ts">
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
      <u-btn icon="i-carbon:code" class="rd-full b-solid" text @click="toggle()"></u-btn>
      <u-btn icon="i-carbon:copy" class="rd-full b-solid" text @click="copy()"></u-btn>
    </div>
    <div v-show="value" :class="`language-${lang}`" v-html="decodeHighlightedCode"></div>
  </div>
</template>