<script setup lang="ts">
const loading = ref(false);
const startLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

</script>

<template>
  <v-btn :loading="loading" @click="startLoading">
    {{ loading ? "Loading~~" : "Start Load" }}
  </v-btn>
</template>