<template>
  <section class="relative overflow-hidden bg-gray-100">
    <div
      v-if="banner"
      class="relative w-full min-h-screen md:min-h-screen bg-cover bg-[center_30%] flex items-end justify-center"
      :style="{ backgroundImage: `url(${banner.image})` }"
    >
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative z-10 text-center text-white px-4 pb-[55px] pt-[75px] horizontal-slideshow--slide-content">
        <div class="flex items-center justify-center gap-6">
          <NuxtLink
            :to="banner.link_url || '/products'"
            class="link-underline-anim text-white text-sm font-medium"
          >
            Discover More
          </NuxtLink>
          <NuxtLink
            :to="banner.link_url2 || '/products'"
            class="link-underline-anim text-white text-sm font-medium"
          >
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
  title: 'ALL HANDS ON DECK 2026',
  image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1440&q=80',
  link_url: '/products',
  link_url2: '/products',
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
