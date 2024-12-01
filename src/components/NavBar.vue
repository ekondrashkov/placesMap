<script setup lang="ts">
import { ref, watch } from 'vue'

interface Tab {
  id: number
  path: string
}

interface Props {
  path: string
}
const props = defineProps<Props>()

const current_key = ref(props.path.includes('map') ? 1 : 0)
const tabs = ref<Readonly<Tab>[]>([
  {
    id: 0,
    path: '/about',
  },
  {
    id: 1,
    path: '/map',
  },
])

watch(
  () => props.path,
  () => {
    current_key.value = props.path.includes('map') ? 1 : 0
  },
)
</script>

<template>
  <v-tabs align-tabs="start" color="white" v-model="current_key">
    <v-tab
      v-for="tab of tabs"
      :key="tab.id"
      :to="tab.path"
      :text="tab.id === 0 ? $t('buttons.about') : $t('buttons.map')"
      class="!text-white"
    >
    </v-tab>
  </v-tabs>
</template>
