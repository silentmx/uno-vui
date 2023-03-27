<script setup lang="ts">
import { usePopup, UvBtn, vPopup } from 'uno-vui';
import { h } from 'vue';

const hoverEl = ref<HTMLElement | null>(null);
const clickEl = ref<HTMLElement | null>(null);
usePopup(hoverEl, { element: h(UvBtn, {}, { default: () => "hover tooltip" }), trigger: 'click' });
usePopup(clickEl, { element: "click tooltip", trigger: "click", placement: "right" })
</script>

<template>
  <uv-btn ref="hoverEl">hover</uv-btn>
  <uv-btn ref="clickEl">click</uv-btn>
  <uv-btn v-popup="{ element: 'test' }">test</uv-btn>
</template>