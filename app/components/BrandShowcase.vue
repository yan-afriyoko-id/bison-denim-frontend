<template>
  <section class="bg-white">
    <div
      class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-2 sm:py-10 md:py-12"
    >
      <h2
        class="text-center text-lg sm:text-xl md:text-2xl font-semibold mb-1.5 sm:mb-6 md:mb-7.5 text-[var(--color-brand-black-soft)]"
      >
        Our Store
      </h2>

      <div v-if="loading" class="text-center py-8">
        <p class="text-[#1A1919] text-sm">Loading...</p>
      </div>

      <div v-else-if="stores.length === 0" class="text-center py-8">
        <p class="text-muted">No stores available</p>
      </div>

      <div v-else class="relative">
        <div
          class="overflow-x-auto scroll-smooth pt-2 pb-4 px-2 -mx-2"
          style="scrollbar-width: none; -ms-overflow-style: none"
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            <NuxtLink
              v-for="store in stores"
              :key="store.id"
              :to="{
                path: '/products',
                query: {
                  store_id: String(store.id),
                  store_name: store.name,
                },
              }"
              class="block rounded-xl border border-[#E6E9F0] bg-[#FAFAFA] px-4 py-4 sm:px-5 sm:py-5 text-left transition hover:border-[#E9322B] hover:bg-[#FFF7F7]"
            >
              <h3 class="text-base sm:text-lg font-semibold text-[#1A1919]">
                {{ store.name }}
              </h3>
              <p
                v-if="formatStoreAddress(store)"
                class="mt-2 text-sm text-[#7B7B7B] leading-relaxed"
              >
                {{ formatStoreAddress(store) }}
              </p>
              <p
                v-if="store.phone"
                class="mt-2 text-sm font-medium text-[#1A1919]"
              >
                {{ store.phone }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStoreApi } from "~/composables/useStoreApi";
import type { Store } from "~/types/store";

const { getPublicStores } = useStoreApi();
const stores = ref<Store[]>([]);
const loading = ref(true);

const formatStoreAddress = (store: Store) => {
  return [
    store.address,
    store.city,
    store.province,
    store.country,
    store.postal_code,
  ]
    .filter(Boolean)
    .join(", ");
};

onMounted(async () => {
  try {
    const { data, error } = await getPublicStores();
    if (error) {
      console.error("Failed to load stores:", error);
      stores.value = [];
    } else if (data?.success && data.data?.stores) {
      stores.value = data.data.stores;
    }
  } catch (err) {
    console.error("Error loading stores:", err);
    stores.value = [];
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
