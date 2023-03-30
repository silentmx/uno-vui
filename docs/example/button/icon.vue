<template>
  <div class="flex flex-wrap gap-2 items-start">
    <u-btn>
      <template #icon>
        <u-icon name="i-mdi:github"></u-icon>
      </template>
    </u-btn>
    <u-btn type="success" class="rd-full">
      <template #icon>
        <u-icon name="i-ic:baseline-wechat"></u-icon>
      </template>
    </u-btn>
    <u-btn type="primary">
      <template #icon>
        <u-icon name="i-mdi:github"></u-icon>
      </template>
      primary
    </u-btn>
    <u-btn type="accent" bs="dashed">
      <template #icon>
        <u-icon name="i-carbon:music"></u-icon>
      </template>
      music
    </u-btn>
  </div>
</template>