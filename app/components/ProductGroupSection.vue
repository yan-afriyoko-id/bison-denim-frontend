<template>
  <section class="bg-white" v-if="hasAnyProduct">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[50px] py-8 md:py-12">
      <!-- Section Header -->
      <div class="text-center mb-[46px]">
        <h3
          class="text-[26px] font-semibold leading-[36px] mb-5 text-[#151515]"
          style="letter-spacing: normal;text-transform:none"
        >
          {{ groupTitle || 'NEW ARRIVALS' }}
        </h3>
        <p
          class="text-sm leading-[22.4px] text-[#151515] max-w-2xl mx-auto mb-5"
        >
          Explore the season's most coveted pieces, designed to effortlessly elevate your look with stylish verve. Each piece, including sleek card holders and durable real leather wallets, is crafted with modern elegance.
        </p>
        <NuxtLink
          :to="`/products?group=${group?.key || ''}`"
          class="link-underline-anim text-sm text-[#151515] font-medium"
        >
          View More
        </NuxtLink>
      </div>

      <!-- Tabs (sub-groups) -->
      <div v-if="subGroups.length > 1" class="flex justify-center gap-4 mb-8">
        <button
          v-for="sub in subGroups"
          :key="sub.id"
          @click="activeSubGroupId = sub.id"
          :class="[
            'text-sm font-medium pb-1 transition hover:cursor-pointer',
            activeSubGroupId === sub.id
              ? 'text-black border-b border-black'
              : 'text-gray-400 hover:text-gray-600',
          ]"
        >
          {{ sub.title }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-10">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mx-auto"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-10 text-gray-500">{{ error }}</div>

      <!-- Empty -->
      <div v-else-if="activeProducts.length === 0" class="text-center py-10 text-gray-400">
        Belum ada produk
      </div>

      <!-- Product Grid -->
      <div v-else class="flex flex-wrap gap-5 justify-start px-0 md:px-[6px]">
        <NuxtLink
          v-for="product in activeProducts"
          :key="product.id"
          :to="`/products/${product.slug || product.id}`"
          class="flex flex-col p-0 text-left group"
          style="width:calc(50% - 10px);"
          :class="[
            'sm:w-[calc(33.33%-14px)]',
            'md:w-[calc(25%-15px)]',
            'lg:w-[251.542px]'
          ]"
        >
          <figure class="m-0 p-0 mb-5">
            <img
              :src="product.featured_image?.path || '/placeholder-product.png'"
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
            >{{ formatPrice(product.final_price || product.base_price || 0) }}</p>
            <div v-if="product.colors?.length" class="flex gap-1.5 mt-2 flex-wrap">
              <span
                v-for="(color, ci) in product.colors.slice(0, 5)"
                :key="ci"
                class="w-3.5 h-3.5 rounded-full border border-gray-300"
                :style="{ backgroundColor: color.hex || '#ccc' }"
                :title="color.name || ''"
              ></span>
              <span
                v-if="product.colors.length > 5"
                class="text-[10px] text-gray-500 self-center"
              >+{{ product.colors.length - 5 }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from "vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import { useProductSubGroupApi } from "~/composables/useProductSubGroupApi";
import type { ProductGroup } from "~/types/product-group";

const props = defineProps<{
  group: ProductGroup;
}>();

const { getProductGroupByKey } = useProductGroupApi();
const { getSubGroups } = useProductSubGroupApi();

const groupTitle = ref("");
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('IDR', 'IDR').trim() + ',00 IDR';
};

const loadData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const groupRes: any = await getProductGroupByKey(props.group.key);
    if (!groupRes?.data?.data) throw new Error("Group tidak ditemukan");

    const group = groupRes.data.data;
    groupTitle.value = group.title;

    const subRes: any = await getSubGroups(group.id, 12);
    if (subRes?.data?.data) {
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
  }
};

onMounted(() => {
  loadData();
});
</script>
