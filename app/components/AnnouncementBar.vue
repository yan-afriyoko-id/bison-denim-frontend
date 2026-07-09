<template>
  <div class="bg-black text-white text-center text-xs sm:text-sm overflow-hidden h-10 relative z-10">
    <div class="relative h-full flex items-center justify-center px-4">
      <Transition name="announce-fade" mode="out-in">
        <p :key="bannerText" class="max-w-[90vw] sm:max-w-4xl truncate" aria-live="polite">
          {{ bannerText }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const DEFAULT_BANNER_TEXT = 'Free Shipping JABODETABEK pembelanjaan Rp150.000+ | New Arrival Denim Collection'

type PublicConfigResponse = {
  success: boolean
  message?: string
  data?: {
    key?: string
    value?: string | null
    value_image?: string | null
    casted_value?: string | null
  } | null
}

const { baseURL } = useApiBase()

const { data: bannerResponse } = await useFetch<PublicConfigResponse>(
  `${baseURL}/public-configs/topbanner`,
  {
    key: 'announcement-bar-topbanner',
    method: 'GET',
    onResponseError({ error }) {
      console.error('Failed to load top banner config:', error)
    },
    default: () => ({
      success: true,
      data: {
        value: DEFAULT_BANNER_TEXT,
        casted_value: DEFAULT_BANNER_TEXT,
      },
    }),
  },
)

const bannerText = computed(() => {
  const configData = bannerResponse.value?.data

  return (
    configData?.casted_value ||
    configData?.value ||
    DEFAULT_BANNER_TEXT
  )
})
</script>

<style scoped>
.announce-fade-enter-active,
.announce-fade-leave-active {
  transition: opacity 0.6s ease;
}

.announce-fade-enter-from,
.announce-fade-leave-to {
  opacity: 0;
}
</style>
