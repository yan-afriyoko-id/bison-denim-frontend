<template>
  <main class="bg-white">
    <Header />
    <div>
      <div
        class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-6 sm:py-8 md:py-10"
      >
        <!-- Sticky Sub-Nav (right below navbar) -->
        <div
          v-if="!loadingProduct && !errorProduct"
          class="sticky top-[75px] z-40 bg-white border-b border-[#E6E9F0] -mx-2 sm:-mx-4 md:-mx-11 px-2 sm:px-4 md:px-11 mb-6"
        >
          <div class="flex gap-6 md:gap-8 overflow-x-auto">
            <a
              v-for="tab in productDetailTabs"
              :key="tab.id"
              :href="'#' + tab.id"
              class="px-1 py-3 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition shrink-0"
              :class="activeTabId === tab.id ? 'border-black text-black' : 'border-transparent text-[#808080] hover:text-black'"
              @click.prevent="scrollToSection(tab.id)"
            >{{ tab.label }}</a>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loadingProduct" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E1E1E]"
          ></div>
          <p class="mt-4 text-[#1A1919] text-base">Memuat produk...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorProduct" class="text-center py-12">
          <p class="text-red-500 mb-4">{{ errorProduct }}</p>
          <button
            @click="loadProduct()"
            class="px-4 py-2 bg-[#1E1E1E] text-white rounded-lg hover:bg-[#333333] transition"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Combined Section: Main Product Display + Informasi + Spesifikasi + Ulasan -->
        <div v-else>
        <!-- Main Product Display -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12"
        >
          <!-- Product Images -->
          <div class="flex flex-col md:flex-row gap-3">
            <!-- Thumbnail Strip (Vertical on Desktop) -->
            <div class="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
              <button
                v-for="(img, index) in productImages"
                :key="index"
                @click="selectedImage = img; selectedImageIndex = index"
                :class="[
                  'w-16 h-16 md:w-20 md:h-20 rounded border-2 transition hover:cursor-pointer shrink-0 overflow-hidden',
                  selectedImage === img || (!selectedImage && index === 0)
                    ? 'border-black'
                    : 'border-gray-200 hover:border-gray-400',
                ]"
              >
                <NuxtImg
                  :src="img"
                  :alt="`${product.name} ${index + 1}`"
                  class="w-full h-full object-cover"
                  fit="cover"
                />
              </button>
            </div>
            <!-- Main Image -->
            <div class="flex-1 order-1 md:order-2">
              <div
                class="relative group overflow-hidden rounded cursor-crosshair"
                @mousemove="onImageZoom"
                @mouseleave="zoomOrigin = null"
              >
                <NuxtImg
                  :src="selectedImage || product.image"
                  :alt="product.name"
                  :width="640"
                  :height="640"
                  class="w-full object-cover rounded aspect-square transition-transform duration-200"
                  :class="{ 'scale-150': zoomOrigin !== null }"
                  :style="zoomOrigin ? { 'transform-origin': zoomOrigin } : {}"
                  fit="cover"
                />

                <!-- Nav Arrows inside image (left/right, vertically centered) -->
                <template v-if="productImages.length > 1">
                  <button
                    @click="prevImage"
                    class="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:cursor-pointer transition"
                    aria-label="Previous image"
                  >
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M15 19L8 12L15 5" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button
                    @click="nextImage"
                    class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:cursor-pointer transition"
                    aria-label="Next image"
                  >
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5L16 12L9 19" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <!-- Image counter -->
                  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
                    {{ selectedImageIndex + 1 }} / {{ productImages.length }}
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div class="lg:sticky lg:top-[140px] lg:self-start">
            <div class="flex items-start gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
              <h1
                class="text-xl sm:text-2xl md:text-[32px] font-semibold text-[var(--color-brand-black-soft)] flex-1"
              >
                {{ product.name }}
              </h1>
              <!-- <div class="flex items-center gap-1 sm:gap-[5px]">
              <button
                @click="toggleLike"
                :class="[
                  'p-1.5 sm:p-2 rounded-full border transition hover:cursor-pointer',
                  isLiked
                    ? 'border-[#1E1E1E] bg-[#1E1E1E14]'
                    : 'border-[#C1C1C1] hover:border-[#1E1E1E] hover:bg-[#1E1E1E14]',
                ]"
              >
                <svg
                  width="16"
                  height="16"
                  class="sm:w-5 sm:h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    v-if="isLiked"
                    d="M10.0003 17.7917L8.79199 16.6917C4.50033 12.8 1.66699 10.225 1.66699 7.08333C1.66699 4.50833 3.68366 2.5 6.25032 2.5C7.70032 2.5 9.09199 3.175 10.0003 4.23333C10.9087 3.175 12.3003 2.5 13.7503 2.5C16.317 2.5 18.3337 4.50833 18.3337 7.08333C18.3337 10.225 15.5003 12.8 11.2087 16.6917L10.0003 17.7917Z"
                    fill="#1E1E1E"
                  />
                  <path
                    v-else
                    d="M10.0837 15.4583L10.0003 15.5417L9.90866 15.4583C5.95033 11.8667 3.33366 9.49167 3.33366 7.08333C3.33366 5.41667 4.58366 4.16667 6.25032 4.16667C7.53366 4.16667 8.78366 5 9.22532 6.13333H10.7753C11.217 5 12.467 4.16667 13.7503 4.16667C15.417 4.16667 16.667 5.41667 16.667 7.08333C16.667 9.49167 14.0503 11.8667 10.0837 15.4583ZM13.7503 2.5C12.3003 2.5 10.9087 3.175 10.0003 4.23333C9.09199 3.175 7.70032 2.5 6.25032 2.5C3.68366 2.5 1.66699 4.50833 1.66699 7.08333C1.66699 10.225 4.50033 12.8 8.79199 16.6917L10.0003 17.7917L11.2087 16.6917C15.5003 12.8 18.3337 10.225 18.3337 7.08333C18.3337 4.50833 16.317 2.5 13.7503 2.5Z"
                    fill="#808080"
                  />
                </svg>
              </button>
              <div
                class="p-1.5 sm:p-2 rounded-full border border-[#C1C1C1] hover:cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  class="sm:w-5 sm:h-5"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.167 18.3332C13.4725 18.3332 12.8823 18.0901 12.3962 17.604C11.91 17.1179 11.667 16.5276 11.667 15.8332C11.667 15.7498 11.6878 15.5554 11.7295 15.2498L5.87533 11.8332C5.6531 12.0415 5.39616 12.2048 5.10449 12.3232C4.81283 12.4415 4.50033 12.5004 4.16699 12.4998C3.47255 12.4998 2.88227 12.2568 2.39616 11.7707C1.91005 11.2846 1.66699 10.6943 1.66699 9.99984C1.66699 9.30539 1.91005 8.71511 2.39616 8.229C2.88227 7.74289 3.47255 7.49984 4.16699 7.49984C4.50033 7.49984 4.81283 7.559 5.10449 7.67734C5.39616 7.79567 5.6531 7.95873 5.87533 8.1665L11.7295 4.74984C11.7017 4.65261 11.6845 4.559 11.6778 4.469C11.6712 4.379 11.6675 4.27817 11.667 4.1665C11.667 3.47206 11.91 2.88178 12.3962 2.39567C12.8823 1.90956 13.4725 1.6665 14.167 1.6665C14.8614 1.6665 15.4517 1.90956 15.9378 2.39567C16.4239 2.88178 16.667 3.47206 16.667 4.1665C16.667 4.86095 16.4239 5.45123 15.9378 5.93734C15.4517 6.42345 14.8614 6.6665 14.167 6.6665C13.8337 6.6665 13.5212 6.60734 13.2295 6.489C12.9378 6.37067 12.6809 6.20761 12.4587 5.99984L6.60449 9.4165C6.63227 9.51372 6.64977 9.60761 6.65699 9.69817C6.66421 9.78872 6.66755 9.88928 6.66699 9.99984C6.66644 10.1104 6.6631 10.2112 6.65699 10.3023C6.65088 10.3934 6.63338 10.4871 6.60449 10.5832L12.4587 13.9998C12.6809 13.7915 12.9378 13.6284 13.2295 13.5107C13.5212 13.3929 13.8337 13.3337 14.167 13.3332C14.8614 13.3332 15.4517 13.5762 15.9378 14.0623C16.4239 14.5484 16.667 15.1387 16.667 15.8332C16.667 16.5276 16.4239 17.1179 15.9378 17.604C15.4517 18.0901 14.8614 18.3332 14.167 18.3332ZM14.167 16.6665C14.4031 16.6665 14.6012 16.5868 14.7612 16.4273C14.9212 16.2679 15.0009 16.0698 15.0003 15.8332C14.9998 15.5965 14.9198 15.3987 14.7603 15.2398C14.6009 15.0809 14.4031 15.0009 14.167 14.9998C13.9309 14.9987 13.7331 15.0787 13.5737 15.2398C13.4142 15.4009 13.3342 15.5987 13.3337 15.8332C13.3331 16.0676 13.4131 16.2657 13.5737 16.4273C13.7342 16.589 13.932 16.6687 14.167 16.6665ZM4.16699 10.8332C4.4031 10.8332 4.60116 10.7532 4.76116 10.5932C4.92116 10.4332 5.00088 10.2354 5.00033 9.99984C4.99977 9.76428 4.91977 9.5665 4.76033 9.4065C4.60088 9.2465 4.4031 9.1665 4.16699 9.1665C3.93088 9.1665 3.7331 9.2465 3.57366 9.4065C3.41421 9.5665 3.33421 9.76428 3.33366 9.99984C3.3331 10.2354 3.4131 10.4334 3.57366 10.594C3.73421 10.7546 3.93199 10.8343 4.16699 10.8332ZM14.167 4.99984C14.4031 4.99984 14.6012 4.91984 14.7612 4.75984C14.9212 4.59984 15.0009 4.40206 15.0003 4.1665C14.9998 3.93095 14.9198 3.73317 14.7603 3.57317C14.6009 3.41317 14.4031 3.33317 14.167 3.33317C13.9309 3.33317 13.7331 3.41317 13.5737 3.57317C13.4142 3.73317 13.3342 3.93095 13.3337 4.1665C13.3331 4.40206 13.4131 4.60011 13.5737 4.76067C13.7342 4.92123 13.932 5.00095 14.167 4.99984Z"
                    fill="#808080"
                  />
                </svg>
            </div>
            <!-- </div> -->
            </div>

            <div v-if="product.sku" class="text-sm text-[#808080] mb-3">
              SKU: {{ product.sku }}
            </div>

            <!-- Price -->
            <div class="mb-4 sm:mb-5 border-b border-[#E6E9F0] pb-4">
              <div class="flex items-center gap-3 flex-wrap">
                <p class="text-2xl sm:text-3xl md:text-[38px] font-bold text-[#1A1919]">
                  Rp {{ formatNumber(currentPrice) }}
                </p>
                <div
                  v-if="currentStrikePrice && currentStrikePrice > currentPrice"
                  class="flex items-center gap-2"
                >
                  <p class="text-sm sm:text-base text-[#999999] line-through">
                    Rp {{ formatNumber(currentStrikePrice) }}
                  </p>
                  <span
                    v-if="currentDiscount"
                    class="px-1.5 py-0.5 bg-[#E5322B] text-white text-[11px] font-bold rounded-sm"
                  >
                    -{{ currentDiscount }}%
                  </span>
                </div>
              </div>

              <!-- Inline Product Info (Rincian Produk) -->
              <div class="mt-3 pt-3 border-t border-gray-100 text-xs text-[#666] space-y-1">
                <div v-if="product.sku" class="flex">
                  <span class="w-28 shrink-0">SKU</span>
                  <span>{{ product.sku }}</span>
                </div>
                <div v-if="product.material" class="flex">
                  <span class="w-28 shrink-0">Material</span>
                  <span>{{ product.material }}</span>
                </div>
                <div v-if="product.finishing" class="flex">
                  <span class="w-28 shrink-0">Finishing</span>
                  <span>{{ product.finishing }}</span>
                </div>
                <div v-if="product.weight" class="flex">
                  <span class="w-28 shrink-0">Berat</span>
                  <span>{{ product.weight }}{{ product.type_weight ? ' ' + product.type_weight : ' gr' }}</span>
                </div>
                <div v-if="product.package_long" class="flex">
                  <span class="w-28 shrink-0">Dimensi Kemasan</span>
                  <span>{{ product.package_long }} x {{ product.package_wide }} x {{ product.package_tall }}{{ product.type_size ? ' ' + product.type_size : ' cm' }}</span>
                </div>
              </div>
            </div>



            <!-- Dynamic Attribute Options -->
            <template v-for="attribute in dynamicAttributes">
              <div
                v-if="attribute.values.length > 0"
                :key="attribute.attribute_id"
                class="mb-5 sm:mb-7.5"
              >
                <h3 class="text-base sm:text-lg text-[#1A1919] mb-3 sm:mb-4">
                  {{ attribute.attribute_name }}
                </h3>
                <div class="flex flex-wrap gap-2 sm:gap-2.5">
                  <button
                    v-for="attrValue in attribute.values"
                    :key="attrValue.attribute_value_id"
                    @click="
                      !attrValue.disabled &&
                      selectAttributeValue(
                        attribute.attribute_id,
                        attrValue.attribute_value_id,
                      )
                    "
                    :disabled="attrValue.disabled"
                    :class="[
                      'relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border rounded-[3px] font-medium transition overflow-hidden text-sm sm:text-base',
                      selectedAttributeValues[attribute.attribute_id] ===
                        attrValue.attribute_value_id && !attrValue.disabled
                        ? 'border-[#1E1E1E] text-[#1E1E1E] bg-[#1E1E1E14] hover:cursor-pointer'
                        : '',
                      selectedAttributeValues[attribute.attribute_id] !==
                        attrValue.attribute_value_id && !attrValue.disabled
                        ? 'border-[#E6E9F0] text-[#808080] hover:border-[#1E1E1E] hover:bg-[#1E1E1E14] hover:cursor-pointer'
                        : '',
                      attrValue.disabled
                        ? 'border-transparent text-[#ACACAC] bg-[#F2F4F7] cursor-not-allowed'
                        : '',
                    ]"
                  >
                    <span>{{ attrValue.value }}</span>
                    <div
                      v-if="
                        selectedAttributeValues[attribute.attribute_id] ===
                          attrValue.attribute_value_id && !attrValue.disabled
                      "
                      class="absolute -bottom-[1px] -right-[1px]"
                    >
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 0L0 9L9 9V0Z" fill="#1E1E1E" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </template>

            <!-- Quantity & Actions -->
            <div>
              <div class="mb-3 w-full flex justify-between items-center">
                <p class="text-base sm:text-lg">Subtotal:</p>
                <span
                  class="text-xl sm:text-2xl md:text-[32px] font-semibold"
                  >{{ calculateSubtotal }}</span
                >
              </div>

              <div class="flex items-center gap-2 sm:gap-3">
                <div
                  class="flex items-center gap-2 sm:gap-3 border border-[#D9D9D9] rounded-sm py-1 sm:py-1.5 px-1.5 sm:px-2 shrink-0"
                >
                  <button
                    @click="decreaseQuantity"
                    :disabled="quantity === 1"
                    class="disabled:cursor-not-allowed hover:cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      class="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 12.998H5V10.998H19V12.998Z"
                        fill="#C1C1C1"
                      />
                    </svg>
                  </button>
                  <span class="text-sm sm:text-base text-[#1A1919]">{{
                    quantity
                  }}</span>
                  <button
                    @click="increaseQuantity"
                    :disabled="quantity >= currentStock"
                    class="hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      width="16"
                      height="16"
                      class="sm:w-5 sm:h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                        :fill="
                          quantity >= currentStock ? '#C1C1C1' : '#1E1E1E'
                        "
                      />
                    </svg>
                  </button>
                </div>
                <button
                  @click="handleAddToCart"
                  :disabled="isButtonDisabled || isAddingToCart"
                  class="flex-1 border-2 border-black text-black py-2.5 sm:py-3 rounded font-semibold text-sm hover:bg-gray-50 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isAddingToCart ? "Menambahkan..." : "Keranjang" }}
                </button>
                <button
                  @click="handleBuy"
                  :disabled="isButtonDisabled"
                  class="flex-1 bg-[#1E1E1E] text-white py-2.5 sm:py-3 rounded font-semibold text-sm hover:bg-[#333333] hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Beli Sekarang
                </button>
              </div>
              <p v-if="currentStock > 0" class="text-xs sm:text-sm text-[#ACACAC] mt-2">
                Sisa Stok: <span class="text-[#1A1919] font-bold">{{ currentStock }}</span>
              </p>

              <!-- Store Location Card -->
              <div class="mt-5 border border-[#E6E9F0] rounded-lg overflow-hidden">
                <div class="px-4 py-3 flex items-center justify-between gap-2">
                  <h3 class="text-base sm:text-lg font-semibold text-[#1A1919]">
                    Pilih Lokasi Pengiriman Toko
                  </h3>
                </div>

                <!-- Stock Info Header -->
                <div class="px-4 pb-3 flex items-center justify-between gap-2 border-b border-[#E6E9F0]">
                  <p class="text-sm text-[#1A1919]">
                    <span class="text-[#808080]">Informasi Stok:</span>
                    <span class="font-semibold ml-1">{{ selectedLocationLabel || "Pilih lokasi" }}</span>
                  </p>
                  <button
                    @click="isLocationModalOpen = true"
                    class="text-sm font-medium text-[#1E1E1E] hover:underline hover:cursor-pointer flex items-center gap-1"
                  >
                    Lihat Lokasi Lainnya
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>

                <!-- Empty state when no location selected -->
                <div
                  v-if="!selectedLocation"
                  class="flex items-start gap-2 text-[#ACACAC] px-4 py-6"
                >
                  <svg width="20" height="20" class="w-5 h-5 sm:w-5 sm:h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19ZM18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.4696 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19Z" stroke="#8A8A8A" stroke-width="1.5" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.05 17H15V6.6C15 6.44087 14.9368 6.28826 14.8243 6.17574C14.7117 6.06321 14.5591 6 14.4 6H1M5.65 17H3.6C3.52121 17 3.44319 16.9845 3.37039 16.9543C3.29759 16.9242 3.23145 16.88 3.17574 16.8243C3.12002 16.7685 3.07583 16.7024 3.04567 16.6296C3.01552 16.5568 3 16.4788 3 16.4V11.5" stroke="#8A8A8A" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 9H6" stroke="#8A8A8A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 9H20.61C20.726 9.00003 20.8395 9.03367 20.9367 9.09685C21.034 9.16003 21.1108 9.25005 21.158 9.356L22.948 13.384C22.9821 13.4605 22.9998 13.5433 23 13.627V16.4C23 16.4788 22.9845 16.5568 22.9543 16.6296C22.9242 16.7024 22.88 16.7685 22.8243 16.8243C22.7685 16.88 22.7024 16.9242 22.6296 16.9543C22.5568 16.9845 22.4788 17 22.4 17H20.5M15 17H16" stroke="#8A8A8A" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <p class="text-sm sm:text-base">
                    Masukkan lokasi pengiriman toko untuk melihat stok dan
                    estimasi biaya.
                  </p>
                </div>

                <!-- Store Stock Grid (shown when location is selected) -->
                <div
                  v-else
                  class="p-3 sm:p-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
                >
                  <div
                    v-for="location in locationOptions"
                    :key="location.value"
                    :class="[
                      'relative p-3 sm:p-4 rounded-md border transition',
                      getStoreStockQty(location) > 0
                        ? 'border-[#E6E9F0] bg-white'
                        : 'border-[#E6E9F0] bg-[#F5F5F5]',
                    ]"
                  >
                    <!-- Bell icon for unavailable stores -->
                    <div
                      v-if="getStoreStockQty(location) <= 0 || location.disabled"
                      class="absolute top-2 right-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.89 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#1E1E1E"/>
                      </svg>
                    </div>
                    <p
                      :class="[
                        'text-sm sm:text-base font-medium mb-1.5 sm:mb-2 pr-5 truncate',
                        getStoreStockQty(location) > 0 && !location.disabled
                          ? 'text-[#1A1919]'
                          : 'text-[#ACACAC]',
                      ]"
                    >
                      {{ location.label }}
                    </p>
                    <p
                      :class="[
                        'text-xs sm:text-sm font-medium',
                        getStoreStatusTextClass(location),
                      ]"
                    >
                      {{ getStoreStatus(location) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="informasi" class="mb-10 scroll-mt-[145px]">
          <h2 class="text-lg font-semibold mb-4">Informasi Produk</h2>
          <div v-if="attributes.length > 0 && !loadingProductAttributes" class="mb-6">
            <ul class="space-y-3">
              <li v-for="attr in attributes" :key="attr.id" class="text-[#1A1919] flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <span class="text-[#7B7B7B] sm:w-36 shrink-0 font-medium">{{ attr.attribute.name }}:</span>
                <span>
                  <template v-if="attr.attribute.slug === 'dimensi-produk'">
                    <span v-for="(val, index) in attr.attribute_values" :key="val.id">{{ val.attribute_value.value }}<span v-if="index < attr.attribute_values.length - 1"> x </span></span> cm
                  </template>
                  <template v-else>
                    <span v-for="(val, index) in attr.attribute_values" :key="val.id">{{ val.attribute_value.value }}<span v-if="index < attr.attribute_values.length - 1">, </span></span>
                  </template>
                </span>
              </li>
            </ul>
          </div>
          <div class="mb-6">
            <div v-if="product.product_information" v-html="product.product_information" class="text-[#1A1919]"></div>
            <p v-else class="text-[#808080]">Informasi produk belum tersedia</p>
          </div>
          <div v-if="product.categories && product.categories.length > 0" class="mb-6">
            <div v-if="mainCategories.length > 0" class="mb-3">
              <p class="text-sm text-[#7B7B7B] mb-2">Kategori</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="cat in mainCategories" :key="cat.id" class="px-3 py-1.5 bg-[#E6E9F0] text-sm text-[#7B7B7B] rounded-lg">{{ cat.category_name || cat.category_id }}</span>
              </div>
            </div>
            <div v-if="subCategories.length > 0">
              <p class="text-sm text-[#7B7B7B] mb-2">Sub Kategori</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="cat in subCategories" :key="cat.id" class="px-3 py-1.5 bg-[#E6E9F0] text-sm text-[#7B7B7B] rounded-lg">{{ cat.category_name || cat.category_id }}</span>
              </div>
            </div>
          </div>
        </section>
        <section id="spesifikasi" class="mb-10 scroll-mt-[145px]">
          <h2 class="text-lg font-semibold mb-4">Spesifikasi</h2>
          <div class="border border-[#E6E9F0] rounded-lg overflow-hidden max-w-xl">
            <table class="table-fixed">
              <tbody>
                <tr v-if="product.sku" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">SKU</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.sku }}</td></tr>
                <tr v-if="product.material" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Material</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.material }}</td></tr>
                <tr v-if="product.finishing" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Finishing</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.finishing }}</td></tr>
                <tr v-if="product.color" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Warna</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.color }}</td></tr>
                <tr v-if="product.weight" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Berat</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.weight }} {{ product.type_weight || 'gram' }}</td></tr>
                <tr v-if="product.size_long || product.size_wide || product.size_tall" class="border-b border-[#E6E9F0]"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Dimensi Produk</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.size_long }} x {{ product.size_wide }} x {{ product.size_tall }} {{ product.type_size || 'cm' }}</td></tr>
                <tr v-if="product.package_long || product.package_wide || product.package_tall"><td class="px-4 py-2.5 text-[#7B7B7B] w-32 sm:w-40 bg-[#F9FAFB] text-sm font-medium whitespace-nowrap">Dimensi Kemasan</td><td class="px-4 py-2.5 text-[#1A1919] text-sm whitespace-nowrap">{{ product.package_long }} x {{ product.package_wide }} x {{ product.package_tall }} cm</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section id="ulasan" class="mb-10 scroll-mt-[145px]">
          <h2 class="text-lg font-semibold mb-4">Ulasan</h2>

          <!-- Rating Summary (always visible) -->
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div class="flex items-start gap-3 sm:gap-4">
              <div class="text-4xl sm:text-5xl font-bold text-[#1A1919] leading-none">
                {{ averageRating.toFixed(1) }}<span class="text-xl sm:text-2xl text-[#808080] font-medium">/5</span>
              </div>
              <div class="space-y-1.5 pt-1">
                <div class="flex items-center gap-0.5">
                  <svg v-for="i in 5" :key="i" width="18" height="18" class="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" :fill="i <= Math.round(averageRating) ? '#FF8A00' : '#FFCC00'" />
                  </svg>
                </div>
                <p class="text-sm text-[#1A1919] font-medium">
                  {{ reviews.length }} Ulasan
                </p>
              </div>
            </div>
            <button
              class="self-start px-5 py-2.5 bg-[#1E1E1E] hover:bg-[#333333] text-white font-medium text-sm rounded-lg transition hover:cursor-pointer"
            >
              Beri Ulasan
            </button>
          </div>

          <!-- Filters and Search -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div class="flex flex-wrap gap-2 sm:gap-2.5">
              <button
                v-for="filter in reviewFilters"
                :key="filter.value"
                @click="handleFilterChange(filter.value)"
                :class="[
                  'flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-sm font-medium transition hover:cursor-pointer',
                  selectedReviewFilter === filter.value
                    ? 'bg-[#F0F0F0] border-[#1E1E1E] text-[#1E1E1E]'
                    : 'border-[#E6E9F0] text-[#808080] hover:border-[#1E1E1E] hover:text-[#1E1E1E]',
                ]"
              >
                <template v-if="filter.value !== 'all'">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" :fill="selectedReviewFilter === filter.value ? '#1E1E1E' : '#C1C1C1'" />
                  </svg>
                  <span>{{ filter.label }} ({{ getRatingCount(parseInt(filter.value)) }})</span>
                </template>
                <template v-else>
                  <span>Semua</span>
                </template>
              </button>
            </div>
            <div class="relative w-full sm:w-64">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#808080]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                v-model="reviewSearchQuery"
                type="text"
                placeholder="Cari Ulasan"
                class="w-full pl-9 pr-3 py-2 border border-[#E6E9F0] rounded-lg text-sm focus:outline-none focus:border-[#1E1E1E] transition"
              />
            </div>
          </div>

          <!-- Reviews List -->
          <div v-if="filteredReviews.length > 0" class="space-y-4">
            <div v-for="review in filteredReviews" :key="review.id" class="border border-[#E6E9F0] py-4 sm:py-5 px-4 sm:px-5 rounded-lg">
              <div class="flex items-start gap-3 sm:gap-4">
                <svg width="44" height="44" class="sm:w-[50px] sm:h-[50px] shrink-0" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M30 5C16.1925 5 5 16.1925 5 30C5 43.8075 16.1925 55 30 55C43.8075 55 55 43.8075 55 30C55 16.1925 45 5 30 5ZM21.25 23.75C21.25 22.6009 21.4763 21.4631 21.9161 20.4015C22.3558 19.3399 23.0003 18.3753 23.8128 17.5628C24.6253 16.7503 25.5899 16.1058 26.6515 15.6661C27.7131 15.2263 28.8509 15 30 15C31.1491 15 32.2869 15.2263 33.3485 15.6661C34.4101 16.1058 35.3747 16.7503 36.1872 17.5628C36.9997 18.3753 37.6442 19.3399 38.084 20.4015C38.5237 21.4631 38.75 22.6009 38.75 23.75C38.75 26.0707 37.8281 28.2963 36.1872 29.9372C34.5463 31.5781 32.3207 32.5 30 32.5C27.6794 32.5 25.4538 31.5781 23.8128 29.9372C22.1719 28.2963 21.25 26.0707 21.25 23.75ZM45.645 42.46C43.773 44.8134 41.3938 46.7137 38.6848 48.0193C35.9759 49.3248 33.0071 50.0019 30 50C26.9929 50.0019 24.0241 49.3248 21.3152 48.0193C18.6062 46.7137 16.227 44.8134 14.355 42.46C18.4075 39.5525 23.9375 37.5 30 37.5C36.0625 37.5 41.5925 39.5525 45.645 42.46Z" fill="#848484" /></svg>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-2 flex-wrap">
                    <div class="flex items-center">
                      <svg v-for="i in 5" :key="i" width="16" height="16" class="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" :fill="i <= review.rating ? '#FFCC00' : '#E6E9F0'" /></svg>
                    </div>
                    <p class="text-sm text-[#1A1919] font-medium">{{ review.user?.name || 'Anonymous' }}</p>
                  </div>
                  <p class="text-sm text-[#848484] mb-2">{{ formatReviewDate(review.created_at) }}</p>
                  <p class="text-sm text-[#1A1919]">{{ review.comment || review.review }}</p>
                  <template v-if="review.galleries && review.galleries.length > 0">
                    <div class="flex gap-2 flex-wrap mt-3">
                      <img v-for="(img, ii) in review.galleries.slice(0, 5)" :key="ii" :src="img" :alt="'Review image ' + (ii + 1)" class="w-16 h-16 object-cover rounded cursor-pointer" @click="openReviewImage(img)" />
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex flex-col items-center justify-center py-12 text-center">
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-3">
              <!-- Speech bubble background - black -->
              <path d="M20 30C20 21.7157 26.7157 15 35 15H125C133.284 15 140 21.7157 140 30V70C140 78.2843 133.284 85 125 85H70L45 105V85H35C26.7157 85 20 78.2843 20 70V30Z" fill="#1E1E1E"/>
              <!-- Star - white -->
              <path d="M80 35L86.7082 49.2705H102.108L89.7002 58.209L96.4084 72.4795L80 63.541L63.5916 72.4795L70.2998 58.209L57.8917 49.2705H73.2918L80 35Z" fill="#FFFFFF"/>
              <!-- Magnifying glass - white with black stroke -->
              <circle cx="115" cy="75" r="20" fill="#FFFFFF" stroke="#1E1E1E" stroke-width="3"/>
              <circle cx="115" cy="75" r="12" fill="#1E1E1E"/>
              <line x1="130" y1="90" x2="145" y2="105" stroke="#1E1E1E" stroke-width="5" stroke-linecap="round"/>
            </svg>
            <p class="text-base sm:text-lg font-semibold text-[#1A1919]">
              Belum ada ulasan
            </p>
          </div>

          <div v-if="totalReviewPages > 1" class="flex items-center justify-center gap-2 mt-6">
            <button :disabled="currentReviewPage <= 1" @click="changeReviewPage(currentReviewPage - 1)" class="px-3 py-1.5 border border-[#E6E9F0] rounded text-sm hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer">Prev</button>
            <template v-for="(page, idx) in displayReviewPages" :key="idx">
              <button v-if="page === '...'" disabled class="px-2 text-sm text-[#808080]">...</button>
              <button v-else @click="changeReviewPage(Number(page))" :class="['px-3 py-1.5 border rounded text-sm transition cursor-pointer', currentReviewPage === Number(page) ? 'bg-black text-white border-black' : 'border-[#E6E9F0] hover:bg-gray-50']">{{ page }}</button>
            </template>
            <button :disabled="currentReviewPage >= totalReviewPages" @click="changeReviewPage(currentReviewPage + 1)" class="px-3 py-1.5 border border-[#E6E9F0] rounded text-sm hover:bg-gray-50 transition disabled:opacity-50 cursor-pointer">Next</button>
          </div>
        </section>
        </div>
        <!-- End Combined Section -->

        <!-- Mungkin kamu suka Section -->
        <div v-if="relatedLoading || relatedProducts.length > 0">
          <h2
            class="text-xl sm:text-2xl font-semibold text-[var(--color-brand-black-soft)] mb-4 sm:mb-6"
          >
            Mungkin kamu suka
          </h2>
          <!-- Loading placeholders -->
          <div
            v-if="relatedLoading && relatedProducts.length === 0"
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
          >
            <div
              v-for="n in 5"
              :key="`related-skeleton-${n}`"
              class="rounded-lg border border-[#E6E9F0] p-3 animate-pulse"
            >
              <div class="aspect-square bg-[#F3F4F6] rounded-md mb-3"></div>
              <div class="h-4 bg-[#F3F4F6] rounded w-4/5 mb-2"></div>
              <div class="h-4 bg-[#F3F4F6] rounded w-2/3"></div>
            </div>
          </div>

          <!-- Products -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
          >
            <NuxtLink
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :to="`/products/${relatedProduct.slug || relatedProduct.id}`"
              class="block"
            >
              <Product
                :name="relatedProduct.name"
                :image="
                  relatedProduct.featured_image?.path ||
                  '/assets/img/products/placeholder.png'
                "
                :finalPrice="
                  relatedProduct.final_price ||
                  relatedProduct.base_price ||
                  0
                "
                :strikePrice="relatedProduct.base_strike_price ?? undefined"
                :rating="relatedProduct.average_rating || 0"
                :reviews="relatedProduct.review_count || 0"
                :discount="relatedProduct.discount_percent ?? 0"
                :newArrival="relatedProduct.is_new_arrival || false"
                size="large"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <!-- Location Modal -->
    <Teleport to="body">
      <div
        v-if="isLocationModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
        @click.self="isLocationModalOpen = false"
      >
        <div class="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-[#E6E9F0]">
            <h3 class="text-lg font-semibold text-[#1A1919]">
              Stok di Lokasi Lainnya
            </h3>
            <button
              @click="isLocationModalOpen = false"
              class="text-[#808080] hover:text-[#1A1919] hover:cursor-pointer transition"
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Product Info -->
          <div class="px-5 py-4 border-b border-[#E6E9F0]">
            <div class="flex items-start gap-3">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-[#F5F5F5] shrink-0">
                <NuxtImg
                  :src="selectedImage || product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                  fit="cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm sm:text-base font-medium text-[#1A1919] line-clamp-2 mb-1.5">
                  {{ product.name }}
                </p>
                <div v-if="selectedVariant?.variant_name" class="inline-block px-2 py-0.5 bg-[#F0F0F0] rounded text-xs text-[#1A1919] mb-1.5">
                  {{ selectedVariant.variant_name }}
                </div>
                <p v-if="product.sku" class="text-xs text-[#808080]">
                  {{ product.sku }}
                </p>
              </div>
            </div>
          </div>

          <!-- Location List -->
          <div class="flex-1 overflow-y-auto">
            <div class="px-5 pt-4 pb-2">
              <h4 class="text-base font-semibold text-[#1A1919]">
                Lokasi Lainnya
              </h4>
            </div>
            <div v-if="locationOptions.length === 0" class="px-5 py-6 text-center text-[#808080] text-sm">
              Tidak ada toko tersedia untuk produk ini
            </div>
            <ul v-else>
              <li
                v-for="location in locationOptions"
                :key="location.value"
                class="border-b border-[#F2F2F2] last:border-b-0"
              >
                <button
                  @click="selectLocationFromModal(location.value)"
                  :disabled="location.disabled && selectedLocation !== location.value"
                  class="w-full px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F9FAFB] transition hover:cursor-pointer disabled:cursor-not-allowed text-left"
                  :class="{ 'opacity-60': location.disabled && selectedLocation !== location.value }"
                >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm sm:text-base font-semibold text-[#1A1919]">
                      {{ location.store?.city || location.label }}
                    </p>
                    <p class="text-xs sm:text-sm text-[#808080] mt-0.5">
                      {{ getStoreStatus(location) === 'Tersedia' ? 'Stok Tersedia' : getStoreStatus(location) === 'Pre-Order' ? 'Stok Pre-Order' : 'Stok Habis' }}
                    </p>
                  </div>
                  <span class="text-sm font-medium text-[#1E1E1E] flex items-center gap-1 shrink-0">
                    Pilih Lokasi
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<script setup lang="ts">
import type { Product } from "~/types/product";

definePageMeta({
  layout: "default",
});

const route = useRoute();
const router = useRouter();
const { showToast } = useToast();
const { getProduct, getRelatedProducts } = useProductApi();
const { getProductAttributes, getTaxoListsByType } = useProductRelationsApi();
const {
  addToCart,
  loadCart,
  togglePopupCart,
  clearSelectionForCheckout,
  setSelectedForCheckout,
} = useCart();

// Loading & Error States
const loadingProduct = ref(false);
const errorProduct = ref<string | null>(null);
const isAddingToCart = ref(false);

const relatedProducts = ref<Product[]>([]);
const relatedLoading = ref(false);
const relatedError = ref<string | null>(null);

const attributes = ref<ApiAttribute[]>([]);
const loadingProductAttributes = ref(false);

const taxonomyMap = ref<Record<number, { name: string; parent: number | null; type: number }>>({});

const loadTaxonomies = async () => {
  try {
    const [type2, type3] = await Promise.all([
      getTaxoListsByType(2),
      getTaxoListsByType(3),
    ]);
    const map: Record<number, { name: string; parent: number | null; type: number }> = {};
    const lists = [
      ...(type2.data?.data?.taxo_lists || []),
      ...(type3.data?.data?.taxo_lists || []),
    ];
    lists.forEach((item: any) => {
      map[item.id] = {
        name: item.taxonomy_name,
        parent: item.parent || null,
        type: item.taxonomy_type,
      };
    });
    taxonomyMap.value = map;
  } catch (err) {
    console.warn("Failed to load taxonomies:", err);
  }
};

const mainCategories = computed(() => {
  return (product.value.categories || []).filter((cat) => {
    const info = taxonomyMap.value[cat.category_id];
    return info && info.parent === null;
  });
});

const subCategories = computed(() => {
  return (product.value.categories || []).filter((cat) => {
    const info = taxonomyMap.value[cat.category_id];
    return info && info.parent !== null;
  });
});

// Buy handler - add to cart and redirect to payment
const handleBuy = async () => {
  // Check if variant is selected (only if product has variants)
  if (dynamicAttributes.value.length > 0 && !selectedVariant.value) {
    showToast("Silakan pilih varian produk terlebih dahulu", "error");
    return;
  }

  // Check if stock is available
  if (currentStock.value === 0) {
    showToast("Stok produk tidak tersedia", "error");
    return;
  }

  // Check if location is selected (if required)
  if (!selectedLocation.value && locationOptions.value.length > 0) {
    showToast("Silakan pilih lokasi pengiriman toko terlebih dahulu", "error");
    return;
  }

  try {
    // Determine variant ID to use
    let variantId: number;

    if (selectedVariant.value) {
      // Use selected variant ID
      variantId = selectedVariant.value.id;
    } else if (allVariants.value.length > 0) {
      // If no variant selected but variants exist, use first available variant
      const firstVariant = allVariants.value.find(
        (v) => v.status === "ACTIVE" && (v.stock || 0) > 0,
      );
      if (!firstVariant) {
        showToast("Tidak ada varian yang tersedia", "error");
        return;
      }
      variantId = firstVariant.id;
    } else {
      showToast("Produk tidak memiliki varian yang valid", "error");
      return;
    }

    const storeId = selectedLocation.value
      ? parseInt(selectedLocation.value)
      : null;

    await addToCart(variantId, quantity.value, null, storeId);
    await loadCart();

    clearSelectionForCheckout();
    setSelectedForCheckout([variantId]);

    router.push("/payment");
  } catch (error) {
    console.error("Error adding to cart:", error);
    showToast(
      "Terjadi kesalahan saat menambahkan produk ke keranjang",
      "error",
    );
  }
};

const handleAddToCart = async () => {
  if (dynamicAttributes.value.length > 0 && !selectedVariant.value) {
    showToast("Silakan pilih varian produk terlebih dahulu", "error");
    return;
  }
  if (currentStock.value === 0) {
    showToast("Stok produk tidak tersedia", "error");
    return;
  }

  if (!selectedLocation.value && locationOptions.value.length > 0) {
    showToast("Silakan pilih lokasi pengiriman toko terlebih dahulu", "error");
    return;
  }

  isAddingToCart.value = true;
  try {
    let variantId: number;

    if (selectedVariant.value) {
      variantId = selectedVariant.value.id;
    } else if (allVariants.value.length > 0) {
      const firstVariant = allVariants.value.find(
        (v) => v.status === "ACTIVE" && (v.stock || 0) > 0,
      );
      if (!firstVariant) {
        showToast("Tidak ada varian yang tersedia", "error");
        return;
      }
      variantId = firstVariant.id;
    } else {
      showToast("Produk tidak memiliki varian yang valid", "error");
      return;
    }
    const storeId = selectedLocation.value
      ? parseInt(selectedLocation.value)
      : null;
    await addToCart(variantId, quantity.value, null, storeId);

    togglePopupCart();
  } catch (error) {
    console.error("Error adding to cart:", error);
    showToast(
      "Terjadi kesalahan saat menambahkan produk ke keranjang",
      "error",
    );
  } finally {
    isAddingToCart.value = false;
  }
};

// Product Data
const product = ref<{
  id: number;
  name: string;
  image: string;
  price: string;
  discountedPrice: string;
  baseStrikePrice?: number | null;
  rating: number;
  reviews: number;
  discount: string | null;
  stock: number;
  description: string;
  slug: string;
  material?: string | null;
  finishing?: string | null;
  color?: string | null;
  weight?: number | null;
  type_weight?: string | null;
  size_long?: number | null;
  size_wide?: number | null;
  size_tall?: number | null;
  type_size?: string | null;
  package_long?: number | null;
  package_wide?: number | null;
  package_tall?: number | null;
  sku?: string | null;
  product_information?: string | null;
  categories?: Array<{
    id: number;
    product_id: number;
    category_id: number;
    category_name?: string | null;
    category_slug?: string | null;
  }>;
}>({
  id: 0,
  name: "",
  image: "/assets/img/products/placeholder.png",
  price: "Rp 0",
  discountedPrice: "Rp 0",
  baseStrikePrice: null,
  rating: 0,
  reviews: 0,
  discount: null,
  stock: 0,
  description: "",
  slug: "",
});

const productImages = ref<string[]>([]);
const selectedImage = ref<string | null | undefined>(null);
const selectedImageIndex = ref(0);
const zoomOrigin = ref<string | null>(null);

const prevImage = () => {
  const len = productImages.value.length
  if (len < 2) return
  selectedImageIndex.value = (selectedImageIndex.value - 1 + len) % len
  selectedImage.value = productImages.value[selectedImageIndex.value]
}

const nextImage = () => {
  const len = productImages.value.length
  if (len < 2) return
  selectedImageIndex.value = (selectedImageIndex.value + 1) % len
  selectedImage.value = productImages.value[selectedImageIndex.value]
}

const onImageZoom = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  zoomOrigin.value = `${x}% ${y}%`
}

// Store all variants for filtering
const allVariants = ref<
  Array<{
    id: number;
    variant_name?: string | null;
    options?: Array<{
      attribute_id: number;
      attribute_name: string;
      attribute_value_id: number;
      attribute_value: string;
    }>;
    price?: number | null;
    strike_price?: number | null;
    final_price?: number | null;
    discount_percent?: number | null;
    stock?: number;
    status?: string;
    is_available?: boolean;
    image_path?: string | null;
    stock_relations?: Array<{
      id?: number;
      variant_id?: number;
      store_id?: number;
      qty?: number;
      reserved_qty?: number;
      store?: {
        id: number;
        name: string;
        code?: string;
      };
    }>;
  }>
>([]);

// Dynamic attributes structure
interface AttributeValue {
  attribute_value_id: number;
  value: string;
  disabled: boolean;
}

interface Attribute {
  attribute_id: number;
  attribute_name: string;
  values: AttributeValue[];
}

interface ApiAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  sort: number;
  attribute: {
    id: number;
    name: string;
    slug: string;
  };
  attribute_values: Array<{
    id: number;
    product_attribute_id: number;
    attribute_value_id: number;
    attribute_value: {
      value: string;
    };
  }>;
}

const dynamicAttributes = ref<Attribute[]>([]);
const selectedAttributeValues = ref<Record<number, number | null>>({}); // attribute_id -> attribute_value_id

// Build dynamic attributes from variants
const buildDynamicAttributes = () => {
  const attributesMap = new Map<
    number,
    {
      attribute_id: number;
      attribute_name: string;
      values: Map<number, AttributeValue>;
    }
  >();

  // Extract all unique attributes and their values from active variants
  allVariants.value.forEach((variant) => {
    if (!variant.options || variant.options.length === 0) return;

    variant.options.forEach((option) => {
      if (!attributesMap.has(option.attribute_id)) {
        attributesMap.set(option.attribute_id, {
          attribute_id: option.attribute_id,
          attribute_name: option.attribute_name,
          values: new Map(),
        });
      }

      const attr = attributesMap.get(option.attribute_id)!;
      if (!attr.values.has(option.attribute_value_id)) {
        attr.values.set(option.attribute_value_id, {
          attribute_value_id: option.attribute_value_id,
          value: option.attribute_value,
          disabled: false, // Will be updated by smart filtering
        });
      }
    });
  });

  // Convert to array structure
  dynamicAttributes.value = Array.from(attributesMap.values()).map((attr) => ({
    attribute_id: attr.attribute_id,
    attribute_name: attr.attribute_name,
    values: Array.from(attr.values.values()),
  }));

  // Initialize selected values
  dynamicAttributes.value.forEach((attr) => {
    if (!(attr.attribute_id in selectedAttributeValues.value)) {
      selectedAttributeValues.value[attr.attribute_id] = null;
    }
  });

  // Update disabled states based on current selections
  updateAttributeAvailability();
};

// Smart filtering: Update which attribute values are available based on current selections
const updateAttributeAvailability = () => {
  // Get currently selected values from OTHER attributes (excluding the attribute we're currently checking)
  const getSelectedValuesFromOtherAttributes = (currentAttributeId: number) => {
    return Object.entries(selectedAttributeValues.value)
      .filter(
        ([attrId, valueId]) =>
          attrId !== currentAttributeId.toString() && valueId !== null,
      )
      .map(([, valueId]) => valueId as number);
  };

  // Update disabled state for each attribute value
  dynamicAttributes.value.forEach((attr) => {
    const currentSelectedValueId =
      selectedAttributeValues.value[attr.attribute_id];
    const selectedFromOtherAttributes = getSelectedValuesFromOtherAttributes(
      attr.attribute_id,
    );

    attr.values.forEach((attrValue) => {
      // A value is currently selected - never disable it (to allow deselection)
      const isSelected =
        currentSelectedValueId === attrValue.attribute_value_id;
      if (isSelected) {
        attrValue.disabled = false;
        return;
      }

      // Check if this value exists in any variant at all (base check)
      const valueExistsInAnyVariant = allVariants.value.some((variant) => {
        if (variant.status !== "ACTIVE") return false;
        const variantValueIds =
          variant.options?.map((opt) => opt.attribute_value_id) || [];
        return variantValueIds.includes(attrValue.attribute_value_id);
      });

      // If value doesn't exist in any variant, disable it
      if (!valueExistsInAnyVariant) {
        attrValue.disabled = true;
        return;
      }

      // If there are selections from other attributes, check compatibility
      // This applies to ALL values (including values in the same attribute)
      if (selectedFromOtherAttributes.length > 0) {
        // Find variants that match current selections from OTHER attributes
        const matchingVariants = allVariants.value.filter((variant) => {
          if (
            variant.status !== "ACTIVE" ||
            !variant.options ||
            variant.options.length === 0
          )
            return false;
          const variantValueIds = variant.options.map(
            (opt) => opt.attribute_value_id,
          );
          // Check if all selected values (from other attributes) are in this variant
          return selectedFromOtherAttributes.every((selectedId) =>
            variantValueIds.includes(selectedId),
          );
        });

        // Check if this value exists in any of the matching variants
        const valueExistsInMatchingVariants = matchingVariants.some(
          (variant) => {
            const variantValueIds =
              variant.options?.map((opt) => opt.attribute_value_id) || [];
            return variantValueIds.includes(attrValue.attribute_value_id);
          },
        );

        // Disable if this value cannot be combined with the selected values from other attributes
        // This applies to both same attribute and other attributes
        attrValue.disabled = !valueExistsInMatchingVariants;
      } else {
        // No selections from other attributes yet - all values are available
        attrValue.disabled = false;
      }
    });
  });
};

// Handle attribute value selection
const selectAttributeValue = (attributeId: number, valueId: number) => {
  // If clicking the same value, deselect it
  if (selectedAttributeValues.value[attributeId] === valueId) {
    selectedAttributeValues.value[attributeId] = null;
  } else {
    selectedAttributeValues.value[attributeId] = valueId;
  }

  // Update availability after selection
  updateAttributeAvailability();
};

// Selected variant based on attribute selections
const selectedVariant = computed(() => {
  const selectedCount = Object.values(selectedAttributeValues.value).filter(
    (v) => v !== null,
  ).length;

  // Only match variant if ALL attributes are selected
  if (selectedCount === 0 || selectedCount !== dynamicAttributes.value.length) {
    return null;
  }

  // Get all selected value IDs
  const selectedValueIds = Object.values(selectedAttributeValues.value).filter(
    (v) => v !== null,
  ) as number[];

  // Find variant that matches ALL selected attribute values
  return allVariants.value.find((variant) => {
    if (
      variant.status !== "ACTIVE" ||
      !variant.options ||
      variant.options.length === 0
    ) {
      return false;
    }

    // Check if variant has exactly all selected attribute values
    const variantAttributeValueIds = variant.options.map(
      (opt) => opt.attribute_value_id,
    );

    // Variant matches if:
    // 1. It has all selected values
    // 2. It has the same number of options as selected values (no extra attributes)
    const hasAllSelected = selectedValueIds.every((selectedId) =>
      variantAttributeValueIds.includes(selectedId),
    );
    const hasSameCount =
      variantAttributeValueIds.length === selectedValueIds.length;

    return hasAllSelected && hasSameCount;
  });
});

const loadRelatedProducts = async () => {
  if (!product.value.slug) return;

  relatedLoading.value = true;
  relatedError.value = null;

  const { data, error } = await getRelatedProducts(product.value.slug, 5);

  if (error) {
    relatedError.value = error.message || "Gagal memuat rekomendasi";
    console.error("Related products error:", error);
  } else if (data?.success && data.data?.products) {
    relatedProducts.value = data.data.products;
  }

  relatedLoading.value = false;
};

// Load product from API
const loadProduct = async () => {
  loadingProduct.value = true;
  errorProduct.value = null;

  try {
    const productSlug = route.params.id as string;

    // Use slug directly
    const { data, error } = await getProduct(productSlug);

    if (error || !data?.success || !data.data?.product) {
      errorProduct.value = error?.message || "Produk tidak ditemukan";
      return;
    }

    const apiProduct: Product = data.data.product;

    // Store all variants with options
    allVariants.value = (apiProduct.variants || [])
      .filter((v: any) => v.status === "ACTIVE") // Only active variants
      .map((v: any) => ({
        id: v.id,
        variant_name: v.variant_name || null,
        options: (v.options || []).map((opt: any) => ({
          attribute_id: opt.attribute_id,
          attribute_name: opt.attribute_name || "Unknown",
          attribute_value_id: opt.attribute_value_id,
          attribute_value: opt.attribute_value || "Unknown",
        })),
        price: v.price || 0,
        strike_price: v.strike_price || null,
        final_price: v.final_price || v.price || 0,
        discount_percent: v.discount_percent || null,
        stock: v.stock || 0,
        status: v.status,
        is_available: v.is_available || false,
        image_path: v.image_path || null,
        stock_relations: v.stock_relations || v.stockRelations || [],
      }));

    // Collect all stores from all variants
    const storesMap = new Map<
      string,
      {
        store: any;
        variants: Set<number>;
      }
    >();

    (apiProduct.variants || []).forEach((variant: any) => {
      const stockRelations = variant.stock_relations || variant.stockRelations || [];

      if (Array.isArray(stockRelations)) {
        stockRelations.forEach((stock: any) => {
          if (stock.store && stock.store.id) {
            const storeId = String(stock.store.id);
            if (!storesMap.has(storeId)) {
              storesMap.set(storeId, {
                store: stock.store,
                variants: new Set([variant.id]),
              });
            } else {
              storesMap.get(storeId)!.variants.add(variant.id);
            }
          }
        });
      }
    });

    allStoresMap.value = storesMap;

    // Initialize locationOptions with all stores (all enabled initially)
    locationOptions.value = Array.from(storesMap.values()).map((item: any) => ({
      value: String(item.store.id),
      label: item.store.name || `Store ${item.store.id}`,
      disabled: false, // Will be updated based on selected variant
      shippingCost: "Rp0",
      estimatedArrival: "Tersedia",
      store: item.store,
    }));

    buildDynamicAttributes();

    const basePrice =
      (apiProduct as any).base_price || (apiProduct as any).price || 0;
    const baseStrikePrice = (apiProduct as any).base_strike_price || null;
    const finalPrice = (apiProduct as any).final_price || basePrice;
    const discountPercent = (apiProduct as any).discount_percent || null;
    const averageRating = (apiProduct as any).average_rating || 0;
    const reviewCount = (apiProduct as any).review_count || 0;
    const totalStock = (apiProduct as any).total_stock || 0;

    // Get images - prioritize featured image
    let images: string[] = [];
    if (apiProduct.images && apiProduct.images.length > 0) {
      images = apiProduct.images.map((img: any) => img.path);
      // Find featured image for initial selection
      const featuredImage = apiProduct.images.find(
        (img: any) => img.is_featured,
      );
      selectedImage.value = featuredImage
        ? featuredImage.path
        : images[0] || null;
    } else {
      selectedImage.value = null;
    }

    // Add variant images to the image list (if they exist and are not duplicates)
    // This should be done AFTER allVariants is set
    if (allVariants.value && allVariants.value.length > 0) {
      allVariants.value.forEach((variant: any) => {
        if (variant.image_path && !images.includes(variant.image_path)) {
          images.push(variant.image_path);
        }
      });
    }

    // Fallback to placeholder if no images
    if (images.length === 0) {
      images = ["/assets/img/products/placeholder.png"];
      selectedImage.value = images[0];
    }

    productImages.value = images;
    selectedImageIndex.value = selectedImage.value
      ? images.indexOf(selectedImage.value)
      : 0;
    if (selectedImageIndex.value < 0) selectedImageIndex.value = 0;

    // Get reviews
    const reviews = (apiProduct as any).reviews || [];

    product.value = {
      id: apiProduct.id,
      name: apiProduct.name,
      slug: apiProduct.slug,
      image: images[0] || "/assets/img/products/placeholder.png",
      price: `Rp ${formatNumber(basePrice)}`,
      discountedPrice: `Rp ${formatNumber(finalPrice)}`,
      rating: averageRating,
      reviews: reviewCount,
      discount: discountPercent || null,
      stock: totalStock,
      description: (apiProduct as any).description || "",
      material: apiProduct.material ?? null,
      finishing: apiProduct.finishing ?? null,
      color: apiProduct.color ?? null,
      weight: apiProduct.weight ?? null,
      type_weight: apiProduct.type_weight ?? null,
      size_long: apiProduct.size_long ?? null,
      size_wide: apiProduct.size_wide ?? null,
      size_tall: apiProduct.size_tall ?? null,
      type_size: apiProduct.type_size ?? null,
      package_long: apiProduct.package_long ?? null,
      package_wide: apiProduct.package_wide ?? null,
      package_tall: apiProduct.package_tall ?? null,
      sku: apiProduct.sku ?? null,
      product_information: apiProduct.product_information ?? null,
      baseStrikePrice: baseStrikePrice ?? null,
      categories: apiProduct.categories || [],
    };
    if (apiProduct?.slug) {
      void loadRelatedProducts();
    }
    if (apiProduct?.id) {
      void loadProductAttributes(apiProduct.id);
    }
    void loadTaxonomies();
    // Update reviews
    updateReviews(reviews);
  } catch (err) {
    console.error("Error loading product:", err);
    errorProduct.value = "Terjadi kesalahan saat memuat produk";
  } finally {
    loadingProduct.value = false;
  }
};

const loadProductAttributes = async (id: number) => {
  try {
    loadingProductAttributes.value = true;
    const { data, error } = await getProductAttributes(id);
    if (error || !data?.success) {
      console.error("Failed to load attributes:", error);
      attributes.value = [];
      loadingProductAttributes.value = false;
    } else if (data.data) {
      attributes.value = data.data as ApiAttribute[];
      loadingProductAttributes.value = false;
    }
  } catch (err) {
    console.error("Error loading attributes:", err);
    attributes.value = [];
  } finally {
    loadingProductAttributes.value = false;
  }
};

// Like button state
const isLiked = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

// Product Detail Tabs
const activeTabId = ref("informasi");
const productDetailTabs = [
  { id: "informasi", label: "Informasi Produk" },
  { id: "spesifikasi", label: "Spesifikasi" },
  { id: "ulasan", label: "Ulasan" },
];

const scrollToSection = (id: string) => {
  activeTabId.value = id
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Track active section on scroll
const onTabScroll = () => {
  const scrollPos = window.scrollY + 200
  let current = productDetailTabs[0]?.id || "informasi"
  for (const tab of productDetailTabs) {
    const section = document.getElementById(tab.id)
    if (section && section.offsetTop <= scrollPos) {
      current = tab.id
    }
  }
  activeTabId.value = current
}

// Existing code continues below

// Options from variants
const colorOptions = ref<
  Array<{
    value: string;
    label: string;
    disabled: boolean;
    image: string | null;
  }>
>([]);

const sizeOptions = ref<
  Array<{
    value: string;
    label: string;
    disabled: boolean;
    image: string | null;
  }>
>([]);

const modelOptions = ref<
  Array<{
    value: string;
    label: string;
    disabled: boolean;
    image: string | null;
  }>
>([]);

// Update variant options from API data
const updateVariantOptions = (
  variants: Array<{
    variant_type?: "COLOR" | "SIZE" | "MODEL" | null;
    variant_value?: string | null;
    image_path?: string | null;
    status?: string;
    stock?: number;
  }>,
) => {
  // Extract unique colors
  const uniqueColors = new Map<
    string,
    { label: string; image: string | null; disabled: boolean }
  >();
  const uniqueSizes = new Map<
    string,
    { label: string; image: string | null; disabled: boolean }
  >();
  const uniqueModels = new Map<
    string,
    { label: string; image: string | null; disabled: boolean }
  >();

  variants.forEach((variant) => {
    // Colors
    if (variant.variant_type === "COLOR" && variant.variant_value) {
      if (!uniqueColors.has(variant.variant_value)) {
        uniqueColors.set(variant.variant_value, {
          label: variant.variant_value,
          image: variant.image_path || null,
          disabled: variant.status !== "ACTIVE" || (variant.stock || 0) === 0,
        });
      }
    }

    // Sizes
    if (variant.variant_type === "SIZE" && variant.variant_value) {
      if (!uniqueSizes.has(variant.variant_value)) {
        uniqueSizes.set(variant.variant_value, {
          label: variant.variant_value,
          image: variant.image_path || null,
          disabled: variant.status !== "ACTIVE" || (variant.stock || 0) === 0,
        });
      }
    }

    // Models
    if (variant.variant_type === "MODEL" && variant.variant_value) {
      if (!uniqueModels.has(variant.variant_value)) {
        uniqueModels.set(variant.variant_value, {
          label: variant.variant_value,
          image: variant.image_path || null,
          disabled: variant.status !== "ACTIVE" || (variant.stock || 0) === 0,
        });
      }
    }
  });

  colorOptions.value = Array.from(uniqueColors.entries()).map(
    ([value, data]) => ({
      value,
      ...data,
    }),
  );

  sizeOptions.value = Array.from(uniqueSizes.entries()).map(
    ([value, data]) => ({
      value,
      ...data,
    }),
  );

  modelOptions.value = Array.from(uniqueModels.entries()).map(
    ([value, data]) => ({
      value,
      ...data,
    }),
  );

  // Set default selections
  if (colorOptions.value.length > 0 && !selectedColor.value) {
    const firstAvailable = colorOptions.value.find((c) => !c.disabled);
    if (firstAvailable) selectedColor.value = firstAvailable.value;
  }
  if (sizeOptions.value.length > 0 && !selectedSize.value) {
    const firstAvailable = sizeOptions.value.find((s) => !s.disabled);
    if (firstAvailable) selectedSize.value = firstAvailable.value;
  }
  if (modelOptions.value.length > 0 && !selectedModel.value) {
    const firstAvailable = modelOptions.value.find((m) => !m.disabled);
    if (firstAvailable) selectedModel.value = firstAvailable.value;
  }
};

const selectedColor = ref<string | null>(null);
const selectedSize = ref<string | null>(null);
const selectedModel = ref<string | null>(null);
const selectedLocation = ref("");
const selectedMarketplace = ref<string | null>(null);
const isLocationOpen = ref(false);
const isLocationModalOpen = ref(false);
const isDetailsExpanded = ref(false);

const locationOptions = ref<
  Array<{
    value: string;
    label: string;
    disabled: boolean;
    shippingCost: string;
    estimatedArrival: string;
    store?: any;
  }>
>([]);

// Store all unique stores from all variants
const allStoresMap = ref<
  Map<
    string,
    {
      store: any;
      variants: Set<number>; // Track which variants have this store
    }
  >
>(new Map());

const marketplaceOptions = ref([
  {
    value: "tokopedia",
    label: "Tokopedia",
    disabled: false,
    image: "/assets/img/icon/tokopedia.png",
  },
  {
    value: "shopee",
    label: "Shopee",
    disabled: false,
    image: "/assets/img/icon/shopee.png",
  },
]);

const selectLocation = (value: string) => {
  const location = locationOptions.value.find((l) => l.value === value);
  if (location && !location.disabled) {
    selectedLocation.value = value;
    isLocationOpen.value = false;

    // Reset quantity if it exceeds the new store's stock
    const newStock = currentStock.value;
    if (quantity.value > newStock) {
      quantity.value = Math.max(1, newStock || 1);
    }
  }
};

const selectLocationFromModal = (value: string) => {
  const location = locationOptions.value.find((l) => l.value === value);
  if (location && !location.disabled) {
    selectedLocation.value = value;
    isLocationModalOpen.value = false;

    // Reset quantity if it exceeds the new store's stock
    const newStock = currentStock.value;
    if (quantity.value > newStock) {
      quantity.value = Math.max(1, newStock || 1);
    }
  }
};

const selectedLocationLabel = computed(() => {
  if (!selectedLocation.value) return "";
  const found = locationOptions.value.find(
    (l) => l.value === selectedLocation.value,
  );
  return found?.label || "";
});

const getStoreStockQty = (location: { store?: any; value: string }): number => {
  if (!location?.store) return 0;

  if (selectedVariant.value?.stock_relations) {
    const relation = selectedVariant.value.stock_relations.find(
      (stock: any) => String(stock.store?.id) === location.value,
    );
    if (relation) {
      return Math.max(
        0,
        (relation.qty || 0) - (relation.reserved_qty || 0),
      );
    }
    return 0;
  }

  let total = 0;
  allVariants.value.forEach((variant) => {
    if (variant.status !== "ACTIVE") return;
    const relation = variant.stock_relations?.find(
      (stock: any) => String(stock.store?.id) === location.value,
    );
    if (relation) {
      total += Math.max(0, (relation.qty || 0) - (relation.reserved_qty || 0));
    }
  });
  return total;
};

const getStoreStatus = (location: {
  store?: any;
  value: string;
  disabled: boolean;
}): string => {
  if (location.disabled) return "Tidak Tersedia";
  const qty = getStoreStockQty(location);
  if (qty <= 0) return "Habis";
  if (qty > 0 && qty < 5) return "Pre-Order";
  return "Tersedia";
};

const getStoreStatusClass = (location: {
  store?: any;
  value: string;
  disabled: boolean;
}): string => {
  if (location.disabled) return "bg-[#F2F2F2] text-[#808080]";
  const qty = getStoreStockQty(location);
  if (qty <= 0) return "bg-[#FDECEA] text-[#E5322B]";
  if (qty > 0 && qty < 5) return "bg-[#FFF5E0] text-[#C77A00]";
  return "bg-[#E6F4EA] text-[#1E8E3E]";
};

const getStoreStatusTextClass = (location: {
  store?: any;
  value: string;
  disabled: boolean;
}): string => {
  if (location.disabled) return "text-[#ACACAC]";
  const qty = getStoreStockQty(location);
  if (qty <= 0) return "text-[#E5322B]";
  if (qty > 0 && qty < 5) return "text-[#C77A00]";
  return "text-[#1E8E3E]";
};

const selectMarketplace = (value: string) => {
  const marketplace = marketplaceOptions.value.find((m) => m.value === value);
  if (marketplace && !marketplace.disabled) {
    selectedMarketplace.value = value;
  }
};

// Quantity
const quantity = ref(1);

const increaseQuantity = () => {
  if (quantity.value < currentStock.value) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Computed price - use variant price if selected, otherwise base price
const currentPrice = computed(() => {
  // If variant is selected, use variant final_price
  if (
    selectedVariant.value &&
    selectedVariant.value.final_price !== null &&
    selectedVariant.value.final_price !== undefined
  ) {
    return selectedVariant.value.final_price;
  }
  // Otherwise use base product price
  return parseInt(product.value.discountedPrice.replace(/[^\d]/g, "")) || 0;
});

// Computed strike price - use variant strike_price if selected, otherwise base product strike_price
const currentStrikePrice = computed(() => {
  // If variant is selected, use variant strike_price
  if (
    selectedVariant.value &&
    selectedVariant.value.strike_price !== null &&
    selectedVariant.value.strike_price !== undefined &&
    selectedVariant.value.strike_price > 0
  ) {
    return selectedVariant.value.strike_price;
  }
  // Otherwise use base product baseStrikePrice if available
  if (
    product.value.baseStrikePrice !== null &&
    product.value.baseStrikePrice !== undefined &&
    product.value.baseStrikePrice > 0
  ) {
    const finalPrice =
      parseInt(product.value.discountedPrice.replace(/[^\d]/g, "")) || 0;
    // Only return if strike price is greater than final price
    return product.value.baseStrikePrice > finalPrice
      ? product.value.baseStrikePrice
      : null;
  }
  // Fallback: use basePrice if it's different from finalPrice
  const basePrice = parseInt(product.value.price.replace(/[^\d]/g, "")) || 0;
  const finalPrice =
    parseInt(product.value.discountedPrice.replace(/[^\d]/g, "")) || 0;
  return basePrice > finalPrice ? basePrice : null;
});

const currentDiscount = computed(() => {
  // If variant is selected, use variant discount_percent
  if (
    selectedVariant.value &&
    selectedVariant.value.discount_percent !== null &&
    selectedVariant.value.discount_percent !== undefined
  ) {
    return Math.round(selectedVariant.value.discount_percent);
  }
  // Otherwise use base product discount
  return product.value.discount;
});

const currentStock = computed(() => {
  if (!selectedVariant.value) {
    return allVariants.value.reduce((total, variant) => {
      if (variant.status !== "ACTIVE") return total;
      const variantTotal =
        variant.stock_relations?.reduce((sum: number, stock: any) => {
          const qty = (stock.qty || 0) - (stock.reserved_qty || 0);
          return sum + Math.max(0, qty);
        }, 0) || 0;
      return total + variantTotal;
    }, 0);
  }

  if (!selectedLocation.value) {
    const variant = selectedVariant.value;
    return (
      variant.stock_relations?.reduce((sum: number, stock: any) => {
        const qty = (stock.qty || 0) - (stock.reserved_qty || 0);
        return sum + Math.max(0, qty);
      }, 0) || 0
    );
  }

  const variant = selectedVariant.value;
  const storeId = selectedLocation.value;

  const stockRelation = variant.stock_relations?.find(
    (stock: any) => String(stock.store?.id) === storeId,
  );

  if (!stockRelation) return 0;

  return Math.max(
    0,
    (stockRelation.qty || 0) - (stockRelation.reserved_qty || 0),
  );
});

// Check if buttons should be disabled
const isButtonDisabled = computed(() => {
  // If product has variants, variant must be selected
  if (dynamicAttributes.value.length > 0 && !selectedVariant.value) {
    return true;
  }

  // If stock is 0, disable buttons
  if (currentStock.value === 0) {
    return true;
  }

  // If location is required but not selected (only if there's at least one available store)
  const hasAvailableStore = locationOptions.value.some((loc) => !loc.disabled);
  if (hasAvailableStore && !selectedLocation.value) {
    return true;
  }

  // If selected location is disabled, disable buttons
  if (selectedLocation.value) {
    const selectedLoc = locationOptions.value.find(
      (loc) => loc.value === selectedLocation.value,
    );
    if (selectedLoc && selectedLoc.disabled) {
      return true;
    }
  }

  return false;
});

const calculateSubtotal = computed(() => {
  return `Rp ${formatNumber(currentPrice.value * quantity.value)}`;
});

// Reviews
const reviewFilters = ref([
  { value: "all", label: "Semua" },
  { value: "5", label: "5" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1" },
]);

const selectedReviewFilter = ref("all");
const reviewSearchQuery = ref("");

const reviews = ref<
  Array<{
    id: number;
    user: { name: string };
    rating: number;
    date: string;
    comment: string;
    created_at?: string;
    galleries?: string[];
    review?: string;
  }>
>([]);

const formatReviewDate = (date?: string) => {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  } catch {
    return date;
  }
};

const openReviewImage = (img: string) => {
  window.open(img, "_blank");
};

const currentReviewPage = ref(1);
const reviewItemsPerPage = ref(10);
const totalReviewPages = computed(() => {
  return Math.ceil(reviews.value.length / reviewItemsPerPage.value);
});
const displayReviewPages = computed<(number | string)[]>(() => {
  const pages: (number | string)[] = [];
  const maxVisiblePages = 5;
  if (totalReviewPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalReviewPages.value; i++) pages.push(i);
  } else {
    if (currentReviewPage.value <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalReviewPages.value);
    } else if (currentReviewPage.value >= totalReviewPages.value - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalReviewPages.value - 3; i <= totalReviewPages.value; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentReviewPage.value - 1; i <= currentReviewPage.value + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalReviewPages.value);
    }
  }
  return pages;
});
const changeReviewPage = (page: number) => {
  if (page >= 1 && page <= totalReviewPages.value) {
    currentReviewPage.value = page;
  }
};

// Update reviews from API data
const updateReviews = (
  apiReviews: Array<{
    id: number;
    user?: { name?: string };
    rating: number;
    review_date?: string;
    comment?: string | null;
  }>,
) => {
  reviews.value = apiReviews.map((review) => ({
    id: review.id,
    user: {
      name: review.user?.name ?? "User",
    },
    rating: review.rating,
    date: review.review_date
      ? new Date(review.review_date).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
      : "",
    comment: review.comment || "",
  }));
};

const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalFilteredReviews = computed(() => {
  if (selectedReviewFilter.value === "all") {
    return reviews.value.length;
  }
  return reviews.value.filter(
    (r) => r.rating === parseInt(selectedReviewFilter.value),
  ).length;
});
const totalReviews = computed(() => totalFilteredReviews.value);

const totalPages = computed(() => {
  return Math.ceil(totalReviews.value / itemsPerPage.value);
});

const filteredReviews = computed(() => {
  let filtered = [];
  if (selectedReviewFilter.value === "all") {
    filtered = reviews.value;
  } else {
    filtered = reviews.value.filter(
      (r) => r.rating === parseInt(selectedReviewFilter.value),
    );
  }

  if (reviewSearchQuery.value.trim()) {
    const query = reviewSearchQuery.value.toLowerCase().trim();
    filtered = filtered.filter((r) => {
      const name = (r.user?.name || "").toLowerCase();
      const comment = (r.comment || "").toLowerCase();
      return name.includes(query) || comment.includes(query);
    });
  }

  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filtered.slice(startIndex, endIndex);
});

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.value.length;
});

const satisfactionPercentage = computed(() => {
  if (reviews.value.length === 0) return 0;
  const satisfiedCount = reviews.value.filter((r) => r.rating >= 4).length;
  return Math.round((satisfiedCount / reviews.value.length) * 100);
});

const getRatingCount = (rating: number) => {
  return reviews.value.filter((r) => r.rating === rating).length;
};

const handleFilterChange = (filterValue: string) => {
  selectedReviewFilter.value = filterValue;
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const getPageNumbers = computed(() => {
  const pages: number[] = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage.value <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(-1);
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      pages.push(1);
      pages.push(-1);
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(-1);
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i);
      }
      pages.push(-1);
      pages.push(totalPages.value);
    }
  }

  return pages;
});

// Watch for variant selection changes to update price/stock/image and location options
watch(
  selectedVariant,
  (newVariant, oldVariant) => {
    // Update main image if variant has image
    if (newVariant?.image_path) {
      selectedImage.value = newVariant.image_path;
      if (!productImages.value.includes(newVariant.image_path)) {
        productImages.value.push(newVariant.image_path);
      }
    } else if (!newVariant && oldVariant) {
      if (productImages.value && productImages.value.length > 0) {
        const firstProductImage = productImages.value.find((img: string) => {
          return !allVariants.value.some((v: any) => v.image_path === img);
        });
        selectedImage.value = firstProductImage || productImages.value[0];
      } else if (product.value?.image) {
        selectedImage.value = product.value.image;
      }
    }

    // Reset quantity if variant stock is less than current quantity
    if (newVariant && quantity.value > (newVariant.stock || 0)) {
      quantity.value = Math.max(1, newVariant.stock || 1);
    }

    // Update location options based on selected variant
    // Show all stores, but disable those not available in selected variant
    if (newVariant && newVariant.stock_relations) {
      const stockRelations = newVariant.stock_relations || [];

      // Create a map of store availability for the selected variant
      const variantStoreAvailability = new Map<
        string,
        {
          availableQty: number;
          isAvailable: boolean;
        }
      >();

      stockRelations.forEach((stock: any) => {
        if (stock.store && stock.store.id) {
          const storeId = String(stock.store.id);
          const availableQty = (stock.qty || 0) - (stock.reserved_qty || 0);

          variantStoreAvailability.set(storeId, {
            availableQty: availableQty,
            isAvailable: availableQty > 0,
          });
        }
      });

      // Update locationOptions: show all stores, but disable unavailable ones
      locationOptions.value = Array.from(allStoresMap.value.values()).map(
        (item: any) => {
          const storeId = String(item.store.id);
          const availability = variantStoreAvailability.get(storeId);

          // If store is not in selected variant's stock_relations, it's disabled
          if (!availability) {
            return {
              value: storeId,
              label: item.store.name || `Store ${item.store.id}`,
              disabled: true,
              shippingCost: "-",
              estimatedArrival: "Tidak Tersedia",
              store: item.store,
            };
          }

          // Store is in variant, check availability
          return {
            value: storeId,
            label: item.store.name || `Store ${item.store.id}`,
            disabled: !availability.isAvailable,
            shippingCost: availability.isAvailable ? "Rp0" : "-",
            estimatedArrival: availability.isAvailable
              ? "Tersedia"
              : "Tidak Tersedia",
            store: item.store,
          };
        },
      );
    } else if (!newVariant) {
      // No variant selected - show all stores but disable all
      locationOptions.value = Array.from(allStoresMap.value.values()).map(
        (item: any) => ({
          value: String(item.store.id),
          label: item.store.name || `Store ${item.store.id}`,
          disabled: true,
          shippingCost: "-",
          estimatedArrival: "Pilih varian terlebih dahulu",
          store: item.store,
        }),
      );
    }

    // Reset selected location when variant changes
    if (newVariant?.id !== oldVariant?.id) {
      selectedLocation.value = "";
    }

    // Reset quantity if it exceeds the new variant's stock
    const newStock = currentStock.value;
    if (quantity.value > newStock) {
      quantity.value = Math.max(1, newStock || 1);
    }
  },
  { immediate: false },
);

// Load product data based on route param
onMounted(async () => {
  await loadProduct();
  window.addEventListener("scroll", onTabScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onTabScroll);
});

const currentUrl = computed(() => route.fullPath);

useHead({
  title: product.value.name,
  meta: [
    {
      name: "description",
      content: product.value.description || "Deskripsi produk default",
    },
    {
      property: "og:title",
      content: product.value.name,
    },
    {
      property: "og:description",
      content: product.value.description,
    },
    {
      property: "og:image",
      content: product.value.image,
    },
    { property: "og:url", content: currentUrl.value },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: product.value.name,
    },
    { name: "twitter:description", content: product.value.description },
    {
      name: "twitter:image",
      content: product.value.image,
    },
  ],
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.value.name,
          image: product.value.image,
          description: product.value.description,
          sku: product.value.sku || "",
          offers: {
            "@type": "Offer",
            url: currentUrl.value,
            priceCurrency: "IDR",
            price: currentPrice.value.toString(),
            availability:
              currentStock.value > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
          },
          aggregateRating:
            reviews.value.length > 0
              ? {
                  "@type": "AggregateRating",
                  ratingValue: averageRating.value.toFixed(1),
                  reviewCount: reviews.value.length,
                }
              : undefined,
          review: reviews.value.slice(0, 5).map((r) => ({
            "@type": "Review",
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
            author: { "@type": "Person", name: r.user.name },
            datePublished: r.date,
            reviewBody: r.comment,
          })),
        },
        null,
        2,
      ),
    },
  ],
});
</script>
