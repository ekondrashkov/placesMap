import AboutVue from '@/pages/AboutVue.vue'
import MapView from '@/pages/MapView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/about',
  },
  {
    path: '/about',
    name: 'About',
    component: AboutVue,
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,
  },
  {
    path: '/map/:id',
    name: 'Map Marker',
    component: MapView,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/map',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
