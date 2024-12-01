<script setup lang="ts">
interface Props {
  isAddMode: boolean
  addModeToggle: () => void
}

defineProps<Props>()
</script>

<template>
  <div class="flex-1 sm:flex-initial w-full sm:w-2/3 relative">
    <div id="map" class="h-full"></div>
    <v-btn
      class="!absolute bottom-6 right-2 z-[500]"
      :class="{ 'rotate-45': isAddMode }"
      :title="isAddMode ? $t('tooltips.disableAddMode') : $t('tooltips.enableAddMode')"
      @click="addModeToggle"
      color="primary"
      size="x-large"
      icon
      variant="flat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-plus"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </v-btn>
  </div>
</template>
