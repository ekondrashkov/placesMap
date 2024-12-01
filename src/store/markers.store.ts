import { markersApi, type IMarker } from '@/api/markers-api'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export interface MarkersStore {
  markers: Ref<IMarker[], IMarker[]>
  setMarker: (marker: Readonly<IMarker>) => Promise<void>
  deleteMarker: (id: number) => Promise<void>
}

export const useMarkersStore = defineStore('markers', (): MarkersStore => {
  const markers = ref<IMarker[]>(structuredClone(markersApi.getMarkers()))

  const setMarker = async (marker: Readonly<IMarker>): Promise<void> => {
    try {
      markers.value.push(marker)
      await markersApi.setMarker(marker)
    } catch (error) {
      markers.value = markers.value.filter((m) => m.id !== marker.id)
      throw new Error(error instanceof Error ? error.message : 'Failed to save marker')
    }
  }

  const deleteMarker = async (id: number): Promise<void> => {
    const marker = markers.value.find((m) => m.id === id)
    if (!marker) {
      throw new Error('Marker not found')
    }
    try {
      markers.value = [...markers.value].filter((m) => m.id !== id)
      await markersApi.deleteMarker(id)
    } catch (error) {
      markers.value.push(marker)
      throw new Error(error instanceof Error ? error.message : 'Failed to delete marker')
    }
  }

  return {
    markers,
    setMarker,
    deleteMarker,
  }
})
