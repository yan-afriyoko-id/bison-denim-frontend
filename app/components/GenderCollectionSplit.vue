<template>
  <section class="shopify-section">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] pt-4 md:pt-8 pb-4 md:pb-8">
      <!-- Top: big image left + slider right -->
      <div class="flex flex-col md:flex-row gap-5 mb-6" :class="reverse ? 'md:flex-row-reverse' : ''">
        <!-- Left: big portrait image -->
        <div class="w-full md:w-[39%] flex-shrink-0 text-center">
          <div class="aspect-[3/4] bg-gray-100 overflow-hidden">
            <img
              :src="featureImage"
              alt="Collection"
              class="w-full h-full object-cover select-none pointer-events-none"
              draggable="false"
              ondragstart="return false"
              loading="lazy"
            />
          </div>
        </div>

        <!-- Right: 3 overlapping card slider + text below -->
        <div class="flex-1 w-full min-w-0 flex flex-col items-center">
          <!-- slider: overlapping stacked cards -->
          <div class="relative w-full select-none flex items-start justify-center mb-4" style="height: min(360px, 52vw)">
            <!-- card 1 (left, slightly behind) -->
            <NuxtLink
              :to="products[slideIndex > 0 ? slideIndex - 1 : products.length - 1]?.link || '#'"
              class="absolute top-[18%] left-[5%] w-[30%] opacity-50 blur-[0.8px] pointer-events-none select-none z-0"
            >
              <div class="aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                  :src="products[prevProduct]?.image"
                  class="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </NuxtLink>

            <!-- card 2 (center, main) -->
            <NuxtLink
              :to="products[slideIndex]?.link || '#'"
              class="absolute top-[12%] left-1/2 -translate-x-1/2 w-[36%] z-10 shadow-xl"
            >
              <div class="aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                  :src="products[slideIndex]?.image"
                  class="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </NuxtLink>

            <!-- card 3 (right, slightly behind) -->
            <NuxtLink
              :to="products[slideIndex < products.length - 1 ? slideIndex + 1 : 0]?.link || '#'"
              class="absolute top-[18%] right-[5%] w-[30%] opacity-50 blur-[0.8px] pointer-events-none select-none z-0"
            >
              <div class="aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                  :src="products[nextProduct]?.image"
                  class="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            </NuxtLink>

            <button
              @click="slidePrev"
              class="absolute top-[60%] -translate-y-1/2 left-[3%] z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition cursor-pointer border border-gray-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              @click="slideNext"
              class="absolute top-[60%] -translate-y-1/2 right-[3%] z-20 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition cursor-pointer border border-gray-300"
            >
              <svg class="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <!-- text below slider -->
          <div class="mt-6 md:mt-8 w-[80%] mx-auto">
            <h3
              class="text-[26px] font-semibold leading-[36px] text-black mb-[14px]"
              style="letter-spacing:normal;text-transform:none"
            >
              {{ title }}
            </h3>
            <p class="text-sm leading-[22.4px] text-black mb-5 font-medium">
              {{ description }}
            </p>
            <NuxtLink :to="shopMoreLink" class="link-underline-anim text-sm text-black font-medium">Shop More</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  description: string
  shopMoreLink: string
  featureImage: string
  reverse?: boolean
  products: Array<{
    name: string
    price: string
    image: string
    link: string
  }>
}>()

const slideIndex = ref(1)

const prevProduct = computed(() => {
  const idx = slideIndex.value > 0 ? slideIndex.value - 1 : props.products.length - 1
  return idx
})

const nextProduct = computed(() => {
  const idx = slideIndex.value < props.products.length - 1 ? slideIndex.value + 1 : 0
  return idx
})

const slidePrev = () => {
  slideIndex.value = slideIndex.value > 0 ? slideIndex.value - 1 : props.products.length - 1
}

const slideNext = () => {
  slideIndex.value = slideIndex.value < props.products.length - 1 ? slideIndex.value + 1 : 0
}
</script>
