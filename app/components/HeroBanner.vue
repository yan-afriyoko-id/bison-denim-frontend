<template>
  <section class="relative overflow-hidden bg-gray-100">
    <div v-if="banner" class="relative flex min-h-[60vh] md:min-h-screen items-center bg-cover bg-center"
      :style="{ backgroundImage: `url(${banner.image})` }">
      <div class="absolute inset-0 bg-black/20"></div>

      <div class="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div class="max-w-xl">
          <h1 v-if="banner.title"
            class="mb-8 text-4xl font-light leading-[1.1] tracking-wide text-white md:text-7xl font-semibold">
            {{ banner.title }}
          </h1>

          <NuxtLink :to="banner.link_url || '/products'"
            class="inline-block border border-white bg-white px-8 ml-1 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-transparent hover:text-white">
            Shop Now
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePublicMainBannerApi } from '~/composables/usePublicMainBannerApi'
import type { MainBanner } from '~/types/mainBanner'

const { getActiveMainBanners } = usePublicMainBannerApi()

const banner = ref<MainBanner | null>({
  id: 0,
  title: '',
  image: '',
  link_url: '/products',
  sort_order: 0,
  status: 'ACTIVE',
  created_at: '',
  updated_at: '',
})

const loadBanner = async () => {
  try {
    const { response } = await getActiveMainBanners('all')
    const raw = response?.data
    const list: MainBanner[] = Array.isArray(raw) ? raw : (raw as any)?.banners || []
    if (list.length > 0) {
      banner.value = list[0]
    }
  } catch {
  }
}

onMounted(async () => {
  await loadBanner()
})
</script>
