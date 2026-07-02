<template>
  <main class="bg-white">
    <AnnouncementBar />
    <Header />
    <HeroBanner class="-mt-[75px]" />
    <TwoCollectionCards />
    <ProductGroupSection
      v-for="group in productGroups"
      :key="group.id"
      :group="group"
    />
    <NewArrivalsSection
      title="NEW ARRIVALS"
      description=""
      shop-more-link="/collections/new-arrival"
      :products="newArrivalProducts"
    />
    <GenderCollectionSplit
      title="MEN'S COLLECTION"
      description="Thoughtfully made to carry life's essentials, these daily staples bring ease and style to commute. Explore stylish everyday pieces that are not only made to move with you but become trusted companions for every journey."
      shop-more-link="/collections/new-arrival-men"
      feature-image="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
      :products="menProducts.slice(0, 3)"
    />
    <GenderCollectionSplit
      title="WOMEN'S COLLECTION"
      description="Effortlessly graceful, these everyday bags are made to carry you through every moment. Thoughtfully crafted with beauty and purpose, each piece transitions effortlessly with quiet refined ease."
      shop-more-link="/collections/new-arrival-women"
      feature-image="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
      :products="womenProducts.slice(0, 3)"
      :reverse="true"
    />
    <CraftsmanshipSection />
    <FooterCards />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ProductGroupSection from "~/components/ProductGroupSection.vue";
import GenderCollectionSplit from "~/components/GenderCollectionSplit.vue";
import NewArrivalsSection from "~/components/NewArrivalsSection.vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import { useProductApi } from "~/composables/useProductApi";
import type { ProductGroup } from "~/types/product-group";

definePageMeta({ layout: "default" });
useHead({ title: "" });

const { getProductGroups } = useProductGroupApi();
const { getProducts } = useProductApi();

const productGroups = ref<ProductGroup[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const menProducts = ref([
  { name: 'VIKTOR SMALL MESSENGER', price: 'Rp 8.600.000,00 IDR', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', link: '/products/viktor-small-messenger', colors: [{ name: 'Black', hex: '#000' }, { name: 'Deep Blue', hex: '#1a2a4a' }] },
  { name: 'LOGAN MEDIUM WAIST POUCH', price: 'Rp 7.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', link: '/products/logan-waist-pouch', colors: [{ name: 'Black', hex: '#000' }, { name: 'Potting Soil', hex: '#5c4033' }] },
  { name: 'VIKTOR BIFOLD LONG WALLET', price: 'Rp 5.700.000,00 IDR', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', link: '/products/viktor-wallet', colors: [{ name: 'Black', hex: '#000' }, { name: 'Cathay Spice', hex: '#8b4513' }] },
  { name: 'NOMADE MEDIUM CROSS SHOULDER', price: 'Rp 8.400.000,00 IDR', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', link: '/products/nomade-cross-shoulder', colors: [{ name: 'Black', hex: '#000' }] },
  { name: 'VIKTOR D2 SMALL MESSENGER', price: 'Rp 9.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', link: '/products/viktor-d2-messenger', colors: [{ name: 'Cathay Spice', hex: '#8b4513' }, { name: 'Potting Soil', hex: '#5c4033' }] },
  { name: 'LOGAN CENTRE FLAP WALLET', price: 'Rp 4.200.000,00 IDR', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', link: '/products/logan-wallet', colors: [{ name: 'Black', hex: '#000' }, { name: 'Potting Soil', hex: '#5c4033' }] },
]);

const newArrivalProducts = ref<any[]>([
  { name: 'VIKTOR CENTRE FLAP WALLET WITH COIN COMPARTMENT', price: 'Rp 4.500.000,00 IDR', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80', link: '/products/viktor-centre-flap-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80' }, { name: 'Circular Grey', hex: '#d9d9d9', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80' }, { name: 'Deep Blue', hex: '#4b5563', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80' }] },
  { name: 'VIKTOR SMALL MESSENGER', price: 'Rp 8.600.000,00 IDR', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', link: '/products/viktor-small-messenger', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' }, { name: 'Grey', hex: '#6b7280', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80' }] },
  { name: 'MILLE SLING WALLET', price: 'Rp 3.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', link: '/products/mille-sling-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' }, { name: 'Potting Soil', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' }] },
  { name: 'LOGAN CENTRE FLAP CARDS WALLET', price: 'Rp 4.200.000,00 IDR', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', link: '/products/logan-centre-flap-cards-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80' }, { name: 'Brown', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' }] },
  { name: 'LOGAN MEDIUM WAIST POUCH', price: 'Rp 7.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', link: '/products/logan-medium-waist-pouch', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80' }, { name: 'Potting Soil', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80' }] },
]);

const womenProducts = ref([
  { name: 'POMMY SMALL HOBO BAG', price: 'Rp 11.300.000,00 IDR', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', link: '/products/pommy-hobo', colors: [{ name: 'Black', hex: '#000' }, { name: 'Tawny Port', hex: '#652d2d' }] },
  { name: 'CANOP MEDIUM SHOULDER BAG', price: 'Rp 10.300.000,00 IDR', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80', link: '/products/canop-shoulder', colors: [{ name: 'Black', hex: '#000' }, { name: 'Bran', hex: '#d4a373' }] },
  { name: 'BOW SMALL HOBO BAG', price: 'Rp 9.600.000,00 IDR', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80', link: '/products/bow-hobo', colors: [{ name: 'Black', hex: '#000' }, { name: 'Bran', hex: '#d4a373' }] },
  { name: 'VERA MEDIUM HOBO BAG', price: 'Rp 10.600.000,00 IDR', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', link: '/products/vera-hobo', colors: [] },
  { name: 'MILLE SLING WALLET', price: 'Rp 3.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80', link: '/products/mille-sling-wallet', colors: [{ name: 'Black', hex: '#000' }, { name: 'Silver Mink', hex: '#c0c0c0' }] },
  { name: 'VIKTOR CENTRE FLAP WALLET', price: 'Rp 4.500.000,00 IDR', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', link: '/products/viktor-wallet', colors: [{ name: 'Black', hex: '#000' }, { name: 'Grey', hex: '#808080' }] },
]);

const loadNewArrivals = async () => {
  try {
    const { data, error: err } = await getProducts(
      1,
      10,
      "created_at",
      "desc",
      undefined,
      undefined,
      undefined,
      undefined,
      { isNewArrival: true },
    );

    if (err || !data?.success) {
      console.warn("Failed to load new arrivals:", err);
      return;
    }

    const products = (data.data?.products || [])
      .filter((p: any) => p.status === "PUBLISH" && p.is_new_arrival)
      .slice(0, 5);

    // If API returns less than 3 products, fallback to dummy data
    if (products.length < 3) {
      console.info(`Only ${products.length} new arrivals from API, using dummy data as fallback`);
      return;
    }

    newArrivalProducts.value = products.map((p: any) => {
      const image =
        p.featured_image?.path ||
        (p.images && p.images.length > 0 ? p.images[0].path : null) ||
        "/assets/img/products/placeholder.png";
      return {
        name: p.name,
        price: `Rp ${new Intl.NumberFormat("id-ID").format(p.final_price || p.base_price || 0)}`,
        image,
        hoverImage: p.images?.[1]?.path || image,
        link: `/products/${p.slug || p.id}`,
        colors: [],
      };
    });
  } catch (e) {
    console.error("Error loading new arrivals:", e);
  }
};

onMounted(async () => {
  try {
    isLoading.value = true;
    const res: any = await getProductGroups({
      perPage: "all",
    });
    if (res?.error || !res?.data?.success) {
      error.value = "Gagal memuat grup produk";
      console.error(res?.error);
      return;
    }

    productGroups.value = res.data.data?.data || [];

    await loadNewArrivals();
  } catch (err) {
    error.value = "Terjadi kesalahan saat memuat data";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
