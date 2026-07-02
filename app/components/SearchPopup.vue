<template>
  <div
    :class="[
      'fixed top-0 left-0 w-full h-full z-9999 transition-all duration-300 ease-out',
      showSearch ? 'visible opacity-100' : 'invisible opacity-0',
    ]"
  >
    <div class="absolute top-0 left-0 w-full h-full bg-black/70" @click="closeSearch"></div>
    <div
      :class="[
        'fixed right-0 top-0 h-full w-full max-w-[85%] md:max-w-[50%] lg:max-w-[40%] bg-white z-[1] flex flex-col transition-transform duration-300',
        showSearch ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="flex justify-between items-center h-16 px-5 bg-white border-b border-[#E6E9F0] flex-shrink-0">
        <h4 class="text-base font-semibold text-[#1A1919]">SEARCH</h4>
        <button class="relative cursor-pointer h-10 w-10 flex-shrink-0 bg-transparent border-none group" @click="closeSearch">
          <div class="absolute top-[19px] left-2 w-6 h-[3px] bg-[#222] origin-center transition-all duration-300 group-hover:rotate-0 -rotate-45"></div>
          <div class="absolute top-[19px] left-2 w-6 h-[3px] bg-[#222] origin-center transition-all duration-300 group-hover:rotate-0 rotate-45"></div>
        </button>
      </div>

      <div class="px-5 py-4 flex-shrink-0 border-b border-[#E6E9F0]">
        <div class="relative">
          <input
            ref="searchInput"
            v-model="query"
            type="text"
            placeholder="Search products..."
            @input="debouncedSearch"
            class="w-full pl-4 pr-10 py-2.5 text-sm border border-gray-300 rounded outline-none focus:border-black transition-colors"
          />
          <button @click="handleSearch" class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-black">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="px-5 py-3 space-y-3 flex-shrink-0 border-b border-[#E6E9F0]">
        <button @click="toggleSection('kategori')" class="flex items-center justify-between w-full text-left">
          <h5 class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Kategori</h5>
          <svg :class="expandedSections.kategori ? 'rotate-180' : ''" class="w-3 h-3 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="expandedSections.kategori" class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="toggleCategory(cat.id)"
            :class="selectedCategories.includes(cat.id) ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'"
            class="px-3 py-1.5 text-xs rounded-full transition cursor-pointer"
          >
            {{ cat.name }}
          </button>
          <p v-if="!categories.length" class="text-xs text-gray-400">Loading...</p>
        </div>

        <button @click="toggleSection('brand')" class="flex items-center justify-between w-full text-left">
          <h5 class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Brand</h5>
          <svg :class="expandedSections.brand ? 'rotate-180' : ''" class="w-3 h-3 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="expandedSections.brand" class="flex flex-wrap gap-2">
          <button
            v-for="brand in brands"
            :key="brand.slug"
            @click="toggleBrand(brand.slug)"
            :class="selectedBrands.includes(brand.slug) ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'"
            class="px-3 py-1.5 text-xs rounded-full transition cursor-pointer"
          >
            {{ brand.name }}
          </button>
          <p v-if="!brands.length" class="text-xs text-gray-400">Loading...</p>
        </div>

        <button @click="toggleSection('harga')" class="flex items-center justify-between w-full text-left">
          <h5 class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Harga (Rp)</h5>
          <svg :class="expandedSections.harga ? 'rotate-180' : ''" class="w-3 h-3 text-gray-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div v-if="expandedSections.harga" class="flex items-center gap-2">
          <input v-model.number="priceMin" type="number" placeholder="Min" class="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none" @input="debouncedSearch" />
          <span class="text-gray-400 text-xs">-</span>
          <input v-model.number="priceMax" type="number" placeholder="Max" class="w-full px-3 py-1.5 text-xs border border-gray-300 rounded outline-none" @input="debouncedSearch" />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-5 py-4">
        <div v-if="loading && !results.length" class="text-center py-8">
          <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-black mx-auto"></div>
        </div>

        <div v-else-if="results.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="product in results"
              :key="product.id"
              class="border border-[#E6E9F0] rounded cursor-pointer hover:shadow transition overflow-hidden"
              @click="goToProduct(product)"
            >
              <div class="aspect-[3/2] overflow-hidden bg-gray-50">
                <img
                  :src="product.featured_image?.path || '/placeholder-product.png'"
                  :alt="product.name"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div class="p-3">
                <p class="text-xs font-medium text-black truncate mb-1">{{ product.name }}</p>
                <p class="text-xs text-gray-500 font-medium">{{ formatPrice(product.final_price || product.base_price || 0) }}</p>
              </div>
            </div>
          </div>
          <button
            v-if="totalCount > results.length"
            @click="handleSearch"
            class="w-full mt-4 py-2 text-sm text-gray-500 hover:text-black transition cursor-pointer"
          >
            View all {{ totalCount }} products
          </button>
        </div>

        <div v-else-if="query" class="text-center py-8 text-sm text-gray-400">
          No products found for "{{ query }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue"
import { useProductApi } from "~/composables/useProductApi"
import { useProductRelationsApi } from "~/composables/useProductRelationsApi"
import { useBrandApi } from "~/composables/useBrandApi"

const router = useRouter()
const { getProducts } = useProductApi()
const { getTaxoListsByType } = useProductRelationsApi()
const { getActiveBrands } = useBrandApi()

const showSearch = useState("search:showPopup", () => false)
const query = ref("")
const results = ref<any[]>([])
const loading = ref(false)
const totalCount = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const categories = ref<{ id: number; name: string }[]>([])
const brands = ref<{ slug: string; name: string }[]>([])
const selectedCategories = ref<number[]>([])
const selectedBrands = ref<string[]>([])
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const expandedSections = ref<Record<string, boolean>>({ kategori: true, brand: false, harga: false })

const closeSearch = () => {
  showSearch.value = false
}

const goToProduct = (product: any) => {
  closeSearch()
  router.push(`/products/${product.slug || product.id}`)
}

const handleSearch = () => {
  const params: Record<string, any> = {}
  const q = query.value.trim()
  if (q) params.search = q
  if (selectedCategories.value.length) params.category_ids = selectedCategories.value.join(",")
  if (selectedBrands.value.length) params.brand = selectedBrands.value.join(",")
  if (priceMin.value) params.min_price = priceMin.value
  if (priceMax.value) params.max_price = priceMax.value
  closeSearch()
  router.push({ path: "/products", query: params })
}

const toggleSection = (key: string) => {
  expandedSections.value[key] = !expandedSections.value[key]
}

const toggleCategory = (id: number) => {
  const idx = selectedCategories.value.indexOf(id)
  if (idx >= 0) selectedCategories.value.splice(idx, 1)
  else selectedCategories.value.push(id)
  debouncedSearch()
}

const toggleBrand = (slug: string) => {
  const idx = selectedBrands.value.indexOf(slug)
  if (idx >= 0) selectedBrands.value.splice(idx, 1)
  else selectedBrands.value.push(slug)
  debouncedSearch()
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const q = query.value.trim()
    const res: any = await getProducts(
      1, 8, undefined, "desc",
      selectedCategories.value.length ? selectedCategories.value : undefined,
      selectedBrands.value.length ? selectedBrands.value : undefined,
      q || undefined,
      undefined,
      {
        minPrice: priceMin.value || undefined,
        maxPrice: priceMax.value || undefined,
      },
    )
    results.value = res?.data?.data?.products || []
    totalCount.value = res?.data?.data?.pagination?.total || results.value.length
  } catch {
    results.value = []
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fetchProducts, 300)
}

const loadDefaultProducts = async () => {
  loading.value = true
  try {
    const res: any = await getProducts(1, 8)
    results.value = res?.data?.data?.products || []
    totalCount.value = res?.data?.data?.pagination?.total || results.value.length
  } catch {
    results.value = []
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('IDR', 'IDR').trim() + ',00 IDR'
}

watch(showSearch, (val: boolean) => {
  if (val) {
    query.value = ""
    selectedCategories.value = []
    selectedBrands.value = []
    priceMin.value = null
    priceMax.value = null
    loadDefaultProducts()
    nextTick(() => searchInput.value?.focus())
  }
})

onMounted(async () => {
  try {
    const [catRes, brandRes] = await Promise.allSettled([getTaxoListsByType(2), getActiveBrands()])
    if (catRes.status === "fulfilled") {
      const data = catRes.value?.data?.data?.taxo_lists || []
      categories.value = data.filter((c: any) => c.taxonomy_status === "ACTIVE").map((c: any) => ({ id: c.id, name: c.taxonomy_name }))
    }
    if (brandRes.status === "fulfilled") {
      const data = brandRes.value?.data?.data?.brands || []
      brands.value = data.filter((b: any) => b.status !== "INACTIVE").map((b: any) => ({ slug: b.slug, name: b.name }))
    }
  } catch {}
})
</script>
