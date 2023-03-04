<script setup lang="ts">

const props = defineProps({

});

const emit = defineEmits<{
  (e: "close"): void
  (e: "destroy"): void
}>();

const show = ref(true);

onMounted(() => {

});

function close() {
  show.value = false;
}
</script>

<template>
  <Transition name="fade" @after-leave="emit('destroy')">
    <div v-if="show">
      message component!
    </div>
  </Transition>
</template>