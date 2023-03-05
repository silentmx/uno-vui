<script setup lang="ts">
import { VMessage } from '@silentmx/v-ui';

function open() {
  VMessage.success();
}
</script>

<template>
  <VBtn theme="primary" @click="$VMessage.success()">primary</VBtn>
</template>