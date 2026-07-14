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
      :loading="loadingNewArrivals"
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

const newArrivalProducts = ref<any[]>([]);
const loadingNewArrivals = ref(true);

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
  "/assets/img/products/product-1.png";


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
  } finally {
    loadingNewArrivals.value = false;
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
  } finally {
    loadingNewArrivals.value = false;
  }
});
</script>
