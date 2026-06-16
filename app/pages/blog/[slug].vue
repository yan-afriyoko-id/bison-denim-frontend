<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto py-6 sm:py-8 md:py-10 flex-1">
      <!-- Back Link -->
      <NuxtLink
        to="/blog"
        class="px-4 sm:px-6 md:px-10 lg:px-51 flex items-center gap-2 text-[#7B7B7B] mb-8 sm:mb-12 md:mb-15 hover:text-[#E9322B] transition hover:cursor-pointer"
      >
        <div class="w-5 h-5 sm:w-6 sm:h-6">
          <svg
            class="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.99997 10.0005L3.64597 10.3545L3.29297 10.0005L3.64597 9.64648L3.99997 10.0005ZM20.5 18.0005C20.5 18.1331 20.4473 18.2603 20.3535 18.354C20.2598 18.4478 20.1326 18.5005 20 18.5005C19.8674 18.5005 19.7402 18.4478 19.6464 18.354C19.5526 18.2603 19.5 18.1331 19.5 18.0005H20.5ZM8.64597 15.3545L3.64597 10.3545L4.35397 9.64648L9.35397 14.6465L8.64597 15.3545ZM3.64597 9.64648L8.64597 4.64648L9.35397 5.35448L4.35397 10.3545L3.64597 9.64648ZM3.99997 9.50048H14V10.5005H3.99997V9.50048ZM20.5 16.0005V18.0005H19.5V16.0005H20.5ZM14 9.50048C15.7239 9.50048 17.3772 10.1853 18.5962 11.4043C19.8151 12.6233 20.5 14.2766 20.5 16.0005H19.5C19.5 14.5418 18.9205 13.1428 17.8891 12.1114C16.8576 11.0799 15.4587 10.5005 14 10.5005V9.50048Z"
              fill="#1A1919"
            />
          </svg>
        </div>

        <span class="font-medium text-sm sm:text-base text-[#1A1919]">Kembali</span>
      </NuxtLink>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-10 sm:py-16 md:py-20">
        <p class="text-sm sm:text-base text-[#7B7B7B]">Memuat artikel...</p>
      </div>

      <!-- Error / Not Found -->
      <div v-else-if="!blog" class="text-center py-10 sm:py-16 md:py-20">
        <h4 class="text-base sm:text-lg text-[#E9322B] mb-3">Artikel tidak ditemukan</h4>
        <NuxtLink
          to="/blog"
          class="text-sm sm:text-base text-[#E9322B] hover:underline hover:cursor-pointer"
        >
          Kembali ke Blog
        </NuxtLink>
      </div>

      <!-- Blog Detail -->
      <template v-else>
        <!-- Blog Header -->
        <div class="mb-6 sm:mb-7.5 px-4 sm:px-6 md:px-10 lg:px-51">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[62px] font-medium text-[#1A1919] mb-8 sm:mb-12 md:mb-15 tracking-[-0.04em]"
          >
            {{ blog.title || "Untitled Blog" }}
          </h1>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 w-full justify-between">
            <p class="text-sm sm:text-base md:text-lg text-[#808080]">
              {{ formatDate(blog.created_at) }}
            </p>

            <!-- Tags -->
            <div v-if="blogTags.length > 0" class="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <span
                v-for="tag in blogTags"
                :key="tag"
                class="px-2 sm:px-3 py-1 text-xs sm:text-sm md:text-base text-[#808080] rounded-sm border border-[#C1C1C1]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="mb-6 sm:mb-8 md:mb-10 px-2 sm:px-6 md:px-10 lg:px-14">
          <div class="w-full overflow-hidden bg-[#F8F8F8] rounded-lg sm:rounded-[14px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <NuxtImg
              v-if="blog.cover_url"
              :src="blog.cover_url"
              :alt="blog.title || 'Blog Image'"
              width="1200"
              height="600"
              class="w-full h-full object-cover"
              fit="cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-[#F8F8F8]"
            >
              <i class="bi bi-image" style="color: #6c757d; font-size: 64px;"></i>
            </div>
          </div>
        </div>

        <!-- Blog Content -->
        <article class="max-w-none mb-10 sm:mb-12 md:mb-16 px-4 sm:px-6 md:px-10 lg:px-51 text-[#1A1919]">
          <div
            v-if="blog.long_desc"
            class="text-base sm:text-lg leading-relaxed space-y-6 sm:space-y-8 md:space-y-10 prose prose-lg max-w-none blog-content"
            v-html="blog.long_desc"
          ></div>
          <div
            v-else-if="blog.short_desc"
            class="text-base sm:text-lg leading-relaxed space-y-6 sm:space-y-8 md:space-y-10"
          >
            <p class="text-sm sm:text-base md:text-lg text-[#696969] leading-[1.8]">
              {{ blog.short_desc }}
            </p>
          </div>
          <div
            v-else
            class="text-base sm:text-lg leading-relaxed space-y-6 sm:space-y-8 md:space-y-10"
          >
            <p class="text-sm sm:text-base md:text-lg text-[#696969] leading-[1.8]">
              Konten blog belum tersedia.
            </p>
          </div>
        </article>

        <!-- Artikel Serupa Section -->
        <div v-if="relatedBlogs.length > 0" class="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-10 lg:px-51">
          <div class="flex items-center justify-between mb-6 sm:mb-8 relative">
            <h2 class="text-2xl sm:text-3xl md:text-[38px] font-medium text-[#1A1919]">
              Artikel Serupa
            </h2>
            <div class="flex items-center gap-1.5 sm:gap-2 relative">
              <button
                @click="scrollRelatedArticles('left')"
                class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F] transition"
                aria-label="Previous articles"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 md:w-7.5 md:h-7.5">
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2625 20.7375L13.5375 15L19.2625 9.2625L17.5 7.5L10 15L17.5 22.5L19.2625 20.7375Z"
                      fill="#292929"
                    />
                  </svg>
                </div>
              </button>
              <button
                @click="scrollRelatedArticles('right')"
                class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white rounded-full flex justify-center items-center hover:cursor-pointer shadow-[0px_4px_10px_0px_#0000000F] transition"
                aria-label="Next articles"
              >
                <div class="w-4 h-4 sm:w-5 sm:h-5 md:w-7.5 md:h-7.5">
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7375 20.7375L16.4625 15L10.7375 9.2625L12.5 7.5L20 15L12.5 22.5L10.7375 20.7375Z"
                      fill="#292929"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Related Articles Carousel -->
          <div class="relative">
            <div
              ref="relatedArticlesContainer"
              class="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto scroll-smooth pb-2"
              style="scrollbar-width: none; -ms-overflow-style: none"
            >
              <div
                v-for="relatedBlog in relatedBlogs"
                :key="relatedBlog.id"
                class="shrink-0 w-[240px] sm:w-[250px] md:w-[262px]"
              >
                <BlogCard :blog="relatedBlog" size="small" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { normalizeBlog, extractBlogTags, formatBlogDate } from '~/utils/blogHelpers'

definePageMeta({
  layout: "default",
  alias: ["/blogs/:slug"],
});

const route = useRoute();

const blog = ref<any>(null);
const allBlogs = ref<any[]>([]);
const isLoading = ref(false);
const relatedArticlesContainer = ref<HTMLElement | null>(null);

// Extract tags from blog data
const blogTags = computed(() => {
  if (!blog.value) return []
  return extractBlogTags(blog.value)
});

// Mock related blogs data - More articles for carousel testing
const mockRelatedBlogs = [
  {
    id: 1,
    title: "6 Tips Belanja Ornamen Natal dan Jenis-jenisny...",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-belanja-ornamen-natal",
  },
  {
    id: 2,
    title: "Panduan Lengkap Memilih Furniture untuk Ruang Tamu Modern",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "panduan-memilih-furniture-ruang-tamu",
  },
  {
    id: 3,
    title: "Tips Merawat Lemari Kayu Agar Tetap Awet dan Berkilau",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "tips-merawat-lemari-kayu",
  },
  {
    id: 4,
    title: "Inspirasi Desain Dapur Minimalis dengan Storage Maksimal",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-25",
    slug: "desain-dapur-minimalis-storage",
  },
  {
    id: 5,
    title: "Cara Memilih Kasur yang Tepat untuk Kualitas Tidur Optimal",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-24",
    slug: "cara-memilih-kasur-tepat",
  },
  {
    id: 6,
    title: "Rekomendasi Warna Cat Dinding untuk Kamar Tidur yang Tenang",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-23",
    slug: "warna-cat-dinding-kamar-tidur",
  },
  {
    id: 7,
    title: "Ide Dekorasi Ruang Keluarga dengan Budget Terbatas",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-22",
    slug: "ide-dekorasi-ruang-keluarga-budget",
  },
  {
    id: 8,
    title: "Panduan Memilih Sofa yang Nyaman untuk Keluarga",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-21",
    slug: "panduan-memilih-sofa-nyaman",
  },
  {
    id: 9,
    title: "Tips Organisasi Storage untuk Kamar Tidur yang Rapi",
    cover_url:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&h=300&fit=crop",
    created_at: "2025-11-20",
    slug: "tips-organisasi-storage-kamar-tidur",
  },
  {
    id: 10,
    title: "Cara Membersihkan dan Merawat Meja Makan Kayu",
    cover_url:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    created_at: "2025-11-19",
    slug: "cara-merawat-meja-makan-kayu",
  },
  {
    id: 11,
    title: "Desain Kamar Mandi Kecil yang Fungsional dan Estetik",
    cover_url:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop",
    created_at: "2025-11-18",
    slug: "desain-kamar-mandi-kecil-fungsional",
  },
  {
    id: 12,
    title: "Panduan Memilih Lampu Penerangan untuk Setiap Ruangan",
    cover_url:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    created_at: "2025-11-17",
    slug: "panduan-memilih-lampu-penerangan",
  },
];

const fetchBlog = async (slug: string) => {
  if (!slug) return;

  try {
    isLoading.value = true;
    blog.value = null;

    const { getBlogBySlug } = useBlogApi();
    const { data: response, error: apiError } = await getBlogBySlug(slug);

    if (apiError || !response?.success) {
      console.error("Failed to fetch blog:", apiError?.message || response?.message);
      blog.value = null;
      return;
    }

    // Normalize blog data with default values
    const blogData = response.data?.blog || response.data || null;
    blog.value = blogData ? normalizeBlog(blogData) : null;
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    blog.value = null;
  } finally {
    isLoading.value = false;
  }
};

const fetchAllBlogs = async () => {
  try {
    const { filterBlogs } = useBlogApi();
    const { data: response, error: apiError } = await filterBlogs({
      page: 1,
      per_page: 12,
      status: 1, // Only published blogs
      sort_by: 'created_at',
      order: 'desc',
    });

    if (apiError || !response?.success) {
      console.error("Failed to fetch blogs:", apiError?.message || response?.message);
      allBlogs.value = [];
      return;
    }

    // Normalize blog data with default values
    let blogsData: any[] = [];
    if (Array.isArray(response.data)) {
      blogsData = response.data;
    } else if (response.data?.blogs) {
      blogsData = response.data.blogs;
    }

    console.log(blogsData);

    // Apply default values to each blog
    allBlogs.value = blogsData.map((blog) => normalizeBlog(blog));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    allBlogs.value = [];
  }
};

const relatedBlogs = computed(() => {
  if (!blog.value) {
    return [];
  }

  if (allBlogs.value.length === 0) {
    // Don't use mock data, return empty array
    return [];
  }

  // Filter out current blog and return related blogs
  const filtered = allBlogs.value
    .filter((b) => b.id !== blog.value?.id)
    .slice(0, 12); // Limit to 12 related blogs

  return filtered;
});

const formatDate = (date: string | null | undefined) => {
  return formatBlogDate(date);
};

const scrollRelatedArticles = (direction: "left" | "right") => {
  if (!relatedArticlesContainer.value) return;

  const scrollAmount = 400;
  const currentScroll = relatedArticlesContainer.value.scrollLeft;

  if (direction === "left") {
    relatedArticlesContainer.value.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: "smooth",
    });
  } else {
    relatedArticlesContainer.value.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: "smooth",
    });
  }
};

// SEO Meta Tags
const siteUrl = computed(() => {
  if (process.client && typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR
  return 'https://karsindo.vercel.app';
});

const pageTitle = computed(() => {
  if (!blog.value) return 'Blog - Karsindo';
  return blog.value.meta_title || blog.value.title || 'Blog - Karsindo';
});

const pageDescription = computed(() => {
  if (!blog.value) return '';
  return blog.value.meta_description || blog.value.short_desc || '';
});

const pageImage = computed(() => {
  if (!blog.value?.cover_url) return '';
  // Ensure absolute URL for og:image
  const imageUrl = blog.value.cover_url;
  const baseUrl = siteUrl.value;
  return imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
});

const pageUrl = computed(() => {
  if (!blog.value) return '';
  return `${siteUrl.value}/blog/${blog.value.slug}`;
});

const publishedTime = computed(() => {
  if (!blog.value?.created_at) return '';
  return new Date(blog.value.created_at).toISOString();
});

const modifiedTime = computed(() => {
  if (!blog.value?.updated_at) return '';
  return new Date(blog.value.updated_at).toISOString();
});

const articleSection = computed(() => {
  if (!blog.value?.category?.name) return '';
  return blog.value.category.name;
});

const articleTags = computed(() => {
  return blogTags.value;
});

useHead({
  title: pageTitle,
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  meta: [
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
});

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage,
  ogUrl: pageUrl,
  ogSiteName: 'Karsindo',
  ogType: 'article',
  articlePublishedTime: publishedTime,
  articleModifiedTime: modifiedTime,
  articleSection: articleSection,
  articleTag: articleTags,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: pageImage,
});

// Watch slug changes
watch(
  () => route.params.slug,
  (slug) => slug && fetchBlog(slug as string),
  { immediate: true }
);

onMounted(() => {
  fetchAllBlogs();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Blog Content Styling - Match Tiptap Editor */
.blog-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.blog-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.blog-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.blog-content :deep(p) {
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

/* Text alignment styles */
.blog-content :deep([style*="text-align: left"]) {
  text-align: left;
}

.blog-content :deep([style*="text-align: center"]) {
  text-align: center;
}

.blog-content :deep([style*="text-align: right"]) {
  text-align: right;
}

.blog-content :deep([style*="text-align: justify"]) {
  text-align: justify;
  text-align-last: left;
}

/* Responsive heading sizes */
@media (min-width: 640px) {
  .blog-content :deep(h1) {
    font-size: 2.5rem;
  }
  
  .blog-content :deep(h2) {
    font-size: 1.75rem;
  }
  
  .blog-content :deep(h3) {
    font-size: 1.5rem;
  }
}

@media (min-width: 768px) {
  .blog-content :deep(h1) {
    font-size: 3rem;
  }
  
  .blog-content :deep(h2) {
    font-size: 2rem;
  }
  
  .blog-content :deep(h3) {
    font-size: 1.75rem;
  }
}
</style>
