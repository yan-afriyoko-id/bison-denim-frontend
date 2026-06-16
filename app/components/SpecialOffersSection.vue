<template>
  <section class="bg-white" v-if="hasAnyProduct">
    <div class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-12 md:py-10">
      <h2
        class="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-[#1A1919]"
      >
        {{ groupTitle || "Penawaran Spesial" }}
      </h2>

      <div v-if="loading" class="text-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E9322B] mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Memuat Penawaran Spesial...</p>
      </div>

      <div v-else-if="error" class="text-center py-10 text-red-600">
        {{ error }}
      </div>

      <div v-else>
        <div class="flex flex-wrap gap-3 mb-7.5">
          <button
            v-for="sub in subGroups"
            :key="sub.id"
            @click="activeSubGroupId = sub.id"
            :class="[
              'px-4 py-2 rounded-lg font-medium text-sm transition hover:cursor-pointer',
              activeSubGroupId === sub.id
                ? 'bg-[#E9322B] text-white'
                : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
            ]"
          >
            {{ sub.title }}
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
              class="w-full lg:w-91 h-auto lg:h-109 object-cover rounded-lg shrink-0"
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

              <div class="grid grid-cols-2 lg:hidden gap-3 sm:gap-4">
                <Product
                  v-for="product in activeProducts"
                  :key="product.id"
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
              </div>

              <div
                class="hidden lg:flex gap-6 overflow-x-auto scroll-smooth pb-2"
              >
                <Product
                  v-for="product in activeProducts"
                  :key="product.id"
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
                  class="shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import { useProductSubGroupApi } from "~/composables/useProductSubGroupApi";

const { getProductGroupByKey } = useProductGroupApi();
const { getSubGroups } = useProductSubGroupApi();

const groupKey = "penawaran-spesial";

const groupTitle = ref<string>("");
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

const nextLink = computed(() => {
  return `/products/penawaran-spesial?subgroup=${activeSubGroupId.value || ""}`;
});

const loadData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const groupRes = await getProductGroupByKey(groupKey);
    if (!groupRes.data?.data) throw new Error("Group tidak ditemukan");

    const group = groupRes.data.data;
    groupTitle.value = group.title;
    groupImage.value = group.image_url || null;
    const productLimit = groupImage.value ? 4 : 5;

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
  }
};

onMounted(() => {
  loadData();
});
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
</style>
