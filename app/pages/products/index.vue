<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-6 sm:py-8 md:py-10 flex-1 w-full"
      >
        <!-- Mobile Filter Button -->
        <button
          @click="showMobileFilter = true"
          class="lg:hidden flex items-center gap-2 mb-4 px-4 py-2.5 border border-[#E6E9F0] rounded-lg bg-white hover:bg-[#F8F8F8] transition cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12V4M19 20V17M5 20V16M19 13V4M12 7V4M12 20V11"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M5 16C6.10457 16 7 15.1046 7 14C7 12.8954 6.10457 12 5 12C3.89543 12 3 12.8954 3 14C3 15.1046 3.89543 16 5 16Z"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
              stroke="black"
              stroke-linecap="round"
            />
            <path
              d="M19 17C20.1046 17 21 16.1046 21 15C21 13.8954 20.1046 13 19 13C17.8954 13 17 13.8954 17 15C17 16.1046 17.8954 17 19 17Z"
              stroke="black"
              stroke-linecap="round"
            />
          </svg>
          <span class="font-medium text-[var(--color-brand-black-soft)]">Filter</span>
        </button>

        <div class="flex gap-4 lg:gap-8">
          <!-- Filter Sidebar (Desktop) -->
          <aside class="w-87.5 shrink-0 hidden lg:block">
            <div class="bg-white border-r border-[#E6E9F0] p-5 sticky top-24">
              <!-- Filter Header -->
              <div class="flex items-center justify-between mb-6">
                <h3
                  class="text-2xl font-semibold text-[var(--color-brand-black-soft)] flex items-center gap-[7px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12V4M19 20V17M5 20V16M19 13V4M12 7V4M12 20V11"
                      stroke="black"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 16C6.10457 16 7 15.1046 7 14C7 12.8954 6.10457 12 5 12C3.89543 12 3 12.8954 3 14C3 15.1046 3.89543 16 5 16Z"
                      stroke="black"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                      stroke="black"
                      stroke-linecap="round"
                    />
                    <path
                      d="M19 17C20.1046 17 21 16.1046 21 15C21 13.8954 20.1046 13 19 13C17.8954 13 17 13.8954 17 15C17 16.1046 17.8954 17 19 17Z"
                      stroke="black"
                      stroke-linecap="round"
                    />
                  </svg>
                  Filter
                </h3>
                <button
                  @click="resetFilters"
                  class="text-lg font-medium text-[var(--color-brand-black-muted)] hover:text-[var(--color-brand-black-soft)] transition bg-[#F8F8F8] px-2.5 py-1.5 rounded-lg hover:cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>

              <!-- Kategori -->
              <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('kategori')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Kategori</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.kategori ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.kategori"
                  class="space-y-1 transition-all"
                >
                  <div v-if="loadingCategories" class="text-center py-4">
                    <div
                      class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#E9322B]"
                    ></div>
                  </div>
                  <div
                    v-else-if="categories.length === 0"
                    class="text-sm text-[#808080] py-2"
                  >
                    Tidak ada kategori
                  </div>
                  <template v-else>
                    <template v-for="cat in parentCategories" :key="cat.id">
                      <div>
                        <label
                          class="flex items-center gap-2 cursor-pointer py-1"
                        >
                          <input
                            type="checkbox"
                            :value="cat.id"
                            v-model="selectedCategories"
                            class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer shrink-0"
                          />
                          <span
                            :class="{
                              'text-[#E9322B]': selectedCategories.includes(
                                cat.id,
                              ),
                              'text-[#808080]': !selectedCategories.includes(
                                cat.id,
                              ),
                            }"
                            >{{ cat.name }}</span
                          >
                        </label>
                        <div
                          v-if="selectedCategories.includes(cat.id) && getChildren(cat.id).length"
                          class="ml-6 space-y-0.5"
                        >
                          <label
                            v-for="child in getChildren(cat.id)"
                            :key="child.id"
                            class="flex items-center gap-2 cursor-pointer py-0.5"
                          >
                            <input
                              type="checkbox"
                              :value="child.id"
                              v-model="selectedCategories"
                              class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer shrink-0"
                            />
                            <span
                              :class="{
                                'text-[#E9322B]': selectedCategories.includes(
                                  child.id,
                                ),
                                'text-[#808080]': !selectedCategories.includes(
                                  child.id,
                                ),
                              }"
                              >{{ child.name }}</span
                            >
                          </label>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>

              <!-- Brand -->
              <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('brand')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Brand</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.brand ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.brand"
                  class="space-y-1 transition-all"
                >
                  <label
                    v-for="brand in brands"
                    :key="brand.id"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="brand.slug"
                      v-model="selectedBrands"
                      class="w-4.5 h-4.5 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                    />
                    <span
                      :class="{
                        'text-[#E9322B]': selectedBrands.includes(brand.slug),
                        'text-[#808080]': !selectedBrands.includes(brand.slug),
                      }"
                      >{{ brand.name }}</span
                    >
                  </label>
                </div>
              </div>

              <!-- Store -->
              <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('store')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Store</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.store ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.store"
                  class="space-y-1 transition-all"
                >
                  <div v-if="loadingStores" class="text-center py-4">
                    <div
                      class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#E9322B]"
                    ></div>
                  </div>
                  <div
                    v-else-if="stores.length === 0"
                    class="text-sm text-[#808080] py-2"
                  >
                    Tidak ada store
                  </div>
                  <template v-else>
                    <label
                      v-for="store in stores"
                      :key="store.id"
                      class="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        :checked="selectedStoreId === store.id"
                        @change="toggleStoreFilter(store.id, store.name)"
                        class="w-4.5 h-4.5 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                      />
                      <span
                        :class="{
                          'text-[#E9322B]': selectedStoreId === store.id,
                          'text-[#808080]': selectedStoreId !== store.id,
                        }"
                      >
                        {{ store.name }}
                      </span>
                    </label>
                  </template>
                </div>
              </div>

              <!-- Promo -->
              <!-- <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('promo')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Promo</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.promo ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.promo"
                  class="space-y-1 transition-all"
                >
                  <label
                    v-for="promo in promos"
                    :key="promo.id"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="promo.id"
                      v-model="selectedPromos"
                      class="w-4.5 h-4.5 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                    />
                    <span
                      :class="{
                        'text-[#E9322B]': selectedPromos.includes(promo.id),
                        'text-[#808080]': !selectedPromos.includes(promo.id),
                      }"
                      >{{ promo.name }}</span
                    >
                  </label>
                </div>
              </div> -->

              <!-- Rating -->
              <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('rating')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Rating</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.rating ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.rating"
                  class="space-y-1 transition-all"
                >
                  <label
                    v-for="rating in ratings"
                    :key="rating.value"
                    class="flex items-center gap-2.5 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :value="rating.value"
                      v-model="selectedRatings"
                      class="w-4.5 h-4.5 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                    />
                    <div class="flex items-center">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.126 14.8748L5.27704 8.73437L1.41663 6.55192L6.51663 6.10921L8.49996 1.4165L10.4833 6.10921L15.5833 6.55192L11.7229 9.8988L12.8739 14.8748L8.49996 12.2363L4.126 14.8748Z"
                          :fill="i <= rating.value ? '#FFCC00' : '#FFFFFF'"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Harga -->
              <div class="mb-2.5 pb-5 border-b border-[#E6E9F0]">
                <button
                  @click="toggleSection('harga')"
                  class="w-full flex items-center justify-between mb-1.5 hover:cursor-pointer"
                >
                  <h4 class="text-lg font-medium text-[#1A1919]">Harga</h4>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      'transition-transform',
                      expandedSections.harga ? 'rotate-180' : '',
                    ]"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="#1A1919"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="expandedSections.harga"
                  class="flex gap-2.5 transition-all"
                >
                  <input
                    type="number"
                    v-model.number="priceRange.min"
                    placeholder="Min"
                    class="w-full p-2.5 border border-[#C1C1C1] rounded-md text-sm focus:border-[#E9322B] focus:outline-none"
                  />
                  <input
                    type="number"
                    v-model.number="priceRange.max"
                    placeholder="Max"
                    class="w-full p-2.5 border border-[#C1C1C1] rounded-md text-sm focus:border-[#E9322B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <div class="flex-1 min-w-0">
            <!-- Top Section: Info & Sort -->
            <div class="mb-4 sm:mb-2.5 pb-4 sm:pb-5 border-b border-[#E6E9F0]">
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-5"
              >
                <p class="text-sm sm:text-base text-[#7B7B7B]">
                  Menampilkan
                  <span class="text-[#1A1919] font-bold">{{
                    allProducts.length
                  }}</span>
                  produk
                </p>

                <!-- Sort Dropdown -->
                <div class="flex justify-end">
                  <div class="relative rounded-lg text-[#7B7B7B]">
                    <div class="flex items-center gap-2 sm:gap-2.5">
                      <p
                        class="text-sm sm:text-base font-medium hidden sm:inline"
                      >
                        Urutkan:
                      </p>
                      <button
                        @click="isSortOpen = !isSortOpen"
                        class="flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1.5 border border-[#E6E9F0] rounded-lg bg-white hover:bg-[#F6F9FF] transition hover:cursor-pointer text-sm sm:text-base"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.5H15M3.5 8H12.5M6.5 11.5H9.5"
                            stroke="#7B7B7B"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span>{{ selectedSort.label }}</span>
                      </button>
                    </div>

                    <div
                      v-if="isSortOpen"
                      class="absolute right-0 py-2.5 w-48 bg-white border border-[#E6E9F0] rounded-lg shadow-lg z-10"
                    >
                      <button
                        v-for="sort in sortOptions"
                        :key="sort.value"
                        @click="selectSort(sort)"
                        class="w-full text-left hover:bg-[#F6F9FF] transition first:rounded-t-lg last:rounded-b-lg hover:cursor-pointer"
                        :class="{
                          'bg-[#F6F9FF]': selectedSort.value === sort.value,
                        }"
                      >
                        <div
                          class="px-4 py-2"
                          :class="{
                            'border-l-4 border-[#E9322B]':
                              selectedSort.value === sort.value,
                          }"
                        >
                          <span>{{ sort.label }}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Active Filters -->
              <div
                class="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5"
              >
                <button
                  v-for="(filter, index) in activeFilters"
                  :key="index"
                  @click="removeFilter(filter)"
                  class="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 border border-[#7B7B7B] rounded-lg text-xs sm:text-sm text-[#7B7B7B] hover:bg-[#E6E9F0] transition hover:cursor-pointer"
                >
                  <span>{{ filter.label }}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 1.5C4.41594 1.5 1.5 4.41594 1.5 8C1.5 11.5841 4.41594 14.5 8 14.5C11.5841 14.5 14.5 11.5841 14.5 8C14.5 4.41594 11.5841 1.5 8 1.5ZM10.7072 10L10 10.7072L8 8.70719L6 10.7072L5.29281 10L7.29281 8L5.29281 6L6 5.29281L8 7.29281L10 5.29281L10.7072 6L8.70719 8L10.7072 10Z"
                      fill="#808080"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="loadingProducts" class="text-center py-12">
              <div
                class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9322B]"
              ></div>
              <p class="mt-4 text-[#1A1919] text-base">Memuat produk...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="errorProducts" class="text-center py-12">
              <p class="text-red-500 mb-4">{{ errorProducts }}</p>
              <button
                @click="loadProducts(1)"
                class="px-4 py-2 bg-[#E9322B] text-white rounded-lg hover:bg-[#d02a24] transition"
              >
                Coba Lagi
              </button>
            </div>

            <!-- Empty State -->
            <div
              v-else-if="allProducts.length === 0"
              class="text-center py-12"
            >
              <p class="text-[#808080] text-lg">
                {{
                  selectedStoreId
                    ? `Tidak ada produk ditemukan untuk store ${selectedStoreName || `Store ${selectedStoreId}`}`
                    : "Tidak ada produk ditemukan"
                }}
              </p>
              <button
                v-if="selectedStoreId"
                @click="toggleStoreFilter(selectedStoreId, selectedStoreName || `Store ${selectedStoreId}`)"
                class="mt-4 px-4 py-2 border border-[#E6E9F0] rounded-lg text-sm text-[#1A1919] hover:bg-[#F6F9FF] transition cursor-pointer"
              >
                Hapus Filter Store
              </button>
            </div>

            <!-- Products Grid -->
            <div
              v-else
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-stretch"
            >
              <NuxtLink
                v-for="product in allProducts"
                :key="product.id"
                :to="`/products/${product.slug || product.id}`"
                class="block h-full"
              >
                <Product
                  :name="product.name"
                  :image="product.image"
                  :finalPrice="product.final_price || product.base_price || 0"
                  :strikePrice="product.base_strike_price"
                  :rating="product.average_rating || 0"
                  :reviews="product.review_count || 0"
                  :discount="product.discount_percent || 0"
                  :newArrival="product.is_new_arrival || false"
                  size="small"
                />
              </NuxtLink>
            </div>

            <!-- Pagination -->
            <div
              v-if="!loadingProducts && !errorProducts && totalPages > 1"
              class="flex justify-center items-center gap-2 sm:gap-2.5 mt-6 sm:mt-8"
            >
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1 || loadingProducts"
                class="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#E6E9F0] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F6F9FF] transition text-sm sm:text-base cursor-pointer"
              >
                Previous
              </button>
              <span
                class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#808080]"
              >
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages || loadingProducts"
                class="px-3 sm:px-4 py-1.5 sm:py-2 border border-[#E6E9F0] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F6F9FF] transition text-sm sm:text-base cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Filter Modal -->
      <div
        v-if="showMobileFilter"
        class="fixed inset-0 z-50 lg:hidden"
        @click.self="showMobileFilter = false"
      >
        <div
          class="absolute inset-0 bg-black/40"
          @click="showMobileFilter = false"
        ></div>
        <div
          class="no-scrollbar absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto"
          @click.stop
        >
          <div
            class="sticky top-0 bg-white border-b border-[#E6E9F0] p-4 flex items-center justify-between z-10"
          >
            <h3
              class="text-xl font-semibold text-[#1A1919] flex items-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12V4M19 20V17M5 20V16M19 13V4M12 7V4M12 20V11"
                  stroke="black"
                  stroke-linecap="round"
                />
                <path
                  d="M5 16C6.10457 16 7 15.1046 7 14C7 12.8954 6.10457 12 5 12C3.89543 12 3 12.8954 3 14C3 15.1046 3.89543 16 5 16Z"
                  stroke="black"
                  stroke-linecap="round"
                />
                <path
                  d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                  stroke="black"
                  stroke-linecap="round"
                />
                <path
                  d="M19 17C20.1046 17 21 16.1046 21 15C21 13.8954 20.1046 13 19 13C17.8954 13 17 13.8954 17 15C17 16.1046 17.8954 17 19 17Z"
                  stroke="black"
                  stroke-linecap="round"
                />
              </svg>
              Filter
            </h3>
            <div class="flex items-center gap-3">
              <button
                @click="resetFilters"
                class="text-sm font-medium text-[#7B7B7B] hover:text-[#1A1919] transition cursor-pointer"
              >
                Reset
              </button>
              <button
                @click="showMobileFilter = false"
                class="w-8 h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full transition cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#1A1919"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="p-4">
            <!-- Kategori (mobile) -->
            <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('kategori')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Kategori</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.kategori ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.kategori"
                class="space-y-1 transition-all"
              >
                <template v-for="cat in parentCategories" :key="cat.id">
                  <div>
                    <label class="flex items-center gap-2 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        :value="cat.id"
                        v-model="selectedCategories"
                        class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer shrink-0"
                      />
                      <span
                        :class="{
                          'text-[#E9322B]': selectedCategories.includes(
                            cat.id,
                          ),
                          'text-[#808080]': !selectedCategories.includes(
                            cat.id,
                          ),
                        }"
                      >
                        {{ cat.name }}
                      </span>
                    </label>
                    <div
                      v-if="selectedCategories.includes(cat.id) && getChildren(cat.id).length"
                      class="ml-6 space-y-0.5"
                    >
                      <label
                        v-for="child in getChildren(cat.id)"
                        :key="child.id"
                        class="flex items-center gap-2 cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          :value="child.id"
                          v-model="selectedCategories"
                          class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer shrink-0"
                        />
                        <span
                          :class="{
                            'text-[#E9322B]': selectedCategories.includes(
                              child.id,
                            ),
                            'text-[#808080]': !selectedCategories.includes(
                              child.id,
                            ),
                          }"
                        >
                          {{ child.name }}
                        </span>
                      </label>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- Brand -->
            <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('brand')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Brand</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.brand ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.brand"
                class="space-y-1 transition-all"
              >
                <label
                  v-for="brand in brands"
                  :key="brand.id"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="brand.slug"
                    v-model="selectedBrands"
                    class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                  />
                  <span
                    :class="{
                      'text-[#E9322B]': selectedBrands.includes(brand.slug),
                      'text-[#808080]': !selectedBrands.includes(brand.slug),
                    }"
                    class="text-sm"
                    >{{ brand.name }}</span
                  >
                </label>
              </div>
            </div>

            <!-- Store -->
            <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('store')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Store</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.store ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.store"
                class="space-y-1 transition-all"
              >
                <div v-if="loadingStores" class="text-center py-4">
                  <div
                    class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#E9322B]"
                  ></div>
                </div>
                <div
                  v-else-if="stores.length === 0"
                  class="text-sm text-[#808080] py-2"
                >
                  Tidak ada store
                </div>
                <template v-else>
                  <label
                    v-for="store in stores"
                    :key="store.id"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      :checked="selectedStoreId === store.id"
                      @change="toggleStoreFilter(store.id, store.name)"
                      class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                    />
                    <span
                      :class="{
                        'text-[#E9322B]': selectedStoreId === store.id,
                        'text-[#808080]': selectedStoreId !== store.id,
                      }"
                      class="text-sm"
                    >
                      {{ store.name }}
                    </span>
                  </label>
                </template>
              </div>
            </div>

            <!-- Promo -->
            <!-- <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('promo')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Promo</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.promo ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.promo"
                class="space-y-1 transition-all"
              >
                <label
                  v-for="promo in promos"
                  :key="promo.id"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="promo.id"
                    v-model="selectedPromos"
                    class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                  />
                  <span
                    :class="{
                      'text-[#E9322B]': selectedPromos.includes(promo.id),
                      'text-[#808080]': !selectedPromos.includes(promo.id),
                    }"
                    class="text-sm"
                    >{{ promo.name }}</span
                  >
                </label>
              </div>
            </div> -->

            <!-- Rating -->
            <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('rating')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Rating</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.rating ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.rating"
                class="space-y-1 transition-all"
              >
                <label
                  v-for="rating in ratings"
                  :key="rating.value"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    :value="rating.value"
                    v-model="selectedRatings"
                    class="w-4 h-4 text-[#E9322B] border-[#E6E9F0] rounded focus:ring-[#E9322B] hover:cursor-pointer"
                  />
                  <div
                    :class="{
                      'text-[#E9322B]': selectedRatings.includes(rating.value),
                      'text-[#808080]': !selectedRatings.includes(rating.value),
                    }"
                    class="flex items-center"
                  >
                    <svg
                      v-for="i in 5"
                      :key="i"
                      width="14"
                      height="14"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.126 14.8748L5.27704 8.73437L1.41663 5.78125L5.75 5.39062L7.5 1.25L9.25 5.39062L13.75 5.78125L10.3438 8.73437L11.3594 14.8748L7.5 10.7969L3.64062 14.8748Z"
                        :fill="i <= rating.value ? '#FFCC00' : '#FFFFFF'"
                      />
                    </svg>
                  </div>
                </label>
              </div>
            </div>

            <!-- Harga -->
            <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
              <button
                @click="toggleSection('harga')"
                class="w-full flex items-center justify-between mb-2 hover:cursor-pointer"
              >
                <h4 class="text-base font-medium text-[#1A1919]">Harga</h4>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'transition-transform',
                    expandedSections.harga ? 'rotate-180' : '',
                  ]"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="#1A1919"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div
                v-show="expandedSections.harga"
                class="flex gap-2 transition-all"
              >
                <input
                  type="number"
                  v-model.number="priceRange.min"
                  placeholder="Min"
                  class="w-full p-2 border border-[#C1C1C1] rounded-md text-sm focus:border-[#E9322B] focus:outline-none"
                />
                <input
                  type="number"
                  v-model.number="priceRange.max"
                  placeholder="Max"
                  class="w-full p-2 border border-[#C1C1C1] rounded-md text-sm focus:border-[#E9322B] focus:outline-none"
                />
              </div>
            </div>

            <!-- Apply Button -->
            <button
              @click="showMobileFilter = false"
              class="w-full mt-6 bg-[#E9322B] text-white py-2.5 rounded-lg font-medium text-base hover:bg-[#C4282B] transition cursor-pointer"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { formatNumber } from "~/utils/helpers";
import type { Product } from "~/types/product";
import type { Brand } from "~/types/brand";
import type { Store } from "~/types/store";
import { useProductApi } from "~/composables/useProductApi";
import { useProductRelationsApi } from "~/composables/useProductRelationsApi";
import { useBrandApi } from "~/composables/useBrandApi";
import { useStoreApi } from "~/composables/useStoreApi";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();
const { baseURL } = useApiBase();
const baseImageUrl = baseURL.replace(/\/api\/?$/, "");
const { getProducts } = useProductApi();
const { getTaxoListsByType } = useProductRelationsApi();
const { getActiveBrands } = useBrandApi();
const { getPublicStores } = useStoreApi();

// Loading & Error States
const loadingProducts = ref(false);
const loadingCategories = ref(false);
const loadingStores = ref(false);
const errorProducts = ref<string | null>(null);

// Filter State
const selectedCategories = ref<number[]>([]);
const selectedBrands = ref<string[]>([]);
const selectedStoreId = ref<number | null>(null);
const selectedStoreName = ref<string>("");
const selectedPromos = ref<number[]>([]);
const selectedRatings = ref<number[]>([]);
const priceRange = ref({
  min: null as number | null,
  max: null as number | null,
});
const searchQuery = ref<string>("");
const searchInput = ref<string>("");

// Collapse State for Filters
const expandedSections = ref({
  kategori: true,
  brand: true,
  store: true,
  promo: true,
  rating: true,
  harga: true,
});

const toggleSection = (section: keyof typeof expandedSections.value) => {
  expandedSections.value[section] = !expandedSections.value[section];
};

// Sort State
const isSortOpen = ref(false);
const selectedSort = ref({ value: "relevance", label: "Paling Sesuai" });
const showMobileFilter = ref(false);
const sortOptions = [
  { value: "relevance", label: "Paling Sesuai" },
  { value: "reviews", label: "Ulasan" },
  { value: "newest", label: "Terbaru" },
  { value: "price_low", label: "Harga Terendah" },
  { value: "price_high", label: "Harga Tertinggi" },
];

// Pagination
const currentPage = ref(1);
const itemsPerPage = 12;
const pagination = ref<{
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
} | null>(null);

// Data
const categories = ref<Array<{ id: number; name: string; parent: number | null }>>([]);
const parentCategories = computed(() => categories.value.filter((c) => !c.parent));
const getChildren = (parentId: number) => categories.value.filter((c) => c.parent === parentId);

// Computed category name based on selected categories
const currentCategory = computed(() => {
  if (selectedCategories.value.length === 0) {
    return "Semua Produk";
  }
  if (selectedCategories.value.length === 1) {
    const category = categories.value.find(
      (c) => c.id === selectedCategories.value[0],
    );
    return category ? category.name : "Kategori Terpilih";
  }
  return `${selectedCategories.value.length} Kategori`;
});

const brands = ref<Array<Brand>>([]);
const stores = ref<Array<Store>>([]);

const promos = ref([
  { id: 1, name: "New Arrivals" },
  { id: 2, name: "Best Offer" },
]);

const ratings = ref([
  { value: 5, label: "5 Bintang" },
  { value: 4, label: "4 Bintang" },
  { value: 3, label: "3 Bintang" },
  { value: 2, label: "2 Bintang" },
  { value: 1, label: "1 Bintang" },
]);

// Products Data from API
const allProducts = ref<Array<Product>>([]);

// Transform API product to frontend format (using base_price)
const transformProduct = (product: Product) => {
  const basePrice = product.base_price || 0;
  const finalPrice = product.final_price || basePrice;
  const strikePrice = product.base_strike_price || null;
  const discountPercent = product.discount_percent
    ? Math.round(product.discount_percent)
    : 0;

  let image = "/assets/img/not-found.svg";
  const featured = product.images?.find((img) => img.is_featured);
  const rawPath = featured?.path || product.images?.[0]?.path || product.featured_image?.path;
  if (rawPath) {
    image = rawPath.startsWith("http") ? rawPath : `${baseImageUrl}${rawPath}`;
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    image,
    final_price: finalPrice,
    base_strike_price: strikePrice,
    discount_percent: discountPercent,
    average_rating: product.average_rating || 0,
    review_count: product.review_count || 0,
    is_new_arrival: product.is_new_arrival || false,
  };
};

// Load products from API
const loadProducts = async (page: number = currentPage.value) => {
  loadingProducts.value = true;
  errorProducts.value = null;
  currentPage.value = page;

  try {
    // Determine sort by and direction — fully integrated with BE
    let sortBy: string | undefined = undefined;
    let sortDirection: "asc" | "desc" = "desc";

    switch (selectedSort.value.value) {
      case "newest":
        sortBy = "created_at";
        sortDirection = "desc";
        break;
      case "price_low":
        sortBy = "final_price";
        sortDirection = "asc";
        break;
      case "price_high":
        sortBy = "final_price";
        sortDirection = "desc";
        break;
      case "reviews":
        sortBy = "review_count";
        sortDirection = "desc";
        break;
    }

    // Build filters object
    const filters: {
      isNewArrival?: boolean;
      minRating?: number;
      minPrice?: number;
      maxPrice?: number;
    } = {};

    // New Arrival filter (Promo: New Arrivals)
    if (selectedPromos.value.includes(1)) {
      filters.isNewArrival = true;
    }

    // Rating filter
    if (selectedRatings.value.length > 0) {
      filters.minRating = Math.min(...selectedRatings.value);
    }

    // Price range filter
    if (priceRange.value.min || priceRange.value.max) {
      if (priceRange.value.min) {
        filters.minPrice = priceRange.value.min;
      }
      if (priceRange.value.max) {
        filters.maxPrice = priceRange.value.max;
      }
    }

    const { data, error } = await getProducts(
      page,
      itemsPerPage,
      sortBy,
      sortDirection,
      selectedCategories.value.length ? selectedCategories.value : undefined,
      selectedBrands.value.length ? selectedBrands.value : undefined,
      searchQuery.value || undefined,
      selectedStoreId.value || undefined,
      Object.keys(filters).length ? filters : undefined,
    );

    if (error || !data?.success) {
      errorProducts.value = error?.message || "Gagal memuat produk";
      allProducts.value = [];
      pagination.value = null;
      return;
    }

    if (data.data) {
      // Transform products
      const transformedProducts = (data.data.products || [])
        .filter((p: Product) => p.status === "PUBLISH")
        .map(transformProduct);

      allProducts.value = transformedProducts;

      if (data.data.pagination) {
        pagination.value = {
          ...data.data.pagination,
          from: data.data.pagination.from || null,
          to: data.data.pagination.to || null,
        };
      }
    }
  } catch (err) {
    console.error("Error loading products:", err);
    errorProducts.value = "Terjadi kesalahan saat memuat produk";
    allProducts.value = [];
    pagination.value = null;
  } finally {
    loadingProducts.value = false;
  }
};

// Load categories from API
const loadCategories = async () => {
  loadingCategories.value = true;
  try {
    const [type2, type3] = await Promise.all([
      getTaxoListsByType(2),
      getTaxoListsByType(3),
    ]);

    const categories2 = type2.data?.data?.taxo_lists || [];
    const categories3 = type3.data?.data?.taxo_lists || [];

    categories.value = [...categories2, ...categories3]
      .filter((cat) => cat.taxonomy_status === "ACTIVE")
      .map((cat) => ({
        id: cat.id,
        name: cat.taxonomy_name,
        parent: cat.parent ?? null,
      }));
  } catch (err) {
    console.error("Error loading categories:", err);
    categories.value = [];
  } finally {
    loadingCategories.value = false;
  }
};

const loadBrands = async () => {
  try {
    const { data, error } = await getActiveBrands();
    if (error || !data?.success) {
      brands.value = [];
      return;
    }
    brands.value = data.data?.brands || [];
  } catch (err) {
    console.error("Error loading brands:", err);
    brands.value = [];
  }
};

const loadStores = async () => {
  loadingStores.value = true;
  try {
    const { data, error } = await getPublicStores();
    if (error || !data?.success) {
      stores.value = [];
      return;
    }
    stores.value = (data.data?.stores || []).filter(
      (store) => store.status !== "INACTIVE",
    );
  } catch (err) {
    console.error("Error loading stores:", err);
    stores.value = [];
  } finally {
    loadingStores.value = false;
  }
};

// Computed
const activeFilters = computed(() => {
  const filters: Array<{ type: string; label: string; value: any }> = [];

  if (selectedCategories.value.length > 0) {
    selectedCategories.value.forEach((id) => {
      const category = categories.value.find((c) => c.id === id);
      if (category) {
        filters.push({ type: "category", label: category.name, value: id });
      }
    });
  }

  if (selectedBrands.value.length > 0) {
    selectedBrands.value.forEach((slug) => {
      const brand = brands.value.find((b) => b.slug === slug);
      if (brand) {
        filters.push({
          type: "brand",
          label: brand.name,
          value: slug,
        });
      }
    });
  }

  if (selectedStoreId.value) {
    filters.push({
      type: "store",
      label: selectedStoreName.value || `Store ${selectedStoreId.value}`,
      value: selectedStoreId.value,
    });
  }

  if (selectedPromos.value.length > 0) {
    selectedPromos.value.forEach((id) => {
      const promo = promos.value.find((p) => p.id === id);
      if (promo) {
        filters.push({ type: "promo", label: promo.name, value: id });
      }
    });
  }

  if (selectedRatings.value.length > 0) {
    selectedRatings.value.forEach((rating) => {
      filters.push({
        type: "rating",
        label: `${rating} Bintang`,
        value: rating,
      });
    });
  }

  if (priceRange.value.min || priceRange.value.max) {
    const min = priceRange.value.min
      ? `Rp ${formatNumber(priceRange.value.min)}`
      : "";
    const max = priceRange.value.max
      ? `Rp ${formatNumber(priceRange.value.max)}`
      : "";
    filters.push({
      type: "price",
      label: `Harga ${min} - ${max}`,
      value: { min: priceRange.value.min, max: priceRange.value.max },
    });
  }

  return filters;
});

const totalPages = computed(() => {
  return pagination.value?.last_page || 1;
});

const clearStoreQuery = async () => {
  const nextQuery = { ...route.query };
  delete nextQuery.store_id;
  delete nextQuery.store_name;
  await router.replace({ query: nextQuery });
};

const setStoreQuery = async (storeId: number, storeName: string) => {
  await router.replace({
    query: {
      ...route.query,
      store_id: String(storeId),
      store_name: storeName,
    },
  });
};

const toggleStoreFilter = (storeId: number, storeName: string) => {
  if (selectedStoreId.value === storeId) {
    selectedStoreId.value = null;
    selectedStoreName.value = "";
    void clearStoreQuery();
    return;
  }

  selectedStoreId.value = storeId;
  selectedStoreName.value = storeName;
  void setStoreQuery(storeId, storeName);
};

const resetFilters = () => {
  selectedCategories.value = [];
  selectedBrands.value = [];
  selectedStoreId.value = null;
  selectedStoreName.value = "";
  selectedPromos.value = [];
  selectedRatings.value = [];
  priceRange.value = { min: null, max: null };
  currentPage.value = 1;
  void clearStoreQuery();
};

const removeFilter = (filter: { type: string; label: string; value: any }) => {
  if (filter.type === "category") {
    selectedCategories.value = selectedCategories.value.filter(
      (id) => id !== filter.value,
    );
  } else if (filter.type === "brand") {
    selectedBrands.value = selectedBrands.value.filter(
      (slug) => slug !== filter.value,
    );
  } else if (filter.type === "store") {
    selectedStoreId.value = null;
    selectedStoreName.value = "";
    void clearStoreQuery();
  } else if (filter.type === "promo") {
    selectedPromos.value = selectedPromos.value.filter(
      (id) => id !== filter.value,
    );
  } else if (filter.type === "rating") {
    selectedRatings.value = selectedRatings.value.filter(
      (r) => r !== filter.value,
    );
  } else if (filter.type === "price") {
    priceRange.value = { min: null, max: null };
  }
  currentPage.value = 1;
};

const selectSort = (sort: { value: string; label: string }) => {
  selectedSort.value = sort;
  isSortOpen.value = false;
  currentPage.value = 1;
  loadProducts(1);
};

const handleSearch = () => {
  searchQuery.value = searchInput.value;
  currentPage.value = 1;
  loadProducts(1);
};

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    loadProducts(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

// Read search query from URL on mount
onMounted(async () => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".relative")) {
      isSortOpen.value = false;
    }
  });

  // Read search query from URL
  const searchParam = route.query.search as string | undefined;
  if (searchParam) {
    searchQuery.value = searchParam;
    searchInput.value = searchParam;
  }

  // Read category_ids from URL
  const categoryIdsParam = route.query.category_ids as
    | string
    | string[]
    | undefined;
  if (categoryIdsParam) {
    if (Array.isArray(categoryIdsParam)) {
      selectedCategories.value = categoryIdsParam
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id));
    } else {
      const ids = categoryIdsParam
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));
      selectedCategories.value = ids;
    }
  }
  const brandParam = route.query.brand as string | undefined;

  if (brandParam) {
    selectedBrands.value = brandParam.split(",");
  }

  const storeIdParam = route.query.store_id as string | undefined;
  if (storeIdParam) {
    const parsedStoreId = parseInt(storeIdParam, 10);
    selectedStoreId.value = Number.isNaN(parsedStoreId) ? null : parsedStoreId;
  }

  const storeNameParam = route.query.store_name as string | undefined;
  if (storeNameParam) {
    selectedStoreName.value = storeNameParam;
  }

  // Load initial data
  await Promise.all([loadProducts(1), loadCategories(), loadBrands(), loadStores()]);
});

// Watch URL search param changes (navigated from header search etc.)
watch(
  () => route.query.search,
  (newSearch) => {
    const search = (newSearch as string) || "";
    if (searchQuery.value !== search) {
      searchInput.value = search;
      searchQuery.value = search;
      currentPage.value = 1;
      loadProducts(1);
    }
  },
);

// Watch URL category_ids changes
watch(
  () => route.query.category_ids,
  (newCategoryIds) => {
    if (newCategoryIds) {
      if (Array.isArray(newCategoryIds)) {
        selectedCategories.value = newCategoryIds
          .map((id) => parseInt(id as string))
          .filter((id) => !isNaN(id));
      } else {
        const ids = (newCategoryIds as string)
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id));
        selectedCategories.value = ids;
      }
    } else {
      selectedCategories.value = [];
    }
    currentPage.value = 1;
    loadProducts(1);
  },
);

watch(
  () => route.query.store_id,
  (newStoreId) => {
    if (newStoreId) {
      const parsedStoreId = parseInt(newStoreId as string, 10);
      selectedStoreId.value = Number.isNaN(parsedStoreId) ? null : parsedStoreId;
    } else {
      selectedStoreId.value = null;
    }
    currentPage.value = 1;
    loadProducts(1);
  },
);

watch(
  () => route.query.store_name,
  (newStoreName) => {
    selectedStoreName.value = (newStoreName as string) || "";
  },
);

// Single consolidated watcher for all filter changes
watch(
  [
    selectedCategories,
    selectedBrands,
    selectedStoreId,
    selectedPromos,
    selectedRatings,
    priceRange,
  ],
  () => {
    currentPage.value = 1;
    loadProducts(1);
  },
  { deep: true },
);

// When a parent category is unchecked, also remove its children
watch(
  selectedCategories,
  (newVal, oldVal) => {
    if (oldVal.length <= newVal.length) return;
    const removed = oldVal.filter((id) => !newVal.includes(id));
    let changed = false;
    const next = [...newVal];
    for (const id of removed) {
      const children = getChildren(id).map((c) => c.id);
      for (const childId of children) {
        const idx = next.indexOf(childId);
        if (idx !== -1) {
          next.splice(idx, 1);
          changed = true;
        }
      }
    }
    if (changed) selectedCategories.value = next;
  },
  { deep: true },
);
</script>

<style scoped>
/* Additional styles if needed */
</style>
