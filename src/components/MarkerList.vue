<script setup lang="ts">
import { type IMarker } from '../api/markers-api'
import { useMarkersStore } from '../store/markers.store'
import DeleteButtonWithDialog from './DeleteButtonWithDialog.vue'

interface Props {
  markers: IMarker[]
  activeMarker: number | null
  goToMarker: (marker: IMarker) => void
}

const markersStore = useMarkersStore()

/**
 * Delete marker from map and list
 */
const deleteMarker = (id: number): void => {
  markersStore.deleteMarker(id)
}

defineProps<Props>()
</script>

<template>
  <div class="w-full sm:w-1/3 max-h-36 sm:max-h-full overflow-y-auto">
    <v-list v-if="markers.length > 0" lines="two">
      <v-list-subheader class="!text-base !sm:text-xl !sm:mb-4 !font-bold p-2">{{
        $t('titles.markers')
      }}</v-list-subheader>

      <v-list-item
        v-for="marker in markers"
        :key="marker.id"
        :title="marker.name"
        :subtitle="marker.lat.toFixed(6) + ', ' + marker.lon.toFixed(6)"
        @click="goToMarker(marker)"
        :class="{ '!bg-gray-100': marker.id === activeMarker }"
        class="pr-8"
      >
        <template v-slot:append>
          <DeleteButtonWithDialog :id="marker.id" :address="marker.name" :onDelete="deleteMarker" />
        </template>
      </v-list-item>
    </v-list>

    <div v-else class="p-4">
      <span class="block mb-4">{{ $t('titles.addMarkersToMap') }}</span>
      <p class="text-gray-500">
        {{ $t('texts.addMarkersToMap') }}
      </p>
    </div>
  </div>
</template>
