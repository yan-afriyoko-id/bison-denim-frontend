<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-12 md:py-16 lg:py-20 flex-1">
      <!-- Page Title -->
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-medium text-[#1A1919] text-center mb-6 sm:mb-8 md:mb-10 tracking-[-0.04em]"
      >
        Aktivitas & Update
      </h1>

      <!-- Search and Filter Bar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 sm:mb-16 md:mb-20 max-w-[700px] mx-auto">
        <!-- Search Input -->
        <div
          class="flex-1 flex items-center gap-2 sm:gap-3 bg-white border border-[#E6E9F0] rounded-lg pr-2 pl-3 sm:pl-4.5 py-2"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari blog"
            class="flex-1 outline-none text-sm sm:text-base text-[#1A1919] placeholder:text-[#808080]"
          />
          <button
            @click="handleSearch"
            class="bg-[#E9322B] w-9 h-8 sm:w-11.5 sm:h-9 flex justify-center items-center text-white rounded-lg transition shrink-0 hover:cursor-pointer hover:bg-[#C4282B]"
          >
            <div class="w-5 h-5 sm:w-6 sm:h-6">
              <svg
                class="w-full h-full"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.3755 2.16699C9.90716 2.16712 8.46012 2.51839 7.15513 3.19149C5.85014 3.8646 4.72504 4.84003 3.87369 6.03639C3.02235 7.23276 2.46945 8.61537 2.26112 10.0689C2.05279 11.5224 2.19508 13.0046 2.67611 14.392C3.15714 15.7793 3.96297 17.0315 5.02636 18.044C6.08975 19.0566 7.37987 19.8002 8.78908 20.2127C10.1983 20.6253 11.6857 20.6949 13.1273 20.4156C14.5689 20.1364 15.9228 19.5165 17.076 18.6077L21.0324 22.564C21.2367 22.7613 21.5103 22.8705 21.7944 22.8681C22.0784 22.8656 22.3501 22.7517 22.551 22.5508C22.7519 22.3499 22.8658 22.0782 22.8683 21.7942C22.8707 21.5101 22.7615 21.2365 22.5642 21.0322L18.6079 17.0758C19.6782 15.718 20.3446 14.0863 20.5309 12.3674C20.7171 10.6485 20.4157 8.91185 19.6611 7.35626C18.9065 5.80067 17.7291 4.48896 16.2638 3.57124C14.7986 2.65352 13.1045 2.16688 11.3755 2.16699ZM4.33385 11.3753C4.33385 9.50776 5.07574 7.71668 6.39631 6.39612C7.71688 5.07555 9.50795 4.33366 11.3755 4.33366C13.2431 4.33366 15.0342 5.07555 16.3547 6.39612C17.6753 7.71668 18.4172 9.50776 18.4172 11.3753C18.4172 13.2429 17.6753 15.034 16.3547 16.3545C15.0342 17.6751 13.2431 18.417 11.3755 18.417C9.50795 18.417 7.71688 17.6751 6.39631 16.3545C5.07574 15.034 4.33385 13.2429 4.33385 11.3753Z"
                  fill="white"
                />
              </svg>
            </div>
          </button>
        </div>

        <!-- Category Dropdown -->
        <div class="relative" ref="categoryDropdownRef">
          <button
            @click.stop="isCategoryDropdownOpen = !isCategoryDropdownOpen"
            class="flex items-center gap-2 bg-white border border-[#E6E9F0] rounded-lg px-2.5 sm:p-2.5 py-2 sm:py-2.5 justify-between hover:cursor-pointer w-full sm:w-50"
          >
            <span :class="['text-sm sm:text-base', selectedCategory ? 'text-[#1A1919]' : 'text-[#7B7B7B]']">
              {{ selectedCategoryName }}
            </span>
            <div class="w-5 h-5 sm:w-7.5 sm:h-7.5 shrink-0">
              <svg
                class="w-full h-full"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.2625 10.7375L15 16.4625L20.7375 10.7375L22.5 12.5L15 20L7.5 12.5L9.2625 10.7375Z"
                  fill="#7B7B7B"
                />
              </svg>
            </div>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isCategoryDropdownOpen"
            class="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-full bg-white border border-[#E6E9F0] rounded-lg shadow-lg z-10"
            @click.stop
          >
            <button
              @click="selectCategory('')"
              :class="[
                'w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#F8F8F8] transition text-sm sm:text-base',
                selectedCategory === ''
                  ? 'bg-[#E9322B14] text-[#E9322B]'
                  : 'text-[#7B7B7B]',
              ]"
            >
              Semua Kategori
            </button>
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="[
                'w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-[#F8F8F8] transition text-sm sm:text-base',
                String(selectedCategory) === String(category.id)
                  ? 'bg-[#E9322B14] text-[#E9322B]'
                  : 'text-[#1A1919]',
              ]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Blog Grid -->
      <div v-if="isLoading" class="text-center py-10 sm:py-16 md:py-20">
        <p class="text-sm sm:text-base text-[#7B7B7B]">Memuat blog...</p>
      </div>

      <div
        v-else-if="blogs.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10"
      >
        <BlogCard
          v-for="blog in blogs"
          :key="blog.id"
          :blog="blog"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-10 sm:py-16 md:py-20">
        <p class="text-sm sm:text-base text-[#7B7B7B]">Tidak ada blog yang ditemukan</p>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-4 sm:gap-6 md:gap-9 py-6 sm:py-8 md:py-11"
      >
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          :class="[
            'px-2 sm:px-3 transition rounded-sm',
            currentPage === 1
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#F6F9FF] hover:cursor-pointer',
          ]"
        >
          <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9">
            <svg
              class="w-full h-full"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.115 24.885L16.245 18L23.115 11.115L21 9L12 18L21 27L23.115 24.885Z"
                fill="#292929"
              />
            </svg>
          </div>
        </button>

        <template v-for="page in getPageNumbers">
          <button
            v-if="page !== -1"
            :key="`page-${page}`"
            @click="goToPage(page)"
            :class="[
              'px-2 sm:px-3 transition hover:cursor-pointer rounded-sm text-lg sm:text-xl md:text-2xl',
              page === currentPage
                ? 'text-white bg-[#E9322B]'
                : 'text-[#C1C1C1] hover:bg-[#F6F9FF]',
            ]"
          >
            {{ page }}
          </button>
          <span
            v-else
            :key="`ellipsis-${page}`"
            class="px-1 sm:px-2 text-sm sm:text-base text-[#808080]"
          >
            ...
          </span>
        </template>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="[
            'px-2 sm:px-3 transition rounded-sm',
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-[#F6F9FF] hover:cursor-pointer',
          ]"
        >
          <div class="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9">
            <svg
              class="w-full h-full"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.885 24.885L19.755 18L12.885 11.115L15 9L24 18L15 27L12.885 24.885Z"
                fill="#292929"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { normalizeBlog, normalizeCategory } from '~/utils/blogHelpers'

definePageMeta({
  layout: "default",
  alias: ["/blogs"],
});

const blogs = ref<any[]>([]);
const categories = ref<any[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(8);
const searchQuery = ref("");
const selectedCategory = ref("");
const isLoading = ref(false);
const totalItems = ref(0);
const isCategoryDropdownOpen = ref(false);
const categoryDropdownRef = ref<HTMLElement | null>(null);

const selectedCategoryName = computed(() => {
  if (!selectedCategory.value) {
    return "Semua Kategori";
  }
  const category = categories.value.find(
    (cat) => String(cat.id) === String(selectedCategory.value)
  );
  return category?.name || "Semua Kategori";
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value));
});

const getPageNumbers = computed(() => {
  const pages: (number | -1)[] = [];
  const total = totalPages.value;
  const current = currentPage.value;
  const maxVisible = 5;

  if (total <= maxVisible) {
    // Show all pages if total is less than maxVisible
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (current <= 3) {
      // Near the start
      for (let i = 2; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(total);
    } else if (current >= total - 2) {
      // Near the end
      pages.push(-1); // Ellipsis
      for (let i = total - 3; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(-1); // Ellipsis
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push(-1); // Ellipsis
      pages.push(total);
    }
  }

  return pages;
});

// Mock blog data matching the image
const mockBlogs = [
  {
    id: 1,
    title: "5 Rekomendasi Jenis Lemari Kantor Terbaik Dan Tips Memili...",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "5-rekomendasi-jenis-lemari-kantor-terbaik",
  },
  {
    id: 2,
    title: "Apa Saja Motif Keramik Dinding Paling Populer untuk Kamar Ma...",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "motif-keramik-dinding-populer-kamar-mandi",
  },
  {
    id: 3,
    title: "9 Cara Membuat Kamar Mandi Selalu Nyaman, Aman, Bersih, d...",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "cara-membuat-kamar-mandi-nyaman",
  },
  {
    id: 4,
    title: "7 Tips Jitu dan Praktis Mengatasi Kamar Mandi Licin",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-mengatasi-kamar-mandi-licin",
  },
  {
    id: 5,
    title: "7 Tips Jitu dan Praktis Mengatasi Kamar Mandi Licin",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-mengatasi-kamar-mandi-licin-2",
  },
  {
    id: 6,
    title: "7 Tips Jitu dan Praktis Mengatasi Kamar Mandi Licin",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-mengatasi-kamar-mandi-licin-3",
  },
  {
    id: 7,
    title: "7 Tips Jitu dan Praktis Mengatasi Kamar Mandi Licin",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-mengatasi-kamar-mandi-licin-4",
  },
  {
    id: 8,
    title: "7 Tips Jitu dan Praktis Mengatasi Kamar Mandi Licin",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-mengatasi-kamar-mandi-licin-5",
  },
  // Additional blogs for pagination (pages 2-5)
  {
    id: 9,
    title: "Panduan Lengkap Memilih Furniture untuk Ruang Tamu Modern",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-24",
    slug: "panduan-memilih-furniture-ruang-tamu",
  },
  {
    id: 10,
    title: "Tips Merawat Lemari Kayu Agar Tetap Awet dan Berkilau",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-23",
    slug: "tips-merawat-lemari-kayu",
  },
  {
    id: 11,
    title: "Inspirasi Desain Dapur Minimalis dengan Storage Maksimal",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-22",
    slug: "desain-dapur-minimalis-storage",
  },
  {
    id: 12,
    title: "Cara Memilih Kasur yang Tepat untuk Kualitas Tidur Optimal",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-21",
    slug: "cara-memilih-kasur-tepat",
  },
  {
    id: 13,
    title: "Rekomendasi Warna Cat Dinding untuk Kamar Tidur yang Tenang",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-20",
    slug: "warna-cat-dinding-kamar-tidur",
  },
  {
    id: 14,
    title: "Ide Dekorasi Ruang Keluarga dengan Budget Terbatas",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-19",
    slug: "ide-dekorasi-ruang-keluarga-budget",
  },
  {
    id: 15,
    title: "Panduan Memilih Sofa yang Nyaman untuk Keluarga",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-18",
    slug: "panduan-memilih-sofa-nyaman",
  },
  {
    id: 16,
    title: "Tips Organisasi Storage untuk Kamar Tidur yang Rapi",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-17",
    slug: "tips-organisasi-storage-kamar-tidur",
  },
  {
    id: 17,
    title: "Cara Membersihkan dan Merawat Meja Makan Kayu",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-16",
    slug: "cara-merawat-meja-makan-kayu",
  },
  {
    id: 18,
    title: "Desain Kamar Mandi Kecil yang Fungsional dan Estetik",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-15",
    slug: "desain-kamar-mandi-kecil-fungsional",
  },
  {
    id: 19,
    title: "Panduan Memilih Lampu Penerangan untuk Setiap Ruangan",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-14",
    slug: "panduan-memilih-lampu-penerangan",
  },
  {
    id: 20,
    title: "Tips Menata Ruang Kerja di Rumah yang Produktif",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-13",
    slug: "tips-menata-ruang-kerja-rumah",
  },
];

const fetchBlogs = async () => {
  try {
    isLoading.value = true;

    const { filterBlogs } = useBlogApi();
    const { data: response, error: apiError } = await filterBlogs({
      page: currentPage.value,
      per_page: itemsPerPage.value,
      ...(searchQuery.value && { search: searchQuery.value }),
      ...(selectedCategory.value && { category: selectedCategory.value }),
      status: 1, // Only published blogs
      sort_by: 'created_at',
      order: 'desc',
    });

    if (apiError || !response?.success) {
      console.error(
        "Failed to fetch blogs:",
        apiError?.message || response?.message
      );
      blogs.value = [];
      totalItems.value = 0;
      return;
    }

    // Normalize blog data with default values
    let blogsData: any[] = [];

    if (Array.isArray(response.data)) {
      blogsData = response.data;
    } else if (response.data?.blogs) {
      blogsData = response.data.blogs;
    }

    // Apply default values to each blog
    blogs.value = blogsData.map((blog) => normalizeBlog(blog));
    
    // Get pagination info
    if (response.data?.pagination) {
      totalItems.value = response.data.pagination.total || blogsData.length;
    } else {
      totalItems.value = blogsData.length;
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    blogs.value = [];
    totalItems.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const { getActiveCategories } = useBlogApi();
    const { data: response, error: apiError } = await getActiveCategories();

    if (apiError || !response?.success) {
      console.error(
        "Failed to fetch categories:",
        apiError?.message || response?.message
      );
      categories.value = [];
      return;
    }

    // Normalize category data with default values
    let categoriesData: any[] = [];

    if (Array.isArray(response.data)) {
      categoriesData = response.data;
    } else if (response.data?.categories) {
      categoriesData = response.data.categories;
    }

    // Apply default values to each category
    // Filter only active categories (status = true or 1) as additional safety
    categories.value = categoriesData
      .filter((category) => category.status === true || category.status === 1)
      .map((category) => normalizeCategory(category));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    categories.value = [];
  }
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchBlogs();
};

const selectCategory = (categoryId: string | number) => {
  selectedCategory.value = categoryId === "" ? "" : String(categoryId);
  currentPage.value = 1;
  isCategoryDropdownOpen.value = false;
  fetchBlogs();
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchBlogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchBlogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
  fetchBlogs();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const closeDropdownOnClickOutside = (event: MouseEvent) => {
  if (
    categoryDropdownRef.value &&
    !categoryDropdownRef.value.contains(event.target as Node)
  ) {
    isCategoryDropdownOpen.value = false;
  }
};

onMounted(() => {
  fetchBlogs();
  fetchCategories();
  document.addEventListener("click", closeDropdownOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownOnClickOutside);
});

// SEO Meta Tags
useHead({
  title: 'Aktivitas & Update - Karsindo',
});

useSeoMeta({
  title: 'Aktivitas & Update - Karsindo',
  description: 'Temukan artikel, tips, dan update terbaru seputar furniture dan dekorasi rumah dari Karsindo',
  ogTitle: 'Aktivitas & Update - Karsindo',
  ogDescription: 'Temukan artikel, tips, dan update terbaru seputar furniture dan dekorasi rumah dari Karsindo',
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: 'Aktivitas & Update - Karsindo',
  twitterDescription: 'Temukan artikel, tips, dan update terbaru seputar furniture dan dekorasi rumah dari Karsindo',
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
