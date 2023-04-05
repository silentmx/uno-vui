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
      <u-btn disabled class="b-solid">disabled</u-btn>
      <u-btn disabled type="primary" class="b-solid">disabled</u-btn>
      <u-btn disabled type="accent" class="b-solid">disabled</u-btn>
      <u-btn disabled type="success" class="b-solid">disabled</u-btn>
      <u-btn disabled type="warn" class="b-solid">disabled</u-btn>
      <u-btn disabled type="error" class="b-solid">disabled</u-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn loading class="b-dashed">loading</u-btn>
      <u-btn loading type="primary" class="b-dashed">loading</u-btn>
      <u-btn loading type="accent" class="b-dashed">loading</u-btn>
      <u-btn loading type="success" class="b-dashed">loading</u-btn>
      <u-btn loading type="warn" class="b-dashed">loading</u-btn>
      <u-btn loading type="error" class="b-dashed">loading</u-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn type="primary" :loading="loading" @click="startLoading">
        {{ loading ? 'Loading~~' : 'Click Me' }}
      </u-btn>
    </div>
  </div>
</template>