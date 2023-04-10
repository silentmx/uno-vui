<script setup lang='ts'>
const loading = ref(false)
const startLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <u-btn theme="primary" :loading="loading" @click="startLoading">
      {{ loading ? 'Loading~~' : 'Click Me' }}
    </u-btn>
    <u-btn theme="accent" class="b-solid" :loading="loading" @click="startLoading">
      {{ loading ? 'Loading~~' : 'Click Me' }}
    </u-btn>
    <u-btn theme="accent" class="b-solid bg-op-0" :loading="loading" @click="startLoading">
      {{ loading ? 'Loading~~' : 'Click Me' }}
    </u-btn>
  </div>
</template>