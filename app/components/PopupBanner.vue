<template>
  <!-- Backdrop -->
  <div
    v-if="isVisible && banner"
    @click.self="closeBanner"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <!-- Modal / Banner -->
    <div class="relative w-auto max-w-[90%] lg:max-w-3xl mx-auto">
      <!-- Close Button -->
      <button
        @click="closeBanner"
        class="absolute -top-4 -right-4 rounded-full bg-[#E9322B] z-50 p-1 hover:cursor-pointer"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="white"
          />
        </svg>
      </button>

      <!-- Banner -->
      <div v-if="banner" class="relative">
        <a :href="banner.url" target="_blank" class="block">
          <img
            :src="banner.image"
            :alt="banner.title"
            class="max-w-full h-auto object-cover"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PopupBanner } from "~/types/popupBanner";
import { usePopupBannerApi } from "~/composables/usePopupBannerApi";

const { getRandomPopupBanner } = usePopupBannerApi();

const banner = ref<PopupBanner | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const isVisible = ref(false);

const loadBanner = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data, error: apiError } = await getRandomPopupBanner();
    if (apiError) {
      error.value = apiError.message || "Failed to load banner";
    } else {
      banner.value = data?.data.popup_banner || null;
    }
  } catch (err: any) {
    error.value = err.message || "Unexpected error";
  } finally {
    loading.value = false;
  }
};

const closeBanner = () => {
  isVisible.value = false;
};

onMounted(async () => {
  await loadBanner();

  if (banner.value) {
    setTimeout(() => {
      isVisible.value = true;
    }, 3000);
  }
});
</script>
