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
    <div class="mt-4 text-sm">单边边框:此时active动画会失效</div>
    <div class="flex flex-wrap gap-2 items-start">
      <u-btn class="b-b-solid b-3px rd-none">default</u-btn>
      <u-btn class="b-b-solid b-op-0 hover:b-op-100 b-4px bg-op-0 rd-none hover:bg-op-0" theme="primary">primary</u-btn>
      <u-btn class="b-block-solid b-op-0 hover:b-op-100 b-4px bg-op-0 rd-none" theme="accent">accent</u-btn>
    </div>
  </div>
</template>