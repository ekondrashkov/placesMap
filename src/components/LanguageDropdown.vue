<script setup lang="ts">
import { ref } from 'vue'
import { i18n, Language } from '../localization'

interface LanguageOption {
  tag: Language
}

const isDropdownOpened = ref(false)
const languages = ref<LanguageOption[]>([{ tag: Language.RU }, { tag: Language.EN }])

/**
 * Click on language option event handler: change language in store
 */
const onLanguageChange = (lang: Language): void => {
  i18n.global.locale.value = lang
  isDropdownOpened.value = false
}
</script>

<template>
  <v-menu location="bottom end">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" size="large" icon base-color="rgba(255, 255, 255, .25)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="item in languages" :key="item.tag" @click="onLanguageChange(item.tag)">
        <v-list-item-title>{{
          item.tag === 'ru' ? $t('buttons.russian') : $t('buttons.english')
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
