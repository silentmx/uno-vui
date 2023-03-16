<script setup lang="ts">
import { UnoBtn, useUnoPopup } from 'uno-vui';
import { h } from 'vue';

const element = ref<HTMLElement | null>(null);
useUnoPopup(element, { element: h(UnoBtn, {}, { default: () => "button" }) });
</script>

<template>
  <div ref="element">popup</div>
</template>