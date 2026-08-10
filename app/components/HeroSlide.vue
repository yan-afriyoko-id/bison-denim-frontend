<template>
  <div
    class="relative flex min-h-[60vh] w-full items-center bg-cover bg-center md:min-h-screen"
    :style="{ backgroundImage: `url(${banner.image})` }"
  >
    <div class="absolute inset-0 bg-black/20" />

    <div class="relative z-10 w-full px-6 md:px-16 lg:px-24">
      <div class="max-w-xl">
        <h1
          v-if="banner.title"
          class="mb-8 text-4xl font-semibold leading-[1.1] tracking-wide text-white md:text-7xl"
        >
          {{ banner.title }}
        </h1>

        <NuxtLink
          :to="banner.link_url || '/products'"
          class="ml-1 inline-block border border-white bg-white px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-transparent hover:text-white"
        >
          Shop Now
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MainBanner } from '~/types/mainBanner'

defineProps<{ banner: MainBanner }>()
</script>
