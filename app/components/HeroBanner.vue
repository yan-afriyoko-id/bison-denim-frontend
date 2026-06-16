<template>
  <section v-if="banners.length > 0" class="relative overflow-hidden my-4">
    <!-- Carousel Container -->
    <div
      class="max-w-screen-2xl relative aspect-[1424/405] w-full mx-auto px-2 sm:px-4 md:px-11"
    >
      <!-- Slides -->
      <TransitionGroup tag="div" name="carousel" class="w-full h-full relative">
        <div
          v-for="(banner, index) in banners"
          v-show="index === currentSlide"
          :key="banner.id"
          class="absolute inset-0 w-full px-0 sm:py-3 md:py-4 lg:py-5"
        >
          <component
            :is="banner.link_url ? 'a' : 'div'"
            :href="banner.link_url || undefined"
            target="_self"
            class="block cursor-pointer"
          >
            <NuxtImg
              :src="banner.image"
              :alt="banner.title || 'Main Banner'"
              class="w-full aspect-[1424/405] object-cover rounded-lg"
              loading="lazy"
              @error="handleImageError"
            />
          </component>
        </div>
      </TransitionGroup>

      <button
        v-if="banners.length > 1"
        @click="previousSlide"
        class="w-6 sm:w-10 h-6 sm:h-10 absolute left-2 sm:left-8 md:left-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
        aria-label="Previous slide"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.2625 20.7375L13.5375 15L19.2625 9.2625L17.5 7.5L10 15L17.5 22.5L19.2625 20.7375Z"
            fill="#292929"
          />
        </svg>
      </button>

      <button
        v-if="banners.length > 1"
        @click="nextSlide"
        class="w-6 sm:w-10 h-6 sm:h-10 absolute right-2 sm:right-8 md:right-5 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
        aria-label="Next slide"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7375 20.7375L16.4625 15L10.7375 9.2625L12.5 7.5L20 15L12.5 22.5L10.7375 20.7375Z"
            fill="#292929"
          />
        </svg>
      </button>
    </div>

    <!-- Dots Indicator (only if multiple banners) -->
    <div
      v-if="banners.length > 1"
      class="absolute bottom-2 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center"
    >
      <button
        v-for="(banner, index) in banners"
        :key="banner.id"
        @click="currentSlide = index"
        :class="[
          'w-[5px] h-[5px] rounded-full transition-all duration-300',
          index === currentSlide
            ? 'bg-white w-[7px] h-[7px]'
            : 'bg-[rgba(217,217,217,1)]',
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { usePublicMainBannerApi } from "~/composables/usePublicMainBannerApi";
import type { MainBanner } from "~/types/mainBanner";

const { getActiveMainBanners } = usePublicMainBannerApi();

const banners = ref<MainBanner[]>([]);
const loading = ref(false);
const currentSlide = ref(0);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const loadBanners = async () => {
  loading.value = true;
  try {
    const { response, error } = await getActiveMainBanners("all");

    if (error || !response?.success) {
      console.error("Failed to load main banners:", error);
      banners.value = [];
      return;
    }

    const bannersData = response.data || [];
    banners.value = bannersData;
  } catch (err) {
    console.error("Error loading main banners:", err);
    banners.value = [];
  } finally {
    loading.value = false;
  }
};

const startAutoplay = () => {
  if (banners.value.length <= 1) return;

  stopAutoplay();
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const nextSlide = () => {
  if (banners.value.length <= 1) return;

  stopAutoplay();
  currentSlide.value = (currentSlide.value + 1) % banners.value.length;
  startAutoplay();
};

const previousSlide = () => {
  if (banners.value.length <= 1) return;

  stopAutoplay();
  currentSlide.value =
    (currentSlide.value - 1 + banners.value.length) % banners.value.length;
  startAutoplay();
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/assets/img/placeholder-banner.png";
};

onMounted(async () => {
  await loadBanners();
  if (banners.value.length > 1) {
    startAutoplay();
  }
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.5s ease;
}

.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}

.carousel-enter-to,
.carousel-leave-from {
  opacity: 1;
}

/* Hide arrows on mobile if needed */
@media (max-width: 640px) {
  button[aria-label="Previous slide"],
  button[aria-label="Next slide"] {
    /* Uncomment to hide on mobile: */
    /* display: none; */
  }
}
</style>
