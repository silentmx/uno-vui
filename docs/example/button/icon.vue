<template>
  <div class="flex flex-wrap gap-2 items-start">
    <uv-btn>
      <template #icon>
        <uv-icon name="i-mdi:github"></uv-icon>
      </template>
    </uv-btn>
    <uv-btn type="success" class="rd-full">
      <template #icon>
        <uv-icon name="i-ic:baseline-wechat"></uv-icon>
      </template>
    </uv-btn>
    <uv-btn type="primary">
      <template #icon>
        <uv-icon name="i-mdi:github"></uv-icon>
      </template>
      primary
    </uv-btn>
    <uv-btn type="accent" bs="dashed">
      <template #icon>
        <uv-icon name="i-carbon:music"></uv-icon>
      </template>
      music
    </uv-btn>
  </div>
</template>