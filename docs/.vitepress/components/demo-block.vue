<script lang="ts" setup>

const props = defineProps({
  code: {
    type: String,
    default: ""
  },
  lang: {
    type: String,
    default: 'vue',
  },
  highlightedCode: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
});

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode),
)

const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) });
const [value, toggle] = useToggle();
</script>

<template>
  <div>
    <div
      class="p-6 flex rounded-sm b-solid b-1 b-light-700 dark:b-dark-300 dark:bg-dark-900 bg-light-300 gap-2 flex-wrap">
      <slot></slot>
    </div>
    <div class="mt-2 flex flex-row-reverse">
      <button class="i-carbon:code" @click="toggle()"></button>
      <button class="i-carbon:copy" @click="copy()"></button>
    </div>
    <div v-show="value" :class="`language-${lang}`" v-html="decodedHighlightedCode" />
  </div>
</template>