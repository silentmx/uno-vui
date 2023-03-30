<script setup lang="ts">
import { UBtn, usePopup, vPopup } from 'uno-vui';
import { h } from 'vue';

const hoverEl = ref<HTMLElement | null>(null);
const clickEl = ref<HTMLElement | null>(null);
usePopup(hoverEl, { element: h(UBtn, {}, { default: () => "hover tooltip" }), trigger: 'click' });
usePopup(clickEl, { element: "click tooltip", trigger: "click", placement: "right" })
</script>

<template>
  <u-btn ref="hoverEl">hover</u-btn>
  <u-btn ref="clickEl">click</u-btn>
  <u-btn v-popup="{ element: 'test' }">test</u-btn>
</template>