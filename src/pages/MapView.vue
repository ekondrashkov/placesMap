<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useGeolocation } from '@vueuse/core'
import leaflet from 'leaflet'
import { getAddress } from '../api/get-address'
import { useMarkersStore } from '../store/markers.store'
import { type IMarker } from '../api/markers-api'
import { useRoute } from 'vue-router'
import router from '../router'
import MarkerList from '../components/MarkerList.vue'
import MarkerMap from '../components/MarkerMap.vue'
import ErrorPopup from '../components/ErrorPopup.vue'

const route = useRoute()
const isAddMode = ref(false)
const activeMarker = ref<number | null>(route.params.id ? Number(route.params.id) : null)
const isDisabled = ref(false)
const errorText = ref('')

const markersStore = useMarkersStore()

let map: leaflet.Map
let markersList: leaflet.Marker[] = []

const { coords, pause } = useGeolocation()

/**
 * Toggle add mode (click on right bottom "+" button)
 */
const addModeToggle = () => {
  isAddMode.value = !isAddMode.value
}

/**
 * Show error, hide after 3 seconds
 */
const showError = (error: string): void => {
  errorText.value = error
  setTimeout(() => {
    errorText.value = ''
  }, 3000)
}

/**
 * Add marker action:
 * add to "backend" storage and map
 * disable view while adding
 */
const addMarker = async (lat: number, lon: number): Promise<void> => {
  try {
    isDisabled.value = true
    const address = await getAddress(lat, lon)
    const name = address.display_name ?? `Marker ${markersStore.markers.length}`
    const marker = {
      name,
      lat,
      lon,
      id: markersStore.markers[markersStore.markers.length - 1]
        ? markersStore.markers[markersStore.markers.length - 1].id + 1
        : 1,
    }
    await markersStore.setMarker(marker)
    map.panTo([lat, lon])
  } catch (error) {
    showError(error instanceof Error ? error.message : 'An unknown error occurred')
  } finally {
    isDisabled.value = false
  }
}

/**
 * Click om Map event handler:
 * if add mode is enabled and not disabled - add marker
 */
const onMapClick = (e: leaflet.LeafletMouseEvent) => {
  if (!isAddMode.value || isDisabled.value) {
    return
  }
  const { lat, lng } = e.latlng
  addMarker(lat, lng)
}

/**
 * Go to marker:
 * highlight active marker in list and pan to it on the map
 */
const goToMarker = (marker: IMarker): void => {
  router.push({ name: 'Map Marker', params: { id: String(marker.id) } })
  activeMarker.value = marker.id ?? null
  map.panTo([marker.lat, marker.lon])
}

/**
 * Add markers list to map
 */
const addMarkersToMap = () => {
  markersList.forEach((marker) => marker.remove())
  markersList = []
  markersStore.markers.forEach((marker) => {
    const markerItem: leaflet.Marker = leaflet.marker([marker.lat, marker.lon])
    markersList.push(markerItem)
    markerItem
      .bindPopup(marker.name)
      .on('click', () => goToMarker(marker))
      .addTo(map)

    if (marker.id === activeMarker.value) {
      markerItem.openPopup()
      map.panTo([marker.lat, marker.lon])
    }
  })
}

// watch for coords changes from geolocation (once)
watch(
  coords,
  () => {
    const { latitude, longitude } = coords.value
    if (latitude !== Number.POSITIVE_INFINITY && longitude !== Number.POSITIVE_INFINITY) {
      if (activeMarker.value === null) {
        map.panTo([latitude, longitude])
      } else if (!markersStore.markers.some((marker) => marker.id === activeMarker.value)) {
        map.panTo([latitude, longitude])
        activeMarker.value = null
      }
      pause()
    }
  },
  { once: true },
)

// watch for markers changes
watch(() => markersStore.markers, addMarkersToMap, {
  deep: true,
})

// watch route id changes
watch(
  () => route.params.id,
  (newId) => {
    activeMarker.value = Number(newId)
    const marker = markersStore.markers.find((marker) => marker.id === Number(newId))
    if (marker) {
      map.panTo([marker.lat, marker.lon])
    }
  },
)

onMounted(() => {
  map = leaflet.map('map').setView([34.17, -118.6], 13)
  leaflet
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })
    .addTo(map)

  addMarkersToMap()

  map.on('click', onMapClick)
})
</script>

<template>
  <div class="flex flex-col sm:flex-row h-full max-w-screen-2xl mx-auto">
    <MarkerList
      :markers="markersStore.markers"
      :go-to-marker="goToMarker"
      :activeMarker="activeMarker"
    />

    <MarkerMap :is-add-mode="isAddMode" :add-mode-toggle="addModeToggle" />

    <ErrorPopup v-show="errorText !== ''" :error="errorText" />
  </div>
</template>
