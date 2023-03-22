<script setup lang="ts">
import { UnoBtn, usePopup, vPopup } from 'uno-vui';
import { h } from 'vue';

const hoverEl = ref<HTMLElement | null>(null);
const clickEl = ref<HTMLElement | null>(null);
usePopup(hoverEl, { element: h(UnoBtn, {}, { default: () => "hover tooltip" }), trigger: 'click' });
usePopup(clickEl, { element: "click tooltip", trigger: "click", placement: "right" })
</script>

<template>
  <uno-btn ref="hoverEl">hover</uno-btn>
  <uno-btn ref="clickEl">click</uno-btn>
  <uno-btn v-popup="{ element: 'test' }">test</uno-btn>
</template>