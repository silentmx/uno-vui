<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <uv-btn class="bg-amber after:shadow-warn">amber</uv-btn>
      <uv-btn class="bg-blue after:shadow-blue text-light">blue</uv-btn>
      <uv-btn class="bg-#492039 text-light after:shadow-#492039">#492039</uv-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <uv-btn class="bg-amber b-amber after:shadow-amber" ghost="solid">amber</uv-btn>
      <uv-btn class="bg-blue b-blue after:shadow-blue" ghost="solid" text>blue</uv-btn>
      <uv-btn class="bg-#492039 b-#492039 text-#492039 hover:text-light after:shadow-#492039"
        ghost="solid">#492039</uv-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <uv-btn class="bg-amber b-amber after:shadow-amber" ghost="dashed">amber</uv-btn>
      <uv-btn class="bg-blue b-blue after:shadow-blue" ghost="dashed" text>blue</uv-btn>
      <uv-btn class="bg-#492039 b-#492039 text-#492039 hover:text-light after:shadow-#492039"
        ghost="dashed">#492039</uv-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <uv-btn class="bg-amber b-amber after:shadow-amber" text>amber</uv-btn>
      <uv-btn class="bg-blue b-blue after:shadow-blue" text>blue</uv-btn>
      <uv-btn class="bg-#492039 b-#492039 text-#492039 hover:text-light after:shadow-#492039" text>#492039</uv-btn>
    </div>
  </div>
</template>