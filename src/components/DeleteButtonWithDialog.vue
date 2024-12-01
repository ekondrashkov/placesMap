<script setup lang="ts">
interface Props {
  id: number
  address: string
  onDelete: (id: number) => void
}

defineProps<Props>()
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" size="x-small" icon variant="plain">
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
          class="lucide lucide-circle-x"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar>
          <v-toolbar-title class="text-center">{{
            $t('titles.deleteConfirmation')
          }}</v-toolbar-title>
        </v-toolbar>

        <v-card-text class="text-left"
          >{{ $t('texts.deleteDialog') }}<br />{{ address }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="tonal" @click="isActive.value = false">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn
            variant="tonal"
            color="red"
            @click="
              () => {
                onDelete(id)
                isActive.value = false
              }
            "
          >
            {{ $t('buttons.delete') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
