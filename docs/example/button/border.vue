<template>
  <div>
    <div class="flex flex-wrap gap-2 items-start">
      <u-btn class="b-solid">solid</u-btn>
      <u-btn class="b-dashed">dashed</u-btn>
      <u-btn theme="primary" class="b-solid">primary</u-btn>
      <u-btn class="bg-cyan b-solid">cyan</u-btn>
      <u-btn class="bg-#787878 b-dashed">#787878</u-btn>
    </div>
    <div class="mt-4 text-sm">禁用状态:</div>
    <div class="flex flex-wrap gap-2 items-start">
      <u-btn disabled class="b-solid">solid</u-btn>
      <u-btn disabled class="b-dashed">dashed</u-btn>
      <u-btn disabled theme="primary" class="b-solid">primary</u-btn>
      <u-btn disabled class="bg-cyan b-solid">cyan</u-btn>
      <u-btn disabled class="bg-#787878 b-dashed">#787878</u-btn>
    </div>
    <div class="mt-4 text-sm">圆角边框:</div>
    <div class="flex flex-wrap gap-2 items-start">
      <u-btn class="rd-full">default</u-btn>
      <u-btn class="b-solid rd-l-full" theme="primary">primary</u-btn>
      <u-btn class="b-solid rd-none" theme="primary">no-rd</u-btn>
      <u-btn theme="accent" class="b-dashed rd-r-full">accent</u-btn>
      <u-btn class="bg-cyan b-solid rd-lt-2xl rd-rb-2xl">cyan</u-btn>
      <u-btn class="bg-#787878 b-dashed rd-rt-2xl rd-lb-2xl">#787878</u-btn>
    </div>
  </div>
</template>