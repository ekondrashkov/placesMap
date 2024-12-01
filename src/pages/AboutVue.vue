<template>
  <div class="overflow-y-auto h-full text-sm sm:text-base">
    <div class="flex flex-col max-w-screen-2xl mx-auto p-4">
      <!-- Task name and description -->
      <section class="mb-6">
        <h2 class="text-xl md:text-3xl mb-4">{{ $t('titles.name') }}</h2>
        <p>
          {{ $t('about.description') }}
        </p>
      </section>

      <section class="mb-8">
        <h3 class="text-xl md:text-2xl mb-4">{{ $t('about.howToHandle') }}</h3>
        <ol class="flex flex-col gap-y-4 list-decimal list-inside pl-4 mb-4">
          <li>{{ $t('about.howToHandle1') }}</li>
          <li>{{ $t('about.howToHandle2') }}</li>
          <li>{{ $t('about.howToHandle3') }}</li>
        </ol>
        <p>{{ $t('about.comment') }}</p>
      </section>
    </div>
  </div>
</template>
