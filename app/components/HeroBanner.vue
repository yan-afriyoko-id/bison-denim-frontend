<template>
  <section class="relative overflow-hidden bg-gray-100">
    <div v-if="banners.length" class="relative min-h-[60vh] overflow-hidden md:min-h-screen" @mouseenter="stopAutoSlide"
      @mouseleave="startAutoSlide">
      <div class="absolute inset-0" @pointerdown="startDrag" @pointermove="onDrag" @pointerup="endDrag"
        @pointercancel="cancelDrag">
        <div v-for="slot in slots" :key="slot.slotId" class="absolute inset-y-0 left-0 w-full" :style="{
          transform: `translateX(calc(${slot.position * 100}% + ${dragOffset}px))`,
          transition: isDragging
            ? 'none'
            : `transform ${transitionDuration}ms ease-in-out`,
        }">
          <HeroSlide :banner="slot.item" />
        </div>
      </div>

      <button v-if="banners.length > 1" type="button" aria-label="Previous slide"
        class="absolute -left-2 md:left-5 top-1/2 z-30 -translate-y-1/2 p-2 text-white transition-opacity duration-200 hover:opacity-60 cursor-pointer"
        :disabled="isAnimating" @click="previousSlide">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button v-if="banners.length > 1" type="button" aria-label="Next slide"
        class="absolute -right-2 md:right-5 top-1/2 z-30 -translate-y-1/2 p-2 text-white transition-opacity duration-200 hover:opacity-60 cursor-pointer"
        :disabled="isAnimating" @click="nextSlide">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div v-if="banners.length > 1" class="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        <button v-for="(_, index) in banners" :key="index" type="button" :aria-label="`Go to slide ${index + 1}`"
          class="h-1 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed" :class="currentIndex === index
            ? 'w-10 bg-white'
            : 'w-5 bg-white/50 hover:bg-white/80'
            " @click="goToSlide(index)" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublicMainBannerApi } from '~/composables/usePublicMainBannerApi'
import type { MainBanner } from '~/types/mainBanner'

const { getActiveMainBanners } = usePublicMainBannerApi()

const banners = ref<MainBanner[]>([])

const {
  currentIndex,
  slots,
  transitionDuration,
  isAnimating,
  isDragging,
  dragOffset,
  init,
  nextSlide,
  previousSlide,
  goToSlide,
  startDrag,
  onDrag,
  endDrag,
  cancelDrag,
  startAutoSlide,
  stopAutoSlide,
} = useBannerCarousel(banners)

onMounted(async () => {
  try {
    const { response } = await getActiveMainBanners('all')
    const raw = response?.data
    banners.value = Array.isArray(raw) ? raw : raw?.banners || []
    init()
  } catch {
    banners.value = []
  }
})
</script>