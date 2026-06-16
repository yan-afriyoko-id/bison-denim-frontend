<template>
  <section class="bg-white">
    <div
      class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-2 sm:py-10 md:py-12"
    >
      <h2
        class="text-center text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-6 md:mb-7.5 text-[#1A1919]"
      >
        Our Brand
      </h2>

      <div v-if="loading" class="text-center py-8">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else-if="brands.length === 0" class="text-center py-8">
        <p class="text-muted">No brands available</p>
      </div>

      <div v-else class="relative">
        <div
          class="overflow-x-auto scroll-smooth pt-2 pb-4 px-2 -mx-2"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div class="flex flex-wrap gap-4 sm:gap-6 md:gap-9 justify-center">
            <NuxtLink
              :to="{
                path: '/products',
                query: { brand: brand.slug },
              }"
              v-for="brand in brands"
              :key="brand.id"
              class="shrink-0 h-20 sm:h-30"
            >
              <NuxtImg
                v-if="brand.logo"
                :src="brand.logo"
                :alt="brand.name"
                width="450"
                height="120"
                class="w-full h-full object-cover rounded-sm sm:rounded-xl aspect-[3.75] shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-100 rounded-sm sm:rounded-xl aspect-[3.75] shadow-sm"
              >
                <span class="text-gray-400 text-sm sm:text-base md:text-lg">{{
                  brand.name
                }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBrandApi } from "~/composables/useBrandApi";
import type { Brand } from "~/types/brand";

const { getActiveBrands } = useBrandApi();
const brands = ref<Brand[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data, error } = await getActiveBrands();
    if (error) {
      console.error("Failed to load brands:", error);
      brands.value = [];
    } else if (data?.success && data.data?.brands) {
      brands.value = data.data.brands;
    }
  } catch (err) {
    console.error("Error loading brands:", err);
    brands.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
