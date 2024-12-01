<script setup lang="ts">
import HeaderView from './components/HeaderView.vue'
</script>

<template>
  <div class="h-full flex flex-col">
    <HeaderView />

    <main class="flex-1 overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
