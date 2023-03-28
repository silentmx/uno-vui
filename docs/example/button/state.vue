<template>
  <div>
    <div class="flex flex-wrap gap-2">
      <uv-btn disabled>disabled</uv-btn>
      <uv-btn disabled type="primary">disabled</uv-btn>
      <uv-btn disabled type="accent" text>disabled</uv-btn>
      <uv-btn disabled type="success" ghost="solid">disabled</uv-btn>
      <uv-btn disabled type="warn" ghost="dashed">disabled</uv-btn>
      <uv-btn disabled type="error">disabled</uv-btn>
      <uv-btn disabled class="bg-amber">amber</uv-btn>
      <uv-btn disabled class="bg-amber b-amber" ghost="dashed">amber</uv-btn>
    </div>
    <div class="flex flex-wrap gap-2 mt-2">
      <uv-btn loading>disabled</uv-btn>
      <uv-btn loading type="primary">disabled</uv-btn>
      <uv-btn loading type="accent">disabled</uv-btn>
      <uv-btn loading type="success">disabled</uv-btn>
      <uv-btn loading type="warn">disabled</uv-btn>
      <uv-btn loading type="error">disabled</uv-btn>
      <uv-btn loading class="bg-amber text-lg">amber</uv-btn>
    </div>
  </div>
</template>