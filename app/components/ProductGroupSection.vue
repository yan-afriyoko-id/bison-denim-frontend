<template>
  <section class="bg-white" v-if="hasAnyProduct">
    <div class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2
        class="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-[var(--color-brand-black-soft)]"
      >
        {{ groupTitle || "Rekomendasi Untukmu" }}
      </h2>

      <div v-if="loading" class="text-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E9322B] mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Memuat Rekomendasi Untukmu...</p>
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-600">
        {{ error }}
      </div>

      <div v-else>
        <div class="relative mb-7.5">
          <!-- Left Arrow -->
          <button
            v-if="canScrollLeft"
            @click="scrollTabsLeft"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
            aria-label="Scroll tabs left"
          >
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.2625 20.7375L13.5375 15L19.2625 9.2625L17.5 7.5L10 15L17.5 22.5L19.2625 20.7375Z" fill="#292929" />
            </svg>
          </button>

          <!-- Scrollable Tab Container -->
          <div
            ref="tabsRef"
            class="tabs-scroll flex gap-3 overflow-x-auto scroll-smooth"
            :class="[canScrollLeft ? 'pl-9' : '', canScrollRight ? 'pr-9' : '']"
            @scroll="updateScrollState"
          >
            <button
              v-for="sub in subGroups"
              :key="sub.id"
              @click="activeSubGroupId = sub.id"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition hover:cursor-pointer shrink-0',
                activeSubGroupId === sub.id
                  ? 'bg-[#E9322B] text-white'
                  : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
              ]"
            >
              {{ sub.title }}
            </button>
          </div>

          <!-- Right Arrow -->
          <button
            v-if="canScrollRight"
            @click="scrollTabsRight"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F]"
            aria-label="Scroll tabs right"
          >
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7375 20.7375L16.4625 15L10.7375 9.2625L12.5 7.5L20 15L12.5 22.5L10.7375 20.7375Z" fill="#292929" />
            </svg>
          </button>
        </div>

        <div class="relative">
          <div
            :class="[
              'flex flex-col',
              groupImage ? 'lg:flex-row lg:gap-12' : '',
            ]"
          >
            <NuxtImg
              v-if="groupImage"
              :src="groupImage"
              :alt="groupTitle"
              width="364"
              height="436"
              class="w-full lg:w-91 h-auto lg:h-109 object-cover rounded-lg shrink-0 mb-4 lg:mb-0"
              fit="cover"
            />

            <div
              :class="['flex-1 relative min-w-0', groupImage ? '' : 'w-full']"
            >
              <div
                v-if="activeProducts.length === 0"
                class="text-center py-10 text-gray-500"
              >
                Belum ada produk
              </div>

              <!-- Mobile grid (2 kolom) -->
              <div class="grid grid-cols-2 lg:hidden gap-3 sm:gap-4">
                <NuxtLink
                  v-for="product in activeProducts"
                  :key="product.id"
                  :to="`/products/${product.slug || product.id}`"
                  class="block h-full"
                >
                  <Product
                    :name="product.name"
                    :image="
                      product.featured_image?.path || '/placeholder-product.png'
                    "
                    :finalPrice="product.final_price || product.base_price || 0"
                    :strikePrice="product.base_strike_price"
                    :rating="product.average_rating || 0"
                    :reviews="product.review_count || 0"
                    :discount="product.discount_percent || 0"
                    :newArrival="product.is_new_arrival || false"
                    size="large"
                  />
                </NuxtLink>
              </div>

              <!-- Desktop slider (hanya kalau > 3 produk) -->
              <div
                v-if="activeProducts.length > 0"
                class="relative hidden lg:block"
              >
                <div
                  ref="sliderRef"
                  class="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                  :class="{ 'justify-start': activeProducts.length > 5 }"
                >
                  <NuxtLink
                    v-for="product in activeProducts"
                    :key="product.id"
                    :to="`/products/${product.slug || product.id}`"
                    class="block shrink-0 snap-start"
                  >
                    <Product
                      :name="product.name"
                      :image="
                        product.featured_image?.path ||
                        '/placeholder-product.png'
                      "
                      :finalPrice="
                        product.final_price || product.base_price || 0
                      "
                      :strikePrice="product.base_strike_price"
                      :rating="product.average_rating || 0"
                      :reviews="product.review_count || 0"
                      :discount="product.discount_percent || 0"
                      :newArrival="product.is_new_arrival || false"
                      size="large"
                    />
                  </NuxtLink>
                </div>

                <button
                  v-if="activeProducts.length > 5"
                  @click="scrollLeft"
                  class="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition z-10 hover:cursor-pointer"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2625 9.2625L13.5375 15L19.2625 20.7375L17.5 22.5L10 15L17.5 7.5L19.2625 9.2625Z"
                      fill="#292929"
                    />
                  </svg>
                </button>
                <button
                  v-if="activeProducts.length > 5"
                  @click="scrollRight"
                  class="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition z-10 hover:cursor-pointer"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import { useProductSubGroupApi } from "~/composables/useProductSubGroupApi";
import type { ProductGroup } from "~/types/product-group";

const props = defineProps<{
  group: ProductGroup;
}>();

const { getProductGroupByKey } = useProductGroupApi();
const { getSubGroups } = useProductSubGroupApi();

const groupTitle = ref("");
const groupImage = ref<string | null>(null);
const subGroups = ref<any[]>([]);
const activeSubGroupId = ref<number | null>(null);
const productsBySubGroup = ref<Record<number, any[]>>({});
const loading = ref(true);
const error = ref<string | null>(null);

const activeProducts = computed(() => {
  if (!activeSubGroupId.value) return [];
  return productsBySubGroup.value[activeSubGroupId.value] || [];
});

const hasAnyProduct = computed(() => {
  return subGroups.value.some((sub) => {
    return sub.id && (productsBySubGroup.value[sub.id]?.length ?? 0) > 0;
  });
});

const sliderRef = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};

const tabsRef = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

const updateScrollState = () => {
  if (!tabsRef.value) return;
  const { scrollLeft, scrollWidth, clientWidth } = tabsRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1;
};

const scrollTabsLeft = () => {
  tabsRef.value?.scrollBy({ left: -200, behavior: "smooth" });
};

const scrollTabsRight = () => {
  tabsRef.value?.scrollBy({ left: 200, behavior: "smooth" });
};

const loadData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const groupRes = await getProductGroupByKey(props.group.key);
    if (!groupRes.data?.data) throw new Error("Group tidak ditemukan");

    const group = groupRes.data.data;
    groupTitle.value = group.title;
    groupImage.value = group.image_url || null;
    const productLimit = groupImage.value ? 8 : 10;

    const subRes = await getSubGroups(group.id, productLimit);
    if (subRes.data?.data) {
      subGroups.value = subRes.data.data;

      subGroups.value.forEach((sub: any) => {
        productsBySubGroup.value[sub.id] = sub.products || [];
      });

      if (subGroups.value.length > 0) {
        activeSubGroupId.value = subGroups.value[0].id;
      }
    }
  } catch (err: any) {
    error.value = err.message || "Gagal memuat data";
  } finally {
    loading.value = false;
    await nextTick();
    updateScrollState();
  }
};

onMounted(() => {
  loadData();
  window.addEventListener("resize", updateScrollState);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScrollState);
});
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar,
.tabs-scroll::-webkit-scrollbar,
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.tabs-scroll,
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
