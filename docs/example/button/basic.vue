<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <u-btn>default</u-btn>
      <u-btn theme="primary">primary</u-btn>
      <u-btn theme="accent">accent</u-btn>
      <u-btn theme="success">success</u-btn>
      <u-btn theme="warn">warn</u-btn>
      <u-btn theme="error">error</u-btn>
      <u-btn class="bg-cyan">cyan</u-btn>
      <u-btn class="bg-#787878">#787878</u-btn>
    </div>
    <div class="mt-4 text-sm">禁用状态:</div>
    <div class="flex flex-wrap gap-2 mt-2">
      <u-btn disabled>default</u-btn>
      <u-btn disabled theme="primary">primary</u-btn>
      <u-btn disabled theme="accent">accent</u-btn>
      <u-btn disabled theme="success">success</u-btn>
      <u-btn disabled theme="warn">warn</u-btn>
      <u-btn disabled theme="error">error</u-btn>
      <u-btn disabled class="bg-cyan">cyan</u-btn>
      <u-btn disabled class="bg-#787878">#787878</u-btn>
    </div>
  </div>
</template>