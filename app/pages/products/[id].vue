<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-11 py-6 sm:py-8 md:py-10 flex-1"
      >
        <!-- Loading State -->
        <div v-if="loadingProduct" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9322B]"
          ></div>
          <p class="mt-4 text-[#1A1919] text-base">Memuat produk...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="errorProduct" class="text-center py-12">
          <p class="text-red-500 mb-4">{{ errorProduct }}</p>
          <button
            @click="loadProduct()"
            class="px-4 py-2 bg-[#E9322B] text-white rounded-lg hover:bg-[#d02a24] transition"
          >
            Coba Lagi
          </button>
        </div>

        <!-- Main Product Display -->
        <div
          v-else
          class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12"
        >
          <!-- Product Images -->
          <div>
            <!-- Main Image -->
            <div class="mb-2 sm:mb-2.5">
              <NuxtImg
                :src="selectedImage || product.image"
                :alt="product.name"
                :width="640"
                :height="640"
                class="w-full object-cover rounded-lg sm:rounded-xl aspect-square"
                fit="cover"
              />
            </div>
            <!-- Thumbnails -->
            <div class="flex gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0">
              <button
                v-for="(img, index) in productImages"
                :key="index"
                @click="selectedImage = img"
                :class="[
                  'w-[80px] sm:w-[120px] md:w-[162px] rounded-lg overflow-hidden border-2 transition hover:cursor-pointer shrink-0 aspect-square',
                  selectedImage === img || (!selectedImage && index === 0)
                    ? 'border-[#E9322B]'
                    : 'border-transparent hover:border-[#E6E9F0]',
                ]"
              >
                <NuxtImg
                  :src="img"
                  :alt="`${product.name} ${index + 1}`"
                  :width="162"
                  :height="133"
                  class="w-full h-full object-cover"
                  fit="cover"
                />
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div>
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
                    ? 'border-[#E9322B] bg-[#E9322B14]'
                    : 'border-[#C1C1C1] hover:border-[#E9322B] hover:bg-[#E9322B14]',
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
                    fill="#E9322B"
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
            </div> -->
            </div>

            <!-- Price -->
            <div
              class="flex flex-col gap-1 sm:gap-2 mb-4 sm:mb-5 border-b border-[#E6E9F0] pb-2"
            >
              <!-- Strike Price (Original Price) with Discount Badge -->
              <div
                v-if="currentStrikePrice && currentStrikePrice > currentPrice"
                class="flex items-center gap-2 sm:gap-3"
              >
                <p
                  class="text-base sm:text-lg md:text-xl text-[#808080] line-through"
                >
                  Rp {{ formatNumber(currentStrikePrice) }}
                </p>
                <span
                  v-if="currentDiscount"
                  class="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#E9322B] text-white text-xs sm:text-sm font-semibold rounded"
                >
                  -{{ currentDiscount }}%
                </span>
              </div>
              <!-- Current Price (Discounted Price) -->
              <p
                class="text-2xl sm:text-3xl md:text-[42px] font-semibold text-[#1A1919]"
              >
                Rp {{ formatNumber(currentPrice) }}
              </p>
            </div>

            <!-- Product Detail Section -->
            <div class="mb-6">
              <h3 class="text-lg sm:text-xl font-semibold text-[var(--color-brand-black-soft)] mb-4">
                Informasi Produk
              </h3>
              <!-- Spesifikasi -->
              <div class="mb-6">
                <ul class="space-y-3 list-disc list-inside">
                  <li
                    v-for="attr in attributes"
                    v-if="!loadingProductAttributes"
                    :key="attr.id"
                    class="text-[#1A1919]"
                  >
                    <span class="text-[#7B7B7B]"
                      >{{ attr.attribute.name }}:
                    </span>

                    <template v-if="attr.attribute.slug === 'dimensi-produk'">
                      <!-- Format khusus dimensi -->
                      <span
                        v-for="(val, index) in attr.attribute_values"
                        :key="val.id"
                      >
                        {{ val.attribute_value.value }}
                        <span v-if="index < attr.attribute_values.length - 1">
                          x
                        </span>
                      </span>
                      cm
                    </template>

                    <template v-else>
                      <!-- Default: pisah koma -->
                      <span
                        v-for="(val, index) in attr.attribute_values"
                        :key="val.id"
                      >
                        {{ val.attribute_value.value }}
                        <span v-if="index < attr.attribute_values.length - 1"
                          >,
                        </span>
                      </span>
                    </template>
                  </li>
                </ul>
              </div>

              <!-- Informasi -->
              <div>
                <div
                  v-if="product.product_information"
                  v-html="product.product_information"
                  class="text-[#1A1919]"
                ></div>

                <p v-else class="text-[#808080]">
                  Informasi produk belum tersedia
                </p>
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
                      // Selected state
                      selectedAttributeValues[attribute.attribute_id] ===
                        attrValue.attribute_value_id && !attrValue.disabled
                        ? 'border-[#E9322B] text-[#E9322B] bg-[#E9322B14] hover:cursor-pointer'
                        : '',
                      // Default state (not selected, not disabled)
                      selectedAttributeValues[attribute.attribute_id] !==
                        attrValue.attribute_value_id && !attrValue.disabled
                        ? 'border-[#E6E9F0] text-[#808080] hover:border-[#E9322B] hover:bg-[#E9322B14] hover:cursor-pointer'
                        : '',
                      // Disabled state
                      attrValue.disabled
                        ? 'border-transparent text-[#ACACAC] bg-[#F2F4F7] cursor-not-allowed'
                        : '',
                    ]"
                  >
                    <span>{{ attrValue.value }}</span>
                    <!-- Checkmark indicator -->
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
                        <path d="M9 0L0 9L9 9V0Z" fill="#E9322B" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </template>

            <!-- Store Location Selection -->
            <div class="mb-5 sm:mb-7.5">
              <h3 class="text-base sm:text-lg text-[#1A1919] mb-3 sm:mb-4">
                Pilih Lokasi Pengiriman Toko
              </h3>
              <div class="flex items-center gap-1.5 mb-3">
                <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    class="w-full h-full object-cover"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 19.65C9.87 17.65 6 13.34 6 10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10C18 13.34 14.13 17.66 12 19.65ZM12 6C11.2089 6 10.4355 6.2346 9.77772 6.67412C9.11992 7.11365 8.60723 7.73836 8.30448 8.46927C8.00173 9.20017 7.92252 10.0044 8.07686 10.7804C8.2312 11.5563 8.61216 12.269 9.17157 12.8284C9.73098 13.3878 10.4437 13.7688 11.2196 13.9231C11.9956 14.0775 12.7998 13.9983 13.5307 13.6955C14.2616 13.3928 14.8864 12.8801 15.3259 12.2223C15.7654 11.5645 16 10.7911 16 10C16 8.93913 15.5786 7.92172 14.8284 7.17157C14.0783 6.42143 13.0609 6 12 6ZM12 12C11.6044 12 11.2178 11.8827 10.8889 11.6629C10.56 11.4432 10.3036 11.1308 10.1522 10.7654C10.0009 10.3999 9.96126 9.99778 10.0384 9.60982C10.1156 9.22186 10.3061 8.86549 10.5858 8.58579C10.8655 8.30608 11.2219 8.1156 11.6098 8.03843C11.9978 7.96126 12.3999 8.00087 12.7654 8.15224C13.1308 8.30362 13.4432 8.55996 13.6629 8.88886C13.8827 9.21776 14 9.60444 14 10C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7893 12.5304 12 12 12Z"
                      fill="#8A8A8A"
                    />
                  </svg>
                </div>

                <div class="w-full">
                  <div class="relative flex-1">
                    <button
                      @click="isLocationOpen = !isLocationOpen"
                      class="flex items-center justify-between gap-1.5 sm:gap-2.5 px-2 sm:px-2.5 py-1 sm:py-1.5 border border-[#E6E9F0] rounded-sm bg-white hover:bg-[#F6F9FF] transition hover:cursor-pointer w-full text-sm sm:text-base"
                    >
                      <span
                        :class="{
                          'text-[#292929]':
                            selectedLocation &&
                            !locationOptions.find(
                              (l) => l.value === selectedLocation,
                            )?.disabled,
                          'text-[#ACACAC]':
                            !selectedLocation ||
                            (selectedLocation &&
                              locationOptions.find(
                                (l) => l.value === selectedLocation,
                              )?.disabled),
                        }"
                      >
                        {{
                          selectedLocation
                            ? locationOptions.find(
                                (l) => l.value === selectedLocation,
                              )?.label || "Pilih lokasi"
                            : "Pilih lokasi"
                        }}
                      </span>
                      <div class="sm:w-[30px] sm:h-[30px] shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          :class="[
                            'transition-transform',
                            isLocationOpen ? 'rotate-180' : '',
                          ]"
                        >
                          <path
                            d="M9.2625 10.7375L15 16.4625L20.7375 10.7375L22.5 12.5L15 20L7.5 12.5L9.2625 10.7375Z"
                            fill="#292929"
                          />
                        </svg>
                      </div>
                    </button>

                    <!-- Location Dropdown Menu -->
                    <div
                      v-if="isLocationOpen"
                      class="absolute top-full left-0 right-0 mt-1 py-2.5 bg-white border border-[#E6E9F0] rounded-lg shadow-lg z-10"
                    >
                      <div
                        v-if="locationOptions.length === 0"
                        class="px-2.5 py-2.5 text-[#808080] text-sm"
                      >
                        Tidak ada toko tersedia untuk produk ini
                      </div>
                      <button
                        v-for="location in locationOptions"
                        :key="location.value"
                        @click="
                          !location.disabled && selectLocation(location.value)
                        "
                        :disabled="location.disabled"
                        class="w-full text-left transition first:rounded-t-lg last:rounded-b-lg"
                        :class="{
                          // Selected state
                          'bg-[#F6F9FF] hover:bg-[#F6F9FF] hover:cursor-pointer':
                            selectedLocation === location.value &&
                            !location.disabled,
                          // Default state (not selected, not disabled)
                          'hover:bg-[#F6F9FF] hover:cursor-pointer':
                            selectedLocation !== location.value &&
                            !location.disabled,
                          // Disabled state
                          'opacity-50 cursor-not-allowed': location.disabled,
                        }"
                      >
                        <div
                          class="px-2.5 py-2.5"
                          :class="{
                            'border-l-4 border-[#E9322B]':
                              selectedLocation === location.value &&
                              !location.disabled,
                          }"
                        >
                          <span
                            :class="{
                              'text-[#808080]': location.disabled,
                            }"
                          >
                            {{ location.label }}
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Shipping Info (shown when location is selected) -->
              <div
                v-if="
                  selectedLocation &&
                  locationOptions.find((l) => l.value === selectedLocation)
                "
                class="flex items-center gap-1.5 mt-3"
              >
                <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19ZM18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19Z"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-miterlimit="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.05 17H15V6.6C15 6.44087 14.9368 6.28826 14.8243 6.17574C14.7117 6.06321 14.5591 6 14.4 6H1M5.65 17H3.6C3.52121 17 3.44319 16.9845 3.37039 16.9543C3.29759 16.9242 3.23145 16.88 3.17574 16.8243C3.12002 16.7685 3.07583 16.7024 3.04567 16.6296C3.01552 16.5568 3 16.4788 3 16.4V11.5"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M2 9H6"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 9H20.61C20.726 9.00003 20.8395 9.03367 20.9367 9.09685C21.034 9.16003 21.1108 9.25005 21.158 9.356L22.948 13.384C22.9821 13.4605 22.9998 13.5433 23 13.627V16.4C23 16.4788 22.9845 16.5568 22.9543 16.6296C22.9242 16.7024 22.88 16.7685 22.8243 16.8243C22.7685 16.88 22.7024 16.9242 22.6296 16.9543C22.5568 16.9845 22.4788 17 22.4 17H20.5M15 17H16"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <span class="text-[#1A1919] font-semibold">
                  Stok Tersedia
                </span>
                <span class="text-[#ACACAC]">•</span>
                <span class="text-[#ACACAC]">
                  {{
                    locationOptions.find((l) => l.value === selectedLocation)
                      ?.label || ""
                  }}
                </span>
              </div>
              <div v-else class="text-[#ACACAC] flex items-center gap-1.5">
                <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  <svg
                    width="24"
                    height="24"
                    class="w-full h-full object-cover"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19ZM18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19Z"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-miterlimit="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.05 17H15V6.6C15 6.44087 14.9368 6.28826 14.8243 6.17574C14.7117 6.06321 14.5591 6 14.4 6H1M5.65 17H3.6C3.52121 17 3.44319 16.9845 3.37039 16.9543C3.29759 16.9242 3.23145 16.88 3.17574 16.8243C3.12002 16.7685 3.07583 16.7024 3.04567 16.6296C3.01552 16.5568 3 16.4788 3 16.4V11.5"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M2 9H6"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 9H20.61C20.726 9.00003 20.8395 9.03367 20.9367 9.09685C21.034 9.16003 21.1108 9.25005 21.158 9.356L22.948 13.384C22.9821 13.4605 22.9998 13.5433 23 13.627V16.4C23 16.4788 22.9845 16.5568 22.9543 16.6296C22.9242 16.7024 22.88 16.7685 22.8243 16.8243C22.7685 16.88 22.7024 16.9242 22.6296 16.9543C22.5568 16.9845 22.4788 17 22.4 17H20.5M15 17H16"
                      stroke="#8A8A8A"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <p class="text-sm sm:text-base">
                  Masukkan lokasi pengiriman toko untuk melihat stok dan
                  estimasi biaya.
                </p>
              </div>
            </div>

            <!-- Quantity & Actions -->
            <div>
              <div class="mb-5 sm:mb-7.5">
                <h3 class="text-base sm:text-lg text-[#1A1919] mb-3 sm:mb-4">
                  Atur Jumlah:
                </h3>
                <div
                  class="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 flex-wrap"
                >
                  <div
                    class="flex items-center gap-3 sm:gap-5 border border-[#D9D9D9] rounded-sm py-1.5 sm:py-2 px-2 sm:px-2.5"
                  >
                    <button
                      @click="decreaseQuantity"
                      :disabled="quantity === 1"
                      class="disabled:cursor-not-allowed hover:cursor-pointer"
                    >
                      <svg
                        width="20"
                        height="20"
                        class="sm:w-6 sm:h-6"
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
                        width="20"
                        height="20"
                        class="sm:w-6 sm:h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                          :fill="
                            quantity >= currentStock ? '#C1C1C1' : '#E9322B'
                          "
                        />
                      </svg>
                    </button>
                  </div>
                  <p class="text-sm sm:text-base text-[#ACACAC]">
                    Sisa Stok:
                    <span class="text-[#1A1919] font-bold">{{
                      currentStock
                    }}</span>
                  </p>
                </div>
                <!-- <div
                class="flex mb-5 sm:mb-7.5 gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0"
              >
                <button
                  v-for="marketplace in marketplaceOptions"
                  :key="marketplace.value"
                  @click="
                    !marketplace.disabled &&
                    selectMarketplace(marketplace.value)
                  "
                  :disabled="marketplace.disabled"
                  :class="[
                    'relative p-[5px] border rounded-[3px] font-medium transition overflow-hidden shrink-0',
                    // Selected state
                    selectedMarketplace === marketplace.value &&
                    !marketplace.disabled
                      ? 'border-[#E9322B] text-[#E9322B] bg-[#E9322B14] hover:cursor-pointer'
                      : '',
                    // Default state (not selected, not disabled)
                    selectedMarketplace !== marketplace.value &&
                    !marketplace.disabled
                      ? 'border-[#E6E9F0] text-[#808080] hover:border-[#E9322B] hover:bg-[#E9322B14] hover:cursor-pointer'
                      : '',
                    // Disabled state
                    marketplace.disabled
                      ? 'border-transparent text-[#ACACAC] bg-[#F2F4F7] cursor-not-allowed'
                      : '',
                  ]"
                >
                  <NuxtImg
                    v-if="marketplace.image"
                    :src="marketplace.image"
                    :alt="marketplace.label"
                    width="24"
                    height="24"
                    :class="[
                      'w-6 h-6 object-cover transition',
                      selectedMarketplace === marketplace.value &&
                      !marketplace.disabled
                        ? ''
                        : 'grayscale',
                    ]"
                    fit="cover"
                  />
                  
                  <div
                    v-if="
                      selectedMarketplace === marketplace.value &&
                      !marketplace.disabled
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
                      <path d="M9 0L0 9L9 9V0Z" fill="#E9322B" />
                    </svg>
                  </div>
                </button>
              </div> -->
                <div class="w-full flex justify-between items-center">
                  <p class="text-base sm:text-lg">Subtotal:</p>
                  <span
                    class="text-xl sm:text-2xl md:text-[32px] font-semibold"
                    >{{ calculateSubtotal }}</span
                  >
                </div>
              </div>

              <div class="flex gap-3 sm:gap-5 text-base sm:text-lg">
                <button
                  @click="handleBuy"
                  :disabled="isButtonDisabled"
                  class="flex-1 bg-[#E9322B] text-white py-2.5 rounded-lg font-medium hover:bg-[#D0282B] hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Beli
                </button>
                <button
                  @click="handleAddToCart"
                  :disabled="isButtonDisabled || isAddingToCart"
                  class="flex-1 border-2 border-[#E9322B] text-[#E9322B] py-2.5 rounded-lg font-medium hover:bg-[#F6F9FF] hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isAddingToCart ? "Menambahkan..." : "+ Keranjang" }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Reviews Section -->
        <div class="mb-8 sm:mb-10">
          <div
            v-if="reviews.length > 0"
            class="flex flex-col md:flex-row items-start gap-6 sm:gap-10 md:gap-15 mb-8 sm:mb-12 md:mb-15 border border-[#E6E9F0] px-4 sm:px-8 md:px-15.5 py-6 sm:py-8 rounded-lg"
          >
            <!-- Overall Rating -->
            <div class="space-y-2 sm:space-y-2.5 w-full md:w-82">
              <div class="flex gap-2 sm:gap-2.5 items-center">
                <svg
                  width="40"
                  height="40"
                  class="sm:w-[50px] sm:h-[50px]"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1357 43.7498L15.5212 29.1144L4.16699 19.2707L19.167 17.9686L25.0003 4.1665L30.8337 17.9686L45.8336 19.2707L34.4795 29.1144L37.8649 43.7498L25.0003 35.9894L12.1357 43.7498Z"
                    fill="#FFCC00"
                  />
                </svg>

                <div
                  class="text-3xl sm:text-4xl md:text-[52px] font-semibold text-[#1A1919]"
                >
                  {{ averageRating.toFixed(1) }}/5
                </div>
              </div>
              <p class="text-base sm:text-lg md:text-xl text-[#1A1919]">
                {{ satisfactionPercentage }}% pembeli merasa puas
              </p>
              <p class="text-sm sm:text-base md:text-lg text-[#848484]">
                {{ reviews.length }} Ulasan
              </p>
            </div>

            <!-- Rating Breakdown -->
            <div class="flex-1 w-full md:w-auto">
              <div
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="flex items-center gap-2 sm:gap-3 md:gap-5 mb-2"
              >
                <div class="flex gap-0.5 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.64985 20.63L7.20045 13.9267L2 9.41803L8.87032 8.82164L11.5421 2.5L14.2139 8.82164L21.0842 9.41803L15.8838 13.9267L17.4344 20.63L11.5421 17.0756L5.64985 20.63Z"
                      fill="#FFCC00"
                    />
                  </svg>
                  <span class="text-[#1A1919]">{{ rating }}</span>
                </div>
                <div
                  class="flex-1 h-3 bg-[#E6E9F0] rounded-full overflow-hidden"
                >
                  <div
                    :class="[
                      'h-full rounded-full',
                      getRatingCount(rating) > 0
                        ? 'bg-[#E9322B]'
                        : 'bg-transparent',
                    ]"
                    :style="{
                      width:
                        getRatingCount(rating) > 0
                          ? `${(getRatingCount(rating) / reviews.length) * 100}%`
                          : '0%',
                    }"
                  ></div>
                </div>
                <span class="text-[#C1C1C1] text-right">
                  ({{ getRatingCount(rating) }})
                </span>
              </div>
            </div>
          </div>

          <div v-else-if="!loadingProduct" class="text-center py-8 mb-8">
            <p class="text-[#808080] text-lg">
              Belum ada rating untuk produk ini
            </p>
          </div>

          <!-- Review Filters -->
          <div
            v-if="reviews.length > 0"
            class="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-7.5 overflow-x-auto pb-2 sm:pb-0"
          >
            <button
              v-for="filter in reviewFilters"
              :key="filter.value"
              @click="handleFilterChange(filter.value)"
              :class="[
                'px-4 py-2 rounded-lg font-medium text-sm transition hover:cursor-pointer',
                selectedReviewFilter === filter.value
                  ? 'bg-[#E9322B] text-white'
                  : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
              ]"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Reviews List -->
          <div v-if="filteredReviews.length > 0" class="space-y-4 sm:space-y-5">
            <div
              v-for="review in filteredReviews"
              :key="review.id"
              class="border border-[#E6E9F0] py-4 sm:py-6 md:py-8 px-4 sm:px-5 md:px-6 rounded-lg"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <svg
                  width="50"
                  height="50"
                  class="sm:w-[60px] sm:h-[60px] shrink-0"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 5C16.1925 5 5 16.1925 5 30C5 43.8075 16.1925 55 30 55C43.8075 55 55 43.8075 55 30C55 16.1925 43.8075 5 30 5ZM21.25 23.75C21.25 22.6009 21.4763 21.4631 21.9161 20.4015C22.3558 19.3399 23.0003 18.3753 23.8128 17.5628C24.6253 16.7503 25.5899 16.1058 26.6515 15.6661C27.7131 15.2263 28.8509 15 30 15C31.1491 15 32.2869 15.2263 33.3485 15.6661C34.4101 16.1058 35.3747 16.7503 36.1872 17.5628C36.9997 18.3753 37.6442 19.3399 38.084 20.4015C38.5237 21.4631 38.75 22.6009 38.75 23.75C38.75 26.0707 37.8281 28.2963 36.1872 29.9372C34.5463 31.5781 32.3207 32.5 30 32.5C27.6794 32.5 25.4538 31.5781 23.8128 29.9372C22.1719 28.2963 21.25 26.0707 21.25 23.75ZM45.645 42.46C43.773 44.8134 41.3938 46.7137 38.6848 48.0193C35.9759 49.3248 33.0071 50.0019 30 50C26.9929 50.0019 24.0241 49.3248 21.3152 48.0193C18.6062 46.7137 16.227 44.8134 14.355 42.46C18.4075 39.5525 23.9375 37.5 30 37.5C36.0625 37.5 41.5925 39.5525 45.645 42.46Z"
                    fill="#848484"
                  />
                </svg>
                <div class="flex-1 min-w-0">
                  <div
                    class="flex items-center gap-3 sm:gap-5 mb-2 sm:mb-3 flex-wrap"
                  >
                    <div class="flex items-center">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        width="18"
                        height="18"
                        class="sm:w-6 sm:h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z"
                          :fill="i <= review.rating ? '#FFCC00' : '#E6E9F0'"
                        />
                      </svg>
                    </div>
                    <span class="text-xs sm:text-sm text-[#808080]">{{
                      review.date
                    }}</span>
                  </div>
                  <span
                    class="font-medium text-sm sm:text-base text-[#1A1919] mb-3 sm:mb-5 block"
                    >{{ review.user.name }}</span
                  >
                  <p class="text-sm sm:text-base text-[#1A1919]">
                    {{ review.comment }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- No Reviews Message -->
          <div v-else-if="!loadingProduct" class="text-center py-12">
            <p class="text-[#808080] text-lg">
              Belum ada ulasan untuk produk ini
            </p>
            <p class="text-[#808080] text-sm mt-2">
              Jadilah yang pertama memberikan ulasan!
            </p>
          </div>

          <!-- Review Pagination -->
          <div
            v-if="totalReviews > 0"
            class="flex justify-center items-center gap-4 sm:gap-6 md:gap-9 mt-5 sm:mt-7.5 py-6 sm:py-8 md:py-11"
          >
            <button
              @click="goToPreviousPage"
              :disabled="currentPage === 1"
              :class="[
                'px-2 sm:px-3 transition rounded-sm text-xl sm:text-2xl',
                currentPage === 1
                  ? 'cursor-not-allowed opacity-50'
                  : '  hover:bg-[#F6F9FF] hover:cursor-pointer',
              ]"
            >
              <svg
                width="28"
                height="28"
                class="sm:w-9 sm:h-9"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.115 24.885L16.245 18L23.115 11.115L21 9L12 18L21 27L23.115 24.885Z"
                  fill="#292929"
                />
              </svg>
            </button>
            <template v-for="page in getPageNumbers">
              <button
                v-if="page !== -1"
                :key="`page-${page}`"
                @click="goToPage(page)"
                :class="[
                  'px-2 sm:px-3 transition hover:cursor-pointer rounded-sm text-lg sm:text-xl md:text-2xl',
                  page === currentPage
                    ? ' text-white bg-[#E9322B]'
                    : ' text-[#C1C1C1] hover:bg-[#F6F9FF]',
                ]"
              >
                {{ page }}
              </button>
              <span
                v-else
                :key="`ellipsis-${page}`"
                class="px-1 sm:px-2 text-[#808080]"
              >
                ...
              </span>
            </template>
            <button
              @click="goToNextPage"
              :disabled="currentPage === totalPages"
              :class="[
                'px-2 sm:px-3 transition rounded-sm text-xl sm:text-2xl',
                currentPage === totalPages
                  ? ' cursor-not-allowed opacity-50'
                  : '  hover:bg-[#F6F9FF] hover:cursor-pointer',
              ]"
            >
              <svg
                width="28"
                height="28"
                class="sm:w-9 sm:h-9"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.885 24.885L19.755 18L12.885 11.115L15 9L24 18L15 27L12.885 24.885Z"
                  fill="#292929"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mungkin kamu suka Section -->
        <div v-if="relatedProducts.length > 0">
          <h2
            class="text-xl sm:text-2xl font-semibold text-[var(--color-brand-black-soft)] mb-4 sm:mb-6"
          >
            Mungkin kamu suka
          </h2>
          <!-- Products -->
          <div
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
                  relatedProduct.price ||
                  0
                "
                :strikePrice="relatedProduct.base_strike_price || null"
                :rating="relatedProduct.average_rating || 0"
                :reviews="relatedProduct.review_count || 0"
                :discount="relatedProduct.discount_percent || 0"
                :newArrival="relatedProduct.is_new_arrival || false"
                size="large"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <Footer />
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
const { getProductAttributes } = useProductRelationsApi();
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

const attributes = ref<Attribute[]>([]);
const loadingProductAttributes = ref(false);

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
  slug: "",
});

const productImages = ref<string[]>([]);
const selectedImage = ref<string | null>(null);

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

    allVariants.value.forEach((variant: any) => {
      if (variant.stock_relations && Array.isArray(variant.stock_relations)) {
        variant.stock_relations.forEach((stock: any) => {
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
      discount: discountPercent || null, // Discount percentage from backend (already includes %)
      stock: totalStock,
      material: apiProduct.material,
      finishing: apiProduct.finishing,
      color: apiProduct.color,
      weight: apiProduct.weight,
      type_weight: apiProduct.type_weight,
      size_long: apiProduct.size_long,
      size_wide: apiProduct.size_wide,
      size_tall: apiProduct.size_tall,
      type_size: apiProduct.type_size,
      package_long: apiProduct.package_long,
      package_wide: apiProduct.package_wide,
      package_tall: apiProduct.package_tall,
      sku: apiProduct.sku,
      product_information: apiProduct.product_information,
      baseStrikePrice: baseStrikePrice,
    };
    if (apiProduct?.slug) {
      await loadRelatedProducts();
    }
    if (apiProduct?.id) {
      await loadProductAttributes(apiProduct.id);
    }
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
      attributes.value = data.data;
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

// Tabs
const activeTab = ref<"specification" | "information">(
  "specification",
  "error",
);

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
  { value: "5", label: "5 Bintang" },
  { value: "4", label: "4 Bintang" },
  { value: "3", label: "3 Bintang" },
  { value: "2", label: "2 Bintang" },
  { value: "1", label: "1 Bintang" },
]);

const selectedReviewFilter = ref("all");

const reviews = ref<
  Array<{
    id: number;
    user: { name: string };
    rating: number;
    date: string;
    comment: string;
  }>
>([]);

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
});

const currentUrl = computed(() => route.fullPath);

useHead({
  title: product.value.meta_title || product.value.name,
  meta: [
    {
      name: "description",
      content: product.value.meta_description || "Deskripsi produk default",
    },
    {
      property: "og:title",
      content: product.value.meta_title || product.value.name,
    },
    {
      property: "og:description",
      content: product.value.meta_description,
    },
    {
      property: "og:image",
      content: product.value.image,
    },
    { property: "og:url", content: currentUrl.value },
    { property: "og:type", content: "product" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: product.value.meta_title || product.value.name,
    },
    { name: "twitter:description", content: product.value.meta_description },
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
      children: JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.value.name,
          image: product.value.image,
          description: product.value.meta_description,
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

<style scoped>
/* Additional styles if needed */
</style>
