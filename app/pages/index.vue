<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <HeroBanner />
      <PopupBanner />
      <BrandShowcase />
      <!-- <CategoriesSection /> -->
      <ProductGroupSection
        v-for="group in productGroups"
        :key="group.id"
        :group="group"
      />
      <!-- <CurrentOffersSection /> -->
      <!-- <InspirationSection /> -->
      <!-- <MoreProductsSection /> -->
      <!-- <PromoPartnerSection /> -->
    </div>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import ProductGroupSection from "~/components/ProductGroupSection.vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import type { ProductGroup } from "~/types/product-group";
definePageMeta({
  layout: "default",
});

useHead({
  title: "",
});

const { getProductGroups } = useProductGroupApi();

const productGroups = ref<ProductGroup[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    isLoading.value = true;
    const { data, error: fetchError } = await getProductGroups({
      perPage: "all",
    });

    if (fetchError || !data?.success) {
      error.value = "Gagal memuat grup produk";
      console.error(fetchError);
      return;
    }

    productGroups.value = data.data || [];
  } catch (err) {
    error.value = "Terjadi kesalahan saat memuat data";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
