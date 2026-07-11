<template>
  <main class="bg-white">
    <Header />
    <HeroBanner class="-mt-[115px]" />
    <TwoCollectionCards />
    <NewArrivalsSection
      title="NEW ARRIVALS"
      description="Explore the season's most coveted pieces, designed to effortlessly elevate your look with stylish verve. Each piece, including sleek card holders and durable real leather wallets, is crafted with modern elegance."
      shop-more-link="/products"
      :products="newArrivalProducts"
    />
    <GenderCollectionSplit
      v-for="section in collectionSections"
      :key="section.key"
      :title="section.title"
      :description="section.description"
      :shop-more-link="section.shopMoreLink"
      :feature-image="section.featureImage"
      :products="section.products"
      :reverse="section.reverse"
    />
    <!-- <CraftsmanshipSection /> -->
    <!-- <FooterCards /> -->
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import GenderCollectionSplit from "~/components/GenderCollectionSplit.vue";
import NewArrivalsSection from "~/components/NewArrivalsSection.vue";
import { useProductGroupApi } from "~/composables/useProductGroupApi";
import { useProductSubGroupApi } from "~/composables/useProductSubGroupApi";
import { useProductApi } from "~/composables/useProductApi";
import type { ProductGroup } from "~/types/product-group";

definePageMeta({ layout: "default" });
useHead({ title: "" });

const { getProductGroups } = useProductGroupApi();
const { getSubGroups } = useProductSubGroupApi();
const { getProducts } = useProductApi();

const newArrivalProducts = ref<any[]>([
  { name: 'VIKTOR CENTRE FLAP WALLET WITH COIN COMPARTMENT', price: 'Rp 4.500.000,00 IDR', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80', link: '/products/viktor-centre-flap-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80' }, { name: 'Circular Grey', hex: '#d9d9d9', image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&q=80' }, { name: 'Deep Blue', hex: '#4b5563', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80' }] },
  { name: 'VIKTOR SMALL MESSENGER', price: 'Rp 8.600.000,00 IDR', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', link: '/products/viktor-small-messenger', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80' }, { name: 'Grey', hex: '#6b7280', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80' }] },
  { name: 'MILLE SLING WALLET', price: 'Rp 3.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', link: '/products/mille-sling-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' }, { name: 'Potting Soil', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' }] },
  { name: 'LOGAN CENTRE FLAP CARDS WALLET', price: 'Rp 4.200.000,00 IDR', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', link: '/products/logan-centre-flap-cards-wallet', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80' }, { name: 'Brown', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' }] },
  { name: 'LOGAN MEDIUM WAIST POUCH', price: 'Rp 7.900.000,00 IDR', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80', hoverImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80', link: '/products/logan-medium-waist-pouch', colors: [{ name: 'Black', hex: '#000', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&q=80' }, { name: 'Potting Soil', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&q=80' }] },
]);

type CollectionProduct = {
  name: string;
  price: string;
  image: string;
  link: string;
};

type CollectionSection = {
  key: string;
  title: string;
  description: string;
  featureImage: string;
  shopMoreLink: string;
  reverse?: boolean;
  products: CollectionProduct[];
};

const collectionSections = ref<CollectionSection[]>([]);

const DEFAULT_COLLECTION_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80";


type PublicCollectionProduct = {
  id: number;
  name: string;
  slug: string;
  featured_image?: {
    path: string;
  } | null;
  images?: Array<{
    path: string;
  }>;
  base_price?: number | null;
  final_price?: number | null;
};

type PublicCollectionSubGroup = {
  id: number;
  product_group_id: number;
  title: string;
  sort: number;
  products: PublicCollectionProduct[];
};

const pickCollectionImage = (group: ProductGroup) => {
  return group.image_url || DEFAULT_COLLECTION_IMAGE;
};

const mapCollectionProduct = (product: PublicCollectionProduct): CollectionProduct => {
  const image =
    product.featured_image?.path ||
    product.images?.[0]?.path ||
    "/assets/img/products/placeholder.png";

  return {
    name: product.name,
    price: formatCurrency(product.final_price || product.base_price),
    image,
    link: `/products/${product.slug || product.id}`,
  };
};

const loadCollectionSections = async (groups: ProductGroup[]) => {
  const candidates = groups.filter((group) => {
    return group.status === "ACTIVE" && (group.sub_groups?.length ?? 0) > 0;
  });

  const selected = candidates.map((group, index) => ({
    group,
    reverse: index % 2 === 1,
  }));

  const sections = await Promise.all(
    selected.map(async ({ group, reverse }) => {
      const { data, error } = await getSubGroups(group.id, 3);
      const subGroups: PublicCollectionSubGroup[] = data?.data || [];

      if (error) {
        console.warn("Failed to load collection products:", error);
      }

      const products = subGroups
        .flatMap((subGroup: any) => subGroup.products || [])
        .map(mapCollectionProduct);

      const uniqueProducts = products.filter(
        (product, index, array) => array.findIndex((item) => item.link === product.link) === index,
      );

      return {
        key: group.key,
        title: group.title,
        description:
          group.description ||
          "Explore curated pieces from this collection, thoughtfully selected to fit everyday use and styling.",
        featureImage: pickCollectionImage(group),
        shopMoreLink: "/products",
        reverse,
        products: uniqueProducts.slice(0, 3),
      };
    }),
  );

  collectionSections.value = sections.filter((section) => section.products.length > 0);
};

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
    const res: any = await getProductGroups({
      perPage: "all",
    });

    if (res?.error || !res?.data?.success) {
      console.error(res?.error);
      return;
    }

    const groups = Array.isArray(res?.data?.data)
      ? res.data.data
      : res?.data?.data?.data || [];

    await loadCollectionSections(groups);

    await loadNewArrivals();
  } catch (err) {
    console.error(err);
  }
});
</script>
