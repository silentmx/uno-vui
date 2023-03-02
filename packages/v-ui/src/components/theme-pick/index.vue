<script setup lang="ts">
import { allThemes, selectedTheme } from '../../composables/use-theme';

function changeTheme() {
  selectedTheme.value = {
    primary: "amber",
    accent: "coolGray",
    success: "cyan",
    warn: "coolgray",
    error: "cyan"
  };
}
</script>

<template>
  <button @click="changeTheme()">theme picker</button>
  <div>{{ allThemes }}</div>
  <div>{{ selectedTheme }}</div>
</template>