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
    <div class="p-6 rd b-solid b b-light-700 dark:b-dark-300 bg-light-300 dark:bg-dark-900">
      <slot></slot>
    </div>
    <div class="mt-2 flex flex-row-reverse">

    </div>
    <div v-show="value" :class="`language-${lang}`" v-html="decodeHighlightedCode"></div>
  </div>
</template>