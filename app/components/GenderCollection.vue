<template>
  <section class="shopify-section">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] py-12 md:py-16">
      <div class="flex flex-col md:flex-row gap-12 items-start">
        <!-- Content -->
        <div class="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <h3
            class="text-[26px] font-semibold leading-[36px] text-black mb-[14px]"
            style="letter-spacing:normal;text-transform:none"
          >
            {{ title }}
          </h3>
          <p class="text-sm leading-[22.4px] text-black mb-5 mt-5">
            {{ description }}
          </p>
          <NuxtLink
            :to="shopMoreLink"
            class="link-underline-anim text-sm text-black font-medium"
          >
            Shop More
          </NuxtLink>
        </div>

        <!-- Slider -->
        <div class="flex-1 w-full overflow-hidden relative">
          <div
            ref="scrollContainer"
            class="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
          >
            <div
              v-for="(product, index) in products"
              :key="index"
              class="snap-start shrink-0 w-[200px] sm:w-[240px] md:w-[260px]"
            >
              <NuxtLink :to="product.link" class="flex flex-col p-0 text-left group">
                <figure class="m-0 p-0 mb-5">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </figure>
                <div class="product-card-info">
                  <h4
                    class="text-sm font-medium text-black m-0 mb-[5px] leading-[21px] truncate"
                    style="text-transform:uppercase;letter-spacing:normal;display:flow-root"
                  >{{ product.name }}</h4>
                  <p
                    class="text-sm font-medium text-black block m-0"
                    style="letter-spacing:0.28px"
                  >{{ product.price }}</p>
                  <div v-if="product.colors?.length" class="flex gap-1.5 mt-2 flex-wrap">
                    <span
                      v-for="color in product.colors"
                      :key="color.name"
                      class="w-3.5 h-3.5 rounded-full border border-gray-300"
                      :style="{ backgroundColor: color.hex }"
                      :title="color.name"
                    ></span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <button
            @click="scroll(-1)"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            @click="scroll(1)"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  description: string
  shopMoreLink: string
  products: Array<{
    name: string
    price: string
    image: string
    link: string
    colors?: Array<{ name: string; hex: string }>
  }>
}>()

const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: number) => {
  if (!scrollContainer.value) return
  const amount = 280 * direction
  scrollContainer.value.scrollBy({ left: amount, behavior: 'smooth' })
}
</script>
