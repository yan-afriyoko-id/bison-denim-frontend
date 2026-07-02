<template>
  <section class="shopify-section">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] py-4 md:py-8">
      <div class="text-center mb-6 max-w-3xl mx-auto">
        <h3
          class="text-[26px] font-semibold leading-[36px] text-black mb-5"
          style="letter-spacing:normal;text-transform:none"
        >
          {{ title }}
        </h3>
        <p class="text-sm leading-[22.4px] text-black mb-5">
          {{ description }}
        </p>
        <NuxtLink :to="shopMoreLink" class="link-underline-anim text-sm text-black font-medium">View More</NuxtLink>
      </div>

      <!-- Slider wrapper: arrows positioned relative to this -->
      <div class="relative">
        <div
          ref="scrollContainer"
          class="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar px-[2px] cursor-grab active:cursor-grabbing"
          @mousedown="onDragStart"
        >
          <div
            v-for="(product, pi) in products"
            :key="pi"
            class="snap-start shrink-0 w-[220px] sm:w-[260px] md:w-[280px] select-none"
          >
            <div class="flex flex-col pb-3 text-left group/card bg-gray-100 rounded-sm" @mouseenter="hoveredIndex = pi" @mouseleave="hoveredIndex = -1">
              <figure
                class="m-0 p-0 mb-5 overflow-hidden relative cursor-pointer"
                @click="navigate(product.link)"
              >
                <img
                  :key="'main-' + pi + '-' + activeImages[pi]"
                  :src="activeImages[pi] || product.image"
                  :alt="product.name"
                  class="w-full aspect-square object-cover transition-opacity duration-300 ease-out select-none pointer-events-none"
                  :class="hoveredIndex === pi && product.hoverImage ? 'opacity-0' : 'opacity-100'"
                  loading="lazy"
                  draggable="false"
                  ondragstart="return false"
                />
                <img
                  v-if="product.hoverImage"
                  :key="'hover-' + pi"
                  :src="product.hoverImage"
                  :alt="product.name"
                  class="absolute inset-0 w-full h-full aspect-square object-cover transition-opacity duration-300 ease-out select-none pointer-events-none"
                  :class="hoveredIndex === pi ? 'opacity-100' : 'opacity-0'"
                  loading="lazy"
                  draggable="false"
                  ondragstart="return false"
                />
              </figure>
              <div class="px-3 product-card-info overflow-hidden">
                <h4
                  class="link-underline-anim text-sm font-medium text-black m-0 mb-[5px] leading-[21px]"
                  style="text-transform:uppercase;letter-spacing:normal"
                >
                  <a :href="product.link" class="text-black no-underline block truncate">{{ product.name }}</a>
                </h4>
                <p class="text-sm font-medium text-black block m-0" style="letter-spacing:0.28px">{{ product.price }}</p>
                <div v-if="product.colors?.length" class="flex gap-1.5 mt-2 flex-wrap">
                  <button
                    v-for="(color, ci) in product.colors"
                    :key="color.name"
                    @click="selectColor(pi, ci, color)"
                    class="w-3.5 h-3.5 rounded-full border border-gray-300 p-0 cursor-pointer"
                    :class="selectedColor[pi] === ci ? 'ring-1 ring-offset-1 ring-black' : ''"
                    :style="{ backgroundColor: color.hex }"
                    :title="color.name"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="scroll(-1)"
          class="absolute top-[35%] -translate-y-1/2 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer z-10"
        >
          <svg class="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          @click="scroll(1)"
          class="absolute top-[35%] -translate-y-1/2 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition cursor-pointer z-10"
        >
          <svg class="w-4 h-4" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

interface ProductColor {
  name: string
  hex: string
  image?: string
}

interface Product {
  name: string
  price: string
  image: string
  hoverImage?: string
  link: string
  colors?: ProductColor[]
}

const props = defineProps<{
  title: string
  description: string
  shopMoreLink: string
  products: Product[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const hoveredIndex = ref(-1)
const selectedColor = reactive<Record<number, number>>({})
const activeImages = reactive<Record<number, string>>({})

const scroll = (dir: number) => {
  scrollContainer.value?.scrollBy({ left: 300 * dir, behavior: 'smooth' })
}

const selectColor = (pi: number, ci: number, color: ProductColor) => {
  selectedColor[pi] = ci
  activeImages[pi] = color.image || props.products[pi]?.image
}

const navigate = (link: string) => {
  window.location.href = link
}

// Drag scroll with proper mouseup/mousemove cleanup
let isDragging = false
let startX = 0
let scrollLeftPos = 0

const onDragStart = (e: MouseEvent) => {
  if (!scrollContainer.value) return
  isDragging = true
  startX = e.pageX
  scrollLeftPos = scrollContainer.value.scrollLeft
  document.addEventListener('mousemove', onDragMove)
  document.addEventListener('mouseup', onDragEnd)
}

const onDragMove = (e: MouseEvent) => {
  if (!isDragging || !scrollContainer.value) return
  const x = e.pageX
  const walk = (x - startX) * 1.2
  scrollContainer.value.scrollLeft = scrollLeftPos - walk
}

const onDragEnd = () => {
  isDragging = false
  document.removeEventListener('mousemove', onDragMove)
  document.removeEventListener('mouseup', onDragEnd)
}

onUnmounted(() => {
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
  })
</script>
