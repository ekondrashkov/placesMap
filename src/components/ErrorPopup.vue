<script setup lang="ts">
interface Props {
  error: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded z-[500] max-w-64"
  >
    {{ error }}
  </div>
</template>
