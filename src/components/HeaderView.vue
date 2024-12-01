<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from './NavBar.vue'
import LanguageDropdown from './LanguageDropdown.vue'

const route = useRoute()
const path = ref(route.path)

watch(
  () => route.path,
  () => {
    path.value = route.path
  },
)
</script>

<template>
  <header class="sticky top-0 bg-header-image bg-cover">
    <div class="flex flex-col max-w-screen-2xl mx-auto p-4 pb-0 gap-y-2 md:gap-y-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl md:text-3xl font-bold text-white">{{ $t('titles.name') }}</h1>
        <LanguageDropdown />
      </div>

      <NavBar :path="path" />
    </div>
  </header>
</template>
