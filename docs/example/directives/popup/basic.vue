<script setup lang="ts">
import { UnoBtn, useUnoPopup } from 'uno-vui';
import { h } from 'vue';

const element = ref<HTMLElement | null>(null);
useUnoPopup(element, { element: h(UnoBtn, {}, { default: () => "button" }), trigger: 'hover' });
</script>

<template>
  <uno-btn ref="element">popup</uno-btn>
</template>