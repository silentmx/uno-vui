<script setup lang="ts">
import { UnoBtn, useUnoPopup } from 'uno-vui';
import { h } from 'vue';

const hoverEl = ref<HTMLElement | null>(null);
const clickEl = ref<HTMLElement | null>(null);
useUnoPopup(hoverEl, { element: h(UnoBtn, {}, { default: () => "hover tooltip" }), trigger: 'hover' });
useUnoPopup(clickEl, { element: "click tooltip", trigger: "click", placement: "right" })
</script>

<template>
  <uno-btn ref="hoverEl">hover</uno-btn>
  <uno-btn ref="clickEl">click</uno-btn>
</template>