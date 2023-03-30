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
  <div>
    <div class="flex flex-wrap gap-2">
      <u-btn disabled>disabled</u-btn>
      <u-btn disabled type="primary">disabled</u-btn>
      <u-btn disabled type="accent">disabled</u-btn>
      <u-btn disabled type="success">disabled</u-btn>
      <u-btn disabled type="warn">disabled</u-btn>
      <u-btn disabled type="error">disabled</u-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn disabled bs="solid">disabled</u-btn>
      <u-btn disabled type="primary" bs="solid">disabled</u-btn>
      <u-btn disabled type="accent" bs="solid">disabled</u-btn>
      <u-btn disabled type="success" bs="solid">disabled</u-btn>
      <u-btn disabled type="warn" bs="solid">disabled</u-btn>
      <u-btn disabled type="error" bs="solid">disabled</u-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn loading bs="dashed">loading</u-btn>
      <u-btn loading type="primary" bs="dashed">loading</u-btn>
      <u-btn loading type="accent" bs="dashed">loading</u-btn>
      <u-btn loading type="success" bs="dashed">loading</u-btn>
      <u-btn loading type="warn" bs="dashed">loading</u-btn>
      <u-btn loading type="error" bs="dashed">loading</u-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn type="primary" :loading="loading" @click="startLoading">
        {{ loading ? 'Loading~~' : 'Click Me' }}
      </u-btn>
    </div>
  </div>
</template>