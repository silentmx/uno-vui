<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <u-btn class="bg-op-0">default</u-btn>
      <u-btn theme="primary" class="bg-op-0">primary</u-btn>
      <u-btn theme="accent" class="b-solid bg-op-0">accent</u-btn>
      <u-btn theme="success" class="b-dashed bg-op-0">success</u-btn>
      <u-btn class="bg-cyan bg-op-0 b-solid">cyan</u-btn>
      <u-btn class="bg-#787878 bg-op-0">#787878</u-btn>
    </div>
    <div class="mt-4 text-sm">禁用状态:</div>
    <div class="flex flex-wrap gap-2">
      <u-btn disabled class="bg-op-0">default</u-btn>
      <u-btn disabled theme="primary" class="bg-op-0">primary</u-btn>
      <u-btn disabled theme="accent" class="b-solid bg-op-0">accent</u-btn>
      <u-btn disabled theme="success" class="b-dashed bg-op-0">success</u-btn>
      <u-btn disabled class="bg-cyan bg-op-0 b-solid">cyan</u-btn>
      <u-btn disabled class="bg-#787878 bg-op-0">#787878</u-btn>
    </div>
  </div>
</template>