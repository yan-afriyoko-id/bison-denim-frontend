<template>
  <main class="bg-white">
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-[31px] py-6 sm:py-8 md:py-10 flex-1"
      >
        <!-- Loading State -->
        <div v-if="isLoadingCart" class="text-center py-10">
          <p class="text-sm sm:text-base text-[#7B7B7B]">
            Memuat data pembayaran...
          </p>
        </div>

        <!-- Empty Cart / No selection -->
        <div
          v-else-if="
            !cartData || cartData.cart.length === 0 || checkoutCart.length === 0
          "
          class="text-center py-10 sm:py-16"
        >
          <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-2">
            Keranjang Kosong
          </h2>
          <p class="text-sm sm:text-base text-[#7B7B7B] mb-6">
            {{
              checkoutCart.length === 0 && cartData?.cart?.length
                ? "Tidak ada item dipilih untuk checkout. Silakan pilih item di halaman keranjang."
                : "Silakan tambahkan produk ke keranjang terlebih dahulu"
            }}
          </p>
          <NuxtLink
            to="/cart"
            class="inline-block px-6 py-3 bg-[#E9322B] text-white rounded-lg font-medium hover:bg-[#C4282B] transition cursor-pointer"
          >
            Kembali ke Keranjang
          </NuxtLink>
        </div>

        <!-- Payment Form -->
        <div
          v-else
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-11.5"
        >
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-5 sm:space-y-6 md:space-y-7.5">
            <!-- Alamat Pengiriman Section -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5 overflow-hidden"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Alamat Pengiriman
              </h2>

              <div
                class="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 sm:gap-0"
              >
                <div class="flex-1 min-w-0">
                  <div
                    class="flex items-center gap-2 sm:gap-2.5 mb-1.5 flex-wrap"
                  >
                    <div class="flex items-center gap-1">
                      <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                        <svg
                          class="w-full h-full"
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
                      <span
                        class="text-sm sm:text-base font-semibold text-[#1A1919]"
                        >{{ shippingForm.label_place || "Alamat" }}</span
                      >
                    </div>
                    <span
                      v-if="addresses[selectedAddressIndex]?.isPrimary"
                      class="border text-[#E9322B] text-xs px-2 py-1 rounded"
                    >
                      Utama
                    </span>
                  </div>

                  <div class="mb-1 flex gap-1 items-center flex-wrap">
                    <p class="text-sm sm:text-base text-[#1A1919] font-medium">
                      {{ shippingForm.first_name }}
                      {{ shippingForm.last_name || "" }}
                    </p>
                    <div
                      v-if="shippingForm.phone"
                      class="w-3.5 h-3.5 sm:w-[14px] sm:h-[14px] shrink-0"
                    >
                      <svg
                        class="w-full h-full"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 4.37521C7.36003 4.37521 7.69954 4.44357 8.01855 4.58029C8.33757 4.71701 8.61556 4.90386 8.85254 5.14084C9.08952 5.37782 9.27865 5.65809 9.41992 5.98166C9.5612 6.30523 9.62956 6.64474 9.625 7.00021C9.625 7.3648 9.55664 7.70432 9.41992 8.01877C9.2832 8.33322 9.09635 8.61122 8.85938 8.85275C8.6224 9.09429 8.34212 9.28342 8.01855 9.42014C7.69499 9.55685 7.35547 9.62521 7 9.62521C6.63542 9.62521 6.2959 9.55685 5.98145 9.42014C5.66699 9.28342 5.389 9.09657 5.14746 8.85959C4.90592 8.62261 4.7168 8.34461 4.58008 8.0256C4.44336 7.70659 4.375 7.3648 4.375 7.00021C4.375 6.64019 4.44336 6.30067 4.58008 5.98166C4.7168 5.66265 4.90365 5.38465 5.14062 5.14767C5.3776 4.9107 5.6556 4.72157 5.97461 4.58029C6.29362 4.43902 6.63542 4.37066 7 4.37521Z"
                          fill="#ACACAC"
                        />
                      </svg>
                    </div>

                    <p
                      v-if="shippingForm.phone"
                      class="text-xs sm:text-sm text-[#7B7B7B]"
                    >
                      {{ shippingForm.phone }}
                    </p>
                  </div>
                  <p
                    v-if="shippingForm.address"
                    class="text-xs sm:text-sm text-[#7B7B7B]"
                  >
                    {{ shippingForm.address
                    }}{{ shippingForm.city ? `, ${shippingForm.city}` : ""
                    }}{{
                      shippingForm.province ? `, ${shippingForm.province}` : ""
                    }}{{
                      shippingForm.postal_code
                        ? `, ${shippingForm.postal_code}`
                        : ""
                    }}
                  </p>
                  <p v-else class="text-xs sm:text-sm text-[#7B7B7B]">
                    Belum ada alamat yang dipilih
                  </p>
                </div>

                <button
                  v-if="!isReadonlyMode"
                  @click="openAddressModal"
                  class="text-sm sm:text-base text-[#7B7B7B] bg-[#F8F8F8] px-2 sm:px-2 py-1 rounded-md font-medium hover:underline hover:cursor-pointer whitespace-nowrap shrink-0"
                >
                  Ubah
                </button>
                <span v-else class="text-xs sm:text-sm text-[#7B7B7B] italic"
                  >Tidak dapat diubah</span
                >
              </div>

              <!-- Decorative dashed line pattern -->
              <div class="mt-6 -mx-7.5 -mb-7.5 h-[7px] overflow-hidden flex">
                <svg
                  v-for="i in 100"
                  :key="i"
                  width="43"
                  height="7"
                  viewBox="0 0 43 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="shrink-0"
                >
                  <path
                    d="M10 0H43L33 7H0L10 0Z"
                    :fill="(i - 1) % 2 === 0 ? '#E6E9F0' : '#E9322B'"
                  />
                </svg>
              </div>
            </div>

            <!-- Dikirim dari Toko Section -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Dikirim dari Toko
              </h2>

              <div class="flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5">
                <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 19H6V11H18V19H20V8.35L12 5.15L4 8.35V19ZM2 21V7L12 3L22 7V21H16V13H8V21H2ZM9 21V19H11V21H9ZM11 18V16H13V18H11ZM13 21V19H15V21H13Z"
                      fill="#8A8A8A"
                    />
                  </svg>
                </div>

                <span
                  class="text-sm sm:text-base md:text-lg font-semibold text-[#1A1919]"
                  >{{ storeCityLabel }}</span
                >
              </div>

              <!-- Product Items (readonly: existing order) -->
              <template v-if="isReadonlyMode && existingOrder?.order_items">
                <div
                  v-for="item in existingOrder.order_items"
                  :key="item.id"
                  class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-5"
                >
                  <NuxtImg
                    :src="
                      item.product_image ||
                      '/assets/img/products/placeholder.png'
                    "
                    :alt="item.product_name"
                    width="120"
                    height="120"
                    class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-lg shrink-0"
                    fit="cover"
                  />
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-sm sm:text-base font-medium text-[#1A1919] mb-1"
                    >
                      {{ item.product_name }}
                    </h3>
                    <p
                      v-if="item.variant_description"
                      class="text-xs sm:text-sm text-[#7B7B7B] mb-2 sm:mb-2.5"
                    >
                      {{ item.variant_description }}
                    </p>
                    <p
                      class="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1919]"
                    >
                      {{ formatPrice(item.subtotal) }}
                    </p>
                  </div>
                  <p
                    class="text-base sm:text-lg md:text-xl text-[#1A1919] font-semibold shrink-0"
                  >
                    x{{ item.qty }}
                  </p>
                </div>
              </template>

              <!-- Product Items: per-store grouping with products inside -->
              <template v-else>
                <!-- Store Groups -->
                <div
                  v-for="storeGroup in groupedByStore"
                  :key="`store-${storeGroup.store_id}`"
                  class="border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 mb-4 sm:mb-5"
                >
                  <!-- Store Header -->
                  <div class="mb-4 pb-4 border-b border-[#E6E9F0]">
                    <p class="text-sm font-semibold text-[#7B7B7B]">
                      Toko: {{ storeGroup.store_name }}
                    </p>
                  </div>

                  <!-- Products in Store -->
                  <div
                    v-for="item in storeGroup.items"
                    :key="item.variant_id"
                    class="mb-4 pb-4 border-b border-[#E6E9F0] last:border-0 last:mb-0 last:pb-0"
                  >
                    <!-- Product Item -->
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                      <NuxtImg
                        :src="
                          item.image || '/assets/img/products/placeholder.png'
                        "
                        :alt="item.product_name"
                        width="120"
                        height="120"
                        class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-lg shrink-0"
                        fit="cover"
                      />
                      <div class="flex-1 min-w-0">
                        <h3
                          class="text-sm sm:text-base font-medium text-[#1A1919] mb-1"
                        >
                          {{ item.product_name }}
                        </h3>
                        <p
                          v-if="item.variant_description"
                          class="text-xs sm:text-sm text-[#7B7B7B] mb-2 sm:mb-2.5"
                        >
                          {{ item.variant_description }}
                        </p>
                        <p
                          class="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1919]"
                        >
                          {{ formatPrice(item.sub_total) }}
                        </p>
                        <p
                          class="text-base sm:text-lg text-[#1A1919] font-medium"
                        >
                          x{{ item.qty }}
                        </p>

                        <button
                          type="button"
                          @click="openNoteModal(item)"
                          class="text-xs text-[#E9322B] hover:underline mt-2 hover:cursor-pointer"
                        >
                          {{
                            notePerItem[item.variant_id]
                              ? "Ubah Catatan"
                              : "Tambah Catatan"
                          }}
                        </button>

                        <p
                          v-if="notePerItem[item.variant_id]"
                          class="text-xs text-[#7B7B7B] mt-1 italic"
                        >
                          Catatan: {{ notePerItem[item.variant_id] }}
                        </p>
                      </div>
                    </div>

                    <!-- Proteksi per product (inside each product) -->
                    <div
                      v-if="!isReadonlyMode"
                      class="flex items-center justify-between py-2 px-3 bg-[#F5F5F5] rounded-lg"
                    >
                      <label
                        class="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <input
                          type="checkbox"
                          :checked="protectionPerItem[item.variant_id]"
                          @change="toggleProtectionForItem(item.variant_id)"
                          class="w-4 h-4 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer text-[#E9322B]"
                        />
                        <span class="text-xs sm:text-sm text-[#1A1919]"
                          >Proteksi keamanan</span
                        >
                      </label>
                      <span
                        class="text-xs sm:text-sm font-semibold text-[#1A1919]"
                        >{{
                          formatPrice(
                            (item.purchase_price * globalProtectionPercent) /
                              100,
                          )
                        }}
                        x {{ item.qty }}</span
                      >
                    </div>
                  </div>

                  <!-- Ongkir per store (at bottom of store group) -->
                  <div
                    class="flex items-center justify-between py-3 border-t border-[#E6E9F0] mt-4 pt-4"
                  >
                    <div>
                      <p class="text-xs sm:text-sm text-[#7B7B7B] mb-0.5">
                        Ongkos kirim ({{ storeGroup.items.length }} produk)
                      </p>
                      <p
                        class="text-sm sm:text-base font-semibold text-[#1A1919]"
                      >
                        {{
                          shippingPerStore[
                            storeGroup.store_id ?? "null"
                          ]?.agent?.toUpperCase() || "–"
                        }}
                        {{
                          shippingPerStore[storeGroup.store_id ?? "null"]
                            ?.service || ""
                        }}
                        {{
                          shippingPerStore[storeGroup.store_id ?? "null"]?.agent
                            ? formatPrice(
                                shippingPerStore[storeGroup.store_id ?? "null"]
                                  .cost,
                              )
                            : "Belum dipilih"
                        }}
                      </p>
                      <p
                        v-if="
                          shippingPerStore[storeGroup.store_id ?? 'null']?.etd
                        "
                        class="text-xs text-[#7B7B7B]"
                      >
                        Estimasi
                        {{
                          shippingPerStore[storeGroup.store_id ?? "null"].etd
                        }}
                        hari
                      </p>
                    </div>
                    <button
                      v-if="!isReadonlyMode"
                      type="button"
                      @click="openShippingModalForStore(storeGroup.store_id)"
                      class="text-sm text-[#E9322B] hover:underline font-medium hover:cursor-pointer"
                    >
                      Ubah
                    </button>
                  </div>
                </div>
              </template>

              <!-- Legacy single protection block (hidden when per-card is used) -->
              <div
                v-if="false && !isReadonlyMode"
                class="mb-4 sm:mb-5 p-3 sm:p-4 md:p-5 border border-[#E6E9F0] rounded-lg"
              >
                <label
                  class="flex items-center gap-3 sm:gap-4 md:gap-5 cursor-pointer"
                >
                  <div class="relative shrink-0">
                    <input
                      type="checkbox"
                      v-model="hasProtection"
                      class="w-4 h-4 sm:w-5 sm:h-5 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer opacity-0 absolute"
                    />
                    <div
                      :class="[
                        'w-4 h-4 sm:w-5 sm:h-5 border rounded flex items-center justify-center transition',
                        hasProtection
                          ? 'bg-[#E9322B] border-[#E9322B]'
                          : 'bg-white border-[#C1C1C1]',
                      ]"
                    >
                      <div class="w-2.5 h-2.5 sm:w-3 sm:h-3">
                        <svg
                          v-if="hasProtection"
                          class="w-full h-full"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0"
                  >
                    <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                      <svg
                        class="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_703_7116)">
                          <path
                            d="M12.0002 0C12.2158 0 12.4315 0.046875 12.6283 0.135938L21.4596 3.88125C22.4908 4.31719 23.2596 5.33438 23.2549 6.5625C23.2315 11.2125 21.319 19.7203 13.2424 23.5875C12.4596 23.9625 11.5502 23.9625 10.7674 23.5875C2.68615 19.7203 0.778342 11.2125 0.754904 6.5625C0.750217 5.33438 1.51897 4.31719 2.55022 3.88125L11.3768 0.135938C11.5737 0.046875 11.7846 0 12.0002 0ZM12.0002 3.13125V20.8547C18.469 17.7234 20.208 10.7859 20.2502 6.63281L12.0002 3.13594V3.13125Z"
                            fill="#E9322B"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_703_7116">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <span class="text-sm sm:text-base text-[#1A1919]"
                      >Tambah Proteksi Kerusakan</span
                    >
                  </div>
                  <span
                    class="text-base sm:text-lg ml-auto text-[#1A1919] whitespace-nowrap shrink-0"
                  >
                    Rp159.000
                  </span>
                </label>
              </div>

              <!-- Shipping Info (single row: only in readonly mode; non-readonly uses per-card shipping) -->
              <div
                v-if="isReadonlyMode"
                class="pt-4 sm:pt-5 border-t border-[#E6E9F0] flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0"
              >
                <div class="flex-1 min-w-0">
                  <div
                    class="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2"
                  >
                    <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                      <svg
                        class="w-full h-full"
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

                    <span
                      class="text-sm sm:text-base font-semibold text-[#1A1919]"
                      >{{ courierForm.agent?.toUpperCase() || "Kurir" }}
                      {{ courierForm.service || "" }}
                      {{ formatPrice(courierForm.cost || 0) }}</span
                    >
                  </div>
                  <p
                    v-if="courierForm.etd"
                    class="text-xs sm:text-sm text-[#7B7B7B]"
                  >
                    Estimasi tiba {{ courierForm.etd }} hari.
                  </p>
                  <p v-else class="text-xs sm:text-sm text-[#7B7B7B]">
                    Belum memilih kurir
                  </p>
                </div>
                <button
                  v-if="!isReadonlyMode"
                  @click="openShippingModal"
                  class="text-sm sm:text-base text-[#7B7B7B] bg-[#F8F8F8] px-2 py-1 rounded-md font-medium hover:underline hover:cursor-pointer whitespace-nowrap shrink-0"
                >
                  Ubah
                </button>
                <span v-else class="text-xs sm:text-sm text-[#7B7B7B] italic"
                  >Tidak dapat diubah</span
                >
              </div>
            </div>

            <!-- Voucher Section -->
            <div
              v-if="!isReadonlyMode"
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <div class="space-y-2">
                <div class="flex justify-between items-center mt-5">
                  <h2 class="text-lg font-semibold mb-2">Voucher</h2>
                  <button
                    @click="showVoucherModal = true"
                    class="text-sm sm:text-base text-[#7B7B7B] bg-[#F8F8F8] px-2 sm:px-2 py-1 rounded-md font-medium hover:underline hover:cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {{ selectedVoucher ? "Ubah Voucher" : "Pilih Voucher" }}
                  </button>
                </div>
                <div
                  v-if="voucherError"
                  class="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 mt-2"
                >
                  {{ voucherError }}
                </div>
                <div class="flex gap-2">
                  <input
                    v-model="voucherCode"
                    type="text"
                    placeholder="Masukkan kode voucher"
                    class="bg-white flex-1 border border-[#E6E9F0] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#E6E9F0]"
                  />

                  <button
                    @click="applyVoucherCode"
                    :disabled="isApplyingVoucher || !voucherCode"
                    class="px-4 py-2 rounded bg-red-500 text-white text-sm disabled:bg-gray-300"
                  >
                    Terapkan
                  </button>
                </div>
                <div
                  v-if="selectedVoucher"
                  class="border border-[#E6E9F0] bg-[#FFF7F7] rounded-lg px-4 py-3 text-sm flex flex-col gap-2"
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span
                          class="text-base sm:text-lg font-semibold text-[#1A1919] break-words"
                        >
                          {{ selectedVoucher?.name }}
                        </span>
                        <span
                          class="text-xs sm:text-sm font-semibold text-[#E9322B] bg-[#FFE6E6] border border-[#E9322B] px-2 py-1 rounded"
                        >
                          <span
                            v-if="
                              selectedVoucher?.discount_type === 'PERCENTAGE'
                            "
                          >
                            {{ Number(selectedVoucher?.discount_value) }}%
                          </span>
                          <span v-else>
                            Rp{{
                              Number(
                                selectedVoucher?.discount_value,
                              ).toLocaleString("id-ID")
                            }}
                          </span>
                        </span>
                      </div>
                      <p
                        class="text-xs sm:text-sm text-[#7B7B7B] mt-1 leading-relaxed break-words"
                      >
                        {{ selectedVoucher.description || "" }}
                      </p>
                    </div>
                    <div class="shrink-0">
                      <button
                        @click="removeVoucher"
                        class="text-[#E9322B] hover:underline hover:cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>

                  <div class="flex justify-between items-center mt-1">
                    <span class="text-xs text-[#7B7B7B]">Diskon</span>
                    <span class="text-sm font-semibold text-[#1A1919]">
                      -{{ formatPrice(discountAmount) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Right Column -->
          <div class="lg:col-span-1 space-y-5 sm:space-y-6 md:space-y-7.5">
            <!-- Section Poin -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5 mt-5 lg:hidden block"
            >
              <h2 class="text-lg font-semibold text-[#1A1919] mb-3">
                Gunakan Poin
              </h2>
              <div v-if="userPoint">
                <p class="text-sm text-[#7B7B7B] mb-2">
                  Poin saat ini:
                  <strong class="text-[#1A1919]">{{
                    formatNumber(userPoint.points)
                  }}</strong>
                </p>

                <span
                  v-if="!userPoint.can_use_points"
                  class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border text-[#E9322B] rounded-lg text-xs sm:text-sm"
                >
                  Perlu belanja sebanyak
                  {{
                    formatPrice(
                      Math.ceil(
                        (userPoint.minimum_usable_points - userPoint.points) /
                          userPoint.points_per_million,
                      ) *
                        userPoint.million_threshold -
                        (userPoint.cumulative_total %
                          userPoint.million_threshold),
                    )
                  }}
                  lagi agar poin dapat digunakan
                </span>

                <template v-else>
                  <!-- Checkbox + label -->
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="usePoints"
                      class="w-4 h-4"
                    />
                    <span class="text-sm text-[#1A1919]">
                      Gunakan Poin
                      <!-- Tampilkan maks selalu -->
                      <span class="text-xs text-gray-500">
                        (maks {{ formatPrice(maxPointUsed) }})
                      </span>
                    </span>
                  </label>

                  <!-- Sisa poin selalu tampil selama poin bisa digunakan -->
                  <div class="text-xs text-gray-500 mt-2 ml-6">
                    Sisa poin setelah transaksi:
                    {{ formatPrice(remainingPoint) }}
                  </div>
                </template>
              </div>
            </div>
            <!-- Detail Pembayaran Section -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Detail Pembayaran
              </h2>

              <div class="space-y-1.5 mb-3 sm:mb-4">
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Subtotal</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                    >{{
                      formatPrice(
                        isReadonlyMode && existingOrder
                          ? existingOrder.subtotal
                          : checkoutCalculation?.sub_total || 0,
                      )
                    }}</span
                  >
                </div>
                <div
                  v-if="
                    (isReadonlyMode &&
                      existingOrder &&
                      existingOrder.discount_amount > 0) ||
                    (!isReadonlyMode && discountAmount > 0)
                  "
                  class="flex justify-between text-sm sm:text-base text-red-600"
                >
                  <span>Diskon Voucher</span>
                  <span class="text-base sm:text-lg font-semibold">
                    -{{
                      formatPrice(
                        isReadonlyMode && existingOrder
                          ? existingOrder.discount_amount
                          : discountAmount,
                      )
                    }}
                  </span>
                </div>

                <div
                  v-if="usePoints && maxPointUsed > 0"
                  class="flex justify-between text-sm sm:text-base text-[#E9322B]"
                >
                  <span>Gunakan Poin</span>
                  <span class="text-base sm:text-lg font-semibold">
                    -{{ formatPrice(maxPointUsed) }}
                  </span>
                </div>

                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Ongkos Kirim</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                  >
                    {{
                      formatPrice(
                        isReadonlyMode && existingOrder
                          ? existingOrder.shipping_cost
                          : totalShippingCost,
                      )
                    }}
                  </span>
                </div>
                <div
                  v-if="
                    totalProtectionCost > 0 ||
                    (isReadonlyMode && existingOrder && hasProtection)
                  "
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Proteksi keamanan</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                  >
                    {{
                      formatPrice(
                        isReadonlyMode && existingOrder
                          ? existingOrder.product_protection_amount
                          : totalProtectionCost,
                      )
                    }}
                  </span>
                </div>
              </div>

              <div
                class="border-t border-[#E6E9F0] pt-4 sm:pt-5 mb-5 sm:mb-7.5"
              >
                <div class="flex justify-between items-center">
                  <span class="text-sm sm:text-base text-[#7B7B7B]">
                    Total Tagihan
                  </span>
                  <span
                    class="text-lg sm:text-xl md:text-[22px] font-semibold text-[#1A1919]"
                  >
                    Rp{{ totalBill }}
                  </span>
                </div>
              </div>

              <button
                v-if="!isReadonlyMode"
                @click="handlePayment"
                :disabled="isSubmitting || !canSubmit"
                class="w-full bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-2.5 hover:bg-[#C4282B] transition hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <div
                  v-if="!isSubmitting"
                  class="w-5 h-5 sm:w-[26px] sm:h-[26px] shrink-0"
                >
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 1.0835L21.9018 3.06166C22.1423 3.11514 22.3575 3.24904 22.5117 3.44127C22.6659 3.63349 22.75 3.87256 22.75 4.119V14.9382C22.7499 16.0083 22.4857 17.0618 21.9807 18.0052C21.4757 18.9486 20.7457 19.7527 19.8553 20.3462L13 24.9168L6.14467 20.3462C5.25446 19.7528 4.5245 18.9489 4.01954 18.0056C3.51459 17.0624 3.25026 16.0092 3.25 14.9393V4.119C3.25004 3.87256 3.33411 3.63349 3.48832 3.44127C3.64254 3.24904 3.85768 3.11514 4.09825 3.06166L13 1.0835ZM13 3.30325L5.41667 4.98783V14.9382C5.41668 15.6516 5.59279 16.3539 5.92937 16.9828C6.26594 17.6117 6.75258 18.1479 7.34608 18.5436L13 22.3136L18.6539 18.5436C19.2473 18.148 19.7338 17.612 20.0704 16.9833C20.4069 16.3546 20.5831 15.6525 20.5833 14.9393V4.98783L13 3.30325ZM17.823 8.90733L19.3559 10.4392L12.4616 17.3335L7.865 12.7369L9.39683 11.2051L12.4605 14.2687L17.823 8.90733Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span v-if="isSubmitting">Memproses...</span>
                <span v-else>Bayar Sekarang</span>
              </button>
              <button
                v-else-if="orderIdFromQuery && existingOrder"
                @click="payWithMidtrans(orderIdFromQuery)"
                :disabled="isSubmitting"
                class="w-full bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-2.5 hover:bg-[#C4282B] transition hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <div
                  v-if="!isSubmitting"
                  class="w-5 h-5 sm:w-[26px] sm:h-[26px] shrink-0"
                >
                  <svg
                    class="w-full h-full"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 1.0835L21.9018 3.06166C22.1423 3.11514 22.3575 3.24904 22.5117 3.44127C22.6659 3.63349 22.75 3.87256 22.75 4.119V14.9382C22.7499 16.0083 22.4857 17.0618 21.9807 18.0052C21.4757 18.9486 20.7457 19.7527 19.8553 20.3462L13 24.9168L6.14467 20.3462C5.25446 19.7528 4.5245 18.9489 4.01954 18.0056C3.51459 17.0624 3.25026 16.0092 3.25 14.9393V4.119C3.25004 3.87256 3.33411 3.63349 3.48832 3.44127C3.64254 3.24904 3.85768 3.11514 4.09825 3.06166L13 1.0835ZM13 3.30325L5.41667 4.98783V14.9382C5.41668 15.6516 5.59279 16.3539 5.92937 16.9828C6.26594 17.6117 6.75258 18.1479 7.34608 18.5436L13 22.3136L18.6539 18.5436C19.2473 18.148 19.7338 17.612 20.0704 16.9833C20.4069 16.3546 20.5831 15.6525 20.5833 14.9393V4.98783L13 3.30325ZM17.823 8.90733L19.3559 10.4392L12.4616 17.3335L7.865 12.7369L9.39683 11.2051L12.4605 14.2687L17.823 8.90733Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span v-if="isSubmitting">Memproses...</span>
                <span v-else>Bayar Sekarang</span>
              </button>
              <NuxtLink
                to="/cart"
                class="w-full bg-white text-[#E9322B] py-2 sm:py-2.5 rounded-lg font-medium text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-2.5 hover:bg-[#E9322B] hover:text-white transition hover:cursor-pointer mt-2"
              >
                Kembali ke Keranjang
              </NuxtLink>
            </div>
            <div
              v-if="errorMessage"
              class="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {{ errorMessage }}
            </div>
            <!-- Section Poin -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5 mt-5 hidden lg:block"
            >
              <h2 class="text-lg font-semibold text-[#1A1919] mb-3">
                Gunakan Poin
              </h2>
              <div v-if="userPoint">
                <p class="text-sm text-[#7B7B7B] mb-2">
                  Poin saat ini:
                  <strong class="text-[#1A1919]">{{
                    formatNumber(userPoint.points)
                  }}</strong>
                </p>

                <span
                  v-if="!userPoint.can_use_points"
                  class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border text-[#E9322B] rounded-lg text-xs sm:text-sm"
                >
                  Perlu belanja sebanyak
                  {{
                    formatPrice(
                      Math.ceil(
                        (userPoint.minimum_usable_points - userPoint.points) /
                          userPoint.points_per_million,
                      ) *
                        userPoint.million_threshold -
                        (userPoint.cumulative_total %
                          userPoint.million_threshold),
                    )
                  }}
                  lagi agar poin dapat digunakan
                </span>

                <template v-else>
                  <!-- Checkbox + label -->
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="usePoints"
                      class="w-4 h-4"
                    />
                    <span class="text-sm text-[#1A1919]">
                      Gunakan Poin
                      <!-- Tampilkan maks selalu -->
                      <span class="text-xs text-gray-500">
                        (maks {{ formatPrice(maxPointUsed) }})
                      </span>
                    </span>
                  </label>

                  <!-- Sisa poin selalu tampil selama poin bisa digunakan -->
                  <div class="text-xs text-gray-500 mt-2 ml-6">
                    Sisa poin setelah transaksi:
                    {{ formatPrice(remainingPoint) }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <div
      v-if="showVoucherModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
      @click.self="showVoucherModal = false"
    >
      <div
        class="bg-white rounded-[10px] w-full max-w-[766px] max-h-[90vh] overflow-y-auto px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-4 sm:mb-5">
          <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
            Pilih Voucher
          </h2>
          <button
            @click="showVoucherModal = false"
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full transition hover:cursor-pointer shrink-0"
          >
            <div class="w-5 h-5 sm:w-6 sm:h-6">
              <svg
                class="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="black"
                />
              </svg>
            </div>
          </button>
        </div>

        <!-- Konten Voucher -->
        <div class="space-y-4 sm:space-y-5">
          <!-- Error -->
          <div
            v-if="voucherError"
            class="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {{ voucherError }}
          </div>

          <!-- Loading (opsional, kalau fetch vouchers async) -->
          <div v-if="isApplyingVoucher" class="text-center py-8">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9322B]"
            ></div>
            <p class="mt-3 text-sm text-[#7B7B7B]">Memuat voucher...</p>
          </div>

          <!-- No voucher -->
          <div
            v-else-if="vouchers.length === 0 && !isApplyingVoucher"
            class="text-center py-8 text-sm text-[#7B7B7B]"
          >
            Tidak ada voucher yang tersedia
          </div>

          <!-- List Voucher -->
          <div v-else class="space-y-3">
            <div
              v-for="voucher in vouchers"
              :key="voucher.id"
              @click="selectVoucherFromList(voucher)"
              class="flex items-start gap-3 p-3 sm:p-4 border rounded-md cursor-pointer hover:border-[#E9322B] hover:bg-[#E9322B14] transition"
              :class="{
                'border-[#E9322B] bg-[#E9322B14]':
                  selectedVoucher?.id === voucher.id,
                'border-[#E6E9F0]': selectedVoucher?.id !== voucher.id,
              }"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2 mb-1">
                  <div class="flex items-center gap-2">
                    <span
                      class="text-sm sm:text-base font-semibold text-[#1A1919]"
                    >
                      {{ voucher.name }}
                    </span>
                    <span
                      class="text-xs font-semibold text-[#E9322B] bg-[#FFE6E6] border border-[#E9322B] px-2 py-1 rounded"
                    >
                      <span v-if="voucher.discount_type === 'PERCENTAGE'">
                        {{ Number(voucher.discount_value) }}%
                      </span>
                      <span v-else>
                        Rp{{
                          Number(voucher.discount_value).toLocaleString("id-ID")
                        }}
                      </span>
                    </span>
                  </div>
                  <span
                    v-if="selectedVoucher?.id === voucher.id"
                    class="text-[#E9322B] text-sm font-medium whitespace-nowrap"
                  >
                    Dipilih
                  </span>
                </div>

                <p class="text-xs sm:text-sm text-[#7B7B7B]">
                  {{ voucher.description }}
                </p>

                <p
                  v-if="voucher.min_purchase"
                  class="text-xs text-[#7B7B7B] mt-1"
                >
                  Min. belanja Rp{{
                    Number(voucher.min_purchase).toLocaleString("id-ID")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Shipping Option Modal (single item when editing one product's shipping) -->
    <ShippingModal
      v-model="showShippingModal"
      :shippingCosts="currentStoreShippingOptions"
      :loadingShippingCost="isFetchingShipping"
      :shippingError="shippingError"
      :storeKey="editingShippingStoreId"
      @update:courier="updateCourierFromModal"
    />

    <!-- Address Selection Modal -->
    <AddressSelectionModal
      v-model="showAddressModal"
      :addresses="addresses"
      :selectedIndex="selectedAddressIndex"
      @update:selectedIndex="selectedAddressIndex = $event"
      @select="selectAddress"
      @edit="openEditAddressModal"
      @delete="openDeleteConfirmModal"
      @add="openNewAddressModal"
    />

    <!-- Delete Address Confirmation Modal -->
    <ConfirmModal
      v-model="showDeleteConfirmModal"
      title="Hapus Alamat?"
      message="Kamu akan menghapus alamat pengiriman ini."
      confirmText="Hapus"
      @confirm="confirmDeleteAddress"
    />

    <!-- New/Edit Address Modal -->
    <AddressModal
      ref="addressModalRef"
      v-model="showNewAddressModal"
      :editingAddress="editingAddress"
      @save="handleSaveAddress"
    />

    <div
      v-if="showNoteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      @click.self="showNoteModal = false"
    >
      <div class="bg-white rounded-[10px] w-full max-w-md p-6" @click.stop>
        <h2 class="text-lg font-semibold mb-4">Catatan untuk Produk</h2>

        <textarea
          v-model="noteDraft"
          rows="4"
          class="w-full border border-[#E6E9F0] rounded p-3 text-sm focus:outline-none"
          placeholder="Tulis catatan untuk produk ini..."
        ></textarea>

        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="showNoteModal = false"
            class="px-4 py-2 text-sm border rounded hover:cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="saveNote"
            class="px-4 py-2 text-sm bg-[#E9322B] text-white rounded hover:cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type {
  ShippingAddress,
  BillingAddress,
  CourierInfo,
  CheckoutPayload,
} from "~/types/checkout";
import type { CartItemResponse } from "~/types/cart";
import { useOrder } from "~/composables/useOrder";
import { useVoucher } from "~/composables/useVoucherApi";
import { usePointApi } from "~/composables/usePointApi";
import { useConfigApi } from "~/composables/useConfigApi";
import type { Voucher } from "~/types/voucher";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

const route = useRoute();
const {
  cartData,
  loadCart,
  clearCart,
  addToCart,
  removeFromCart,
  checkoutCart,
  checkoutCalculation,
  selectAllForCheckout,
} = useCart();
const { createOrder, updateOrderPaymentStatus } = useCheckoutApi();
const { user } = useAuth();
const {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} = useShippingAddressApi();
const { fetchOrder } = useOrder();
const { getShippingCost } = useShippingApi();
const { getPoints } = usePointApi();
const { getPublicConfig } = useConfigApi();

const { getSnapToken, createPaymentGroup } = usePaymentApi();

const isLoadingCart = ref(true);
const isLoadingAddresses = ref(false);
const isLoadingOrder = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

const isFetchingShipping = ref(false);
const shippingError = ref<string | null>(null);
const editingShippingStoreId = ref<number | string | null>(null);
const showVoucherModal = ref(false);
const showShippingModal = ref(false);

const {
  fetchApplicableVouchers,
  selectedVoucher,
  validateVoucherCode,
  discountAmount,
  errorVoucher,
  vouchers,
} = useVoucher();

// Check if there's an orderId in query params
const orderIdFromQuery = computed(() => {
  const orderId = route.query.orderId || route.query.order_id;
  return orderId ? parseInt(orderId as string) : null;
});

const existingOrder = ref<any>(null);

const isReadonlyMode = computed(() => {
  if (
    existingOrder.value &&
    existingOrder.value.payment?.snap_token &&
    existingOrder.value.status === "PENDING"
  ) {
    return true;
  }
  return route.query.readonly === "true";
});

const hasProtection = ref(false);
const shippingPerStore = ref<
  Record<
    number | string,
    {
      agent: string;
      service: string;
      service_desc: string;
      etd: string;
      cost: number;
      options?: Array<any>;
    }
  >
>({});
const protectionPerItem = ref<Record<number, boolean>>({});
const selectedShippingOption = ref("kargo");
const showAddressModal = ref(false);
const showDeleteConfirmModal = ref(false);
const showNewAddressModal = ref(false);
const selectedAddressIndex = ref(0);
const addressToDeleteIndex = ref<number | null>(null);
const editingAddress = ref<any>(null);
const addressModalRef = ref<any>(null);
const voucherCode = ref("");
const isApplyingVoucher = ref(false);
const voucherError = ref<string | null>(null);
const userPoint = ref<UserPoint | null>(null);
const usePoints = ref(false);
const globalProtectionPercent = ref<number>(0);
const showNoteModal = ref(false);
const currentNoteVariantId = ref<number | null>(null);
const noteDraft = ref("");
const notePerItem = ref<Record<number, string>>({});
// Shipping form data
const shippingForm = ref<
  ShippingAddress & {
    province_id?: number | null;
    city_id?: number | null;
    district_id?: number | null;
    sub_district_id?: number | null;
  }
>({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postal_code: "",
  label_place: "",
  note_address: "",
  province_id: null,
  city_id: null,
  district_id: null,
  sub_district_id: null,
});

// Interface for store-grouped items
interface StoreGroup {
  store_id: number | null;
  store_name: string;
  items: CartItemResponse[];
  shippingInfo?: CourierInfo;
  totalWeight: number;
  subtotal: number;
}

// Courier form data
const courierForm = ref<CourierInfo>({
  agent: "jne",
  service: "REG",
  service_desc: "Reguler",
  etd: "2-3",
  cost: 0,
});

// Address list (from API)
const addresses = ref<
  Array<{
    id?: number;
    label: string;
    name: string;
    phone: string;
    fullAddress: string;
    isPrimary: boolean;
  }>
>([]);

// Load addresses from API
const loadAddresses = async () => {
  isLoadingAddresses.value = true;
  const { data, error } = await getAddresses();

  if (error || !data?.success) {
    console.error("Error loading addresses:", error);
    addresses.value = [];
    isLoadingAddresses.value = false;
    return;
  }

  // Transform API response to format expected by UI
  addresses.value = data.data.map((addr) => ({
    id: addr.id,
    label: addr.label_place || "Alamat",
    name: `${addr.first_name} ${addr.last_name || ""}`.trim(),
    phone: addr.phone,
    fullAddress: `${addr.address}, ${addr.city}, ${addr.province}, ${addr.postal_code}`,
    isPrimary: addr.is_primary,
    // Location IDs and Labels from RajaOngkir
    province_id: addr.province_id || null,
    province_label: addr.province_label || addr.province || null,
    city_id: addr.city_id || null,
    city_label: addr.city_label || addr.city || null,
    district_id: addr.district_id || null,
    district_label: addr.district_label || null,
    sub_district_id: addr.sub_district_id || null,
    sub_district_label: addr.sub_district_label || null,
  }));

  // Select primary address if available
  const primaryIndex = addresses.value.findIndex((addr) => addr.isPrimary);
  if (primaryIndex >= 0) {
    selectedAddressIndex.value = primaryIndex;
    updateShippingFormFromAddress(primaryIndex);
  } else if (addresses.value.length > 0) {
    selectedAddressIndex.value = 0;
    updateShippingFormFromAddress(0);
  }

  isLoadingAddresses.value = false;
};

const loadUserPoints = async () => {
  const { data, error } = await getPoints();

  if (error || !data?.success) {
    console.error("Failed to load user points:", error);
    userPoint.value = null;
    return;
  }

  userPoint.value = data.data;
};

const loadProtectionPercent = async () => {
  const { data, error } = await getPublicConfig("product_protection");

  if (!error && data?.data?.value) {
    globalProtectionPercent.value = Number(data.data.value);
  }
};

const loadMidtransSnap = async () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const config = await $fetch(`${apiBase}/payment/midtrans/config`);

  if (!config.client_key) {
    throw new Error("Midtrans client key not configured");
  }

  const snapUrl = config.is_production
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

  return new Promise<void>((resolve, reject) => {
    if ((window as any).snap) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", config.client_key);

    script.onload = () => resolve();
    script.onerror = () => reject("Failed to load Midtrans Snap");

    document.body.appendChild(script);
  });
};

// Load order data if orderId is provided
const loadOrderData = async (orderId: number) => {
  isLoadingOrder.value = true;
  try {
    const result = await fetchOrder(orderId);

    if (result.success && result.data) {
      const order = result.data;
      existingOrder.value = order;

      const hasSnapToken =
        order.payment?.snap_token && order.status === "PENDING";

      // Pre-fill shipping form from order
      if (order.shipping) {
        shippingForm.value.first_name = order.shipping.first_name || "";
        shippingForm.value.last_name = order.shipping.last_name || "";
        shippingForm.value.email = order.contact_email || "";
        shippingForm.value.phone = order.contact_phone || "";
        shippingForm.value.address = order.shipping.address || "";
        shippingForm.value.city = order.shipping.city || "";
        shippingForm.value.province = order.shipping.province || "";
        shippingForm.value.postal_code = order.shipping.postal_code || "";
        shippingForm.value.label_place = order.shipping.label_place || "";
        shippingForm.value.note_address = order.shipping.note_address || "";
      }

      // Pre-fill courier info
      if (order.courier) {
        courierForm.value.agent = order.courier.agent || "jne";
        courierForm.value.service = order.courier.service || "REG";
        courierForm.value.service_desc =
          order.courier.service_desc || "Reguler";
        courierForm.value.etd = order.courier.estimate_delivered || "2-3";
        courierForm.value.cost = order.courier.cost || 0;
      }

      if (hasSnapToken) {
        isLoadingOrder.value = false;
        await payWithMidtrans(orderId);
        return;
      }

      if (!hasSnapToken && order.order_items && order.order_items.length > 0) {
        // Add each order item to cart
        for (const item of order.order_items) {
          if (item.variant_id) {
            await addToCart(item.variant_id, item.qty, item.note || null);
          }
        }

        await loadCart();
      }
    }
  } catch (error) {
    console.error("Error loading order data:", error);
    errorMessage.value = "Gagal memuat data pesanan";
  } finally {
    isLoadingOrder.value = false;
  }
};

const applyVoucherCode = async () => {
  if (!cartData.value || checkoutCart.value.length === 0) {
    voucherError.value = "Tidak ada item dipilih untuk checkout";
    return;
  }

  if (!voucherCode.value) return;

  try {
    isApplyingVoucher.value = true;
    voucherError.value = null;

    const success = await validateVoucherCode(voucherCode.value);

    if (!success) {
      voucherError.value = errorVoucher.value;
      return;
    }

    voucherCode.value = "";
  } catch {
    voucherError.value = errorVoucher.value;
  } finally {
    isApplyingVoucher.value = false;
  }
};

const selectVoucherFromList = async (voucher: Voucher) => {
  if (!cartData.value || checkoutCart.value.length === 0) {
    voucherError.value = "Tidak ada item dipilih untuk checkout";
    return;
  }

  try {
    isApplyingVoucher.value = true;
    voucherError.value = null;
    voucherCode.value = "";

    const res: any = await validateVoucherCode(voucher.code);

    if (!res) {
      voucherError.value = errorVoucher.value;
      return;
    }
  } catch (err: any) {
    voucherError.value = errorVoucher.value;
    selectedVoucher.value = null;
  } finally {
    showVoucherModal.value = false;
    isApplyingVoucher.value = false;
  }
};

const removeVoucher = () => {
  selectedVoucher.value = null;
  discountAmount.value = 0;
  voucherError.value = null;
};

onMounted(async () => {
  if (orderIdFromQuery.value) {
    await loadOrderData(orderIdFromQuery.value);
    if (isReadonlyMode.value) {
      isLoadingCart.value = false;
      return;
    }
  }

  await loadCart();
  isLoadingCart.value = false;

  if (cartData.value?.cart?.length && checkoutCart.value.length === 0) {
    selectAllForCheckout();
  }

  if (user.value && !orderIdFromQuery.value) {
    shippingForm.value.email = user.value.email || "";
    const nameParts = (user.value.name || "").split(" ");
    shippingForm.value.first_name = nameParts[0] || "";
    shippingForm.value.last_name = nameParts.slice(1).join(" ") || "";
    shippingForm.value.phone = user.value.phone || "";
  }
  if (!isReadonlyMode.value) {
    await loadAddresses();
  }

  if (user.value) {
    await loadUserPoints();
  }

  await loadProtectionPercent();
  await fetchApplicableVouchers();
});
watch(
  () => shippingForm.value.city_id,
  async (newCity, oldCity) => {
    if (newCity && newCity !== oldCity) {
      await fetchShippingCostPerStore();
    }
  },
);
watch(showShippingModal, (open) => {
  if (!open) editingShippingStoreId.value = null;
});

const openShippingModal = async () => {
  editingShippingStoreId.value = null;
  try {
    await fetchShippingCostPerStore();
  } catch (err) {
    console.error("Failed to fetch shipping costs before opening modal:", err);
  }
  showShippingModal.value = true;
};

const openAddressModal = () => {
  showAddressModal.value = true;
};

const openNewAddressModal = () => {
  editingAddress.value = null;
  showNewAddressModal.value = true;
};

const openEditAddressModal = async (index: number) => {
  const address = addresses.value[index];
  if (!address) return;

  if (address.id) {
    // Load full address data from API
    const fullAddress = await loadAddressForEdit(address.id);
    if (fullAddress) {
      editingAddress.value = {
        id: address.id,
        label: fullAddress.label_place || address.label,
        name: `${fullAddress.first_name} ${fullAddress.last_name || ""}`.trim(),
        phone: fullAddress.phone,
        fullAddress: fullAddress.address || "",
        province: fullAddress.province || "",
        city: fullAddress.city || "",
        postalCode: fullAddress.postal_code || "",
        administrativeRegion: "",
        isPrimary: fullAddress.is_primary,
        province_id: fullAddress.province_id || null,
        city_id: fullAddress.city_id || null,
        district_id: fullAddress.district_id || null,
        sub_district_id: fullAddress.sub_district_id || null,
      };
    } else {
      // Fallback to UI data if API fails - parse from fullAddress
      const addrParts = address.fullAddress.split(", ");
      editingAddress.value = {
        id: address.id,
        label: address.label,
        name: address.name,
        phone: address.phone,
        fullAddress: addrParts[0] || address.fullAddress,
        province: addrParts[2] || "",
        city: addrParts[1] || "",
        postalCode: addrParts[3] || "",
        administrativeRegion: "",
        isPrimary: address.isPrimary,
        province_id: (address as any).province_id || null,
        province_label: (address as any).province_label || null,
        city_id: (address as any).city_id || null,
        city_label: (address as any).city_label || null,
        district_id: (address as any).district_id || null,
        district_label: (address as any).district_label || null,
        sub_district_id: (address as any).sub_district_id || null,
        sub_district_label: (address as any).sub_district_label || null,
      };
    }
  } else {
    // Parse from existing address data
    const addrParts = address.fullAddress.split(", ");
    editingAddress.value = {
      id: index,
      label: address.label,
      name: address.name,
      phone: address.phone,
      fullAddress: addrParts[0] || address.fullAddress,
      province: addrParts[2] || "",
      city: addrParts[1] || "",
      postalCode: addrParts[3] || "",
      administrativeRegion: "",
      isPrimary: address.isPrimary,
      province_id: (address as any).province_id || null,
      city_id: (address as any).city_id || null,
      district_id: (address as any).district_id || null,
      sub_district_id: (address as any).sub_district_id || null,
    };
  }
  showNewAddressModal.value = true;
};

const openDeleteConfirmModal = (index: number) => {
  addressToDeleteIndex.value = index;
  showDeleteConfirmModal.value = true;
};

const confirmDeleteAddress = async () => {
  if (addressToDeleteIndex.value === null) return;

  const address = addresses.value[addressToDeleteIndex.value];
  if (!address?.id) {
    alert("Alamat tidak valid");
    return;
  }

  try {
    const { data, error } = await deleteAddress(address.id);

    if (error || !data?.success) {
      alert(error?.message || "Gagal menghapus alamat");
      return;
    }

    // Reload addresses
    await loadAddresses();

    showDeleteConfirmModal.value = false;
    addressToDeleteIndex.value = null;
  } catch (err) {
    console.error("Error deleting address:", err);
    alert("Terjadi kesalahan saat menghapus alamat");
  }
};

const handleSaveAddress = async (addressData: any) => {
  try {
    const nameParts = addressData.name.split(" ");

    const payload = {
      first_name: nameParts[0] || "",
      last_name: nameParts.slice(1).join(" ") || null,
      phone: addressData.phone,
      email: shippingForm.value.email || null,
      label_place: addressData.label || null,
      address: addressData.fullAddress || "",
      city: addressData.city || "",
      province: addressData.province || "",
      postal_code: addressData.postalCode || "",
      note_address: null,
      is_primary: addressData.isPrimary || false,
      // Location IDs and Labels from RajaOngkir
      province_id: addressData.province_id || null,
      province_label:
        addressData.province_label || addressData.province || null,
      city_id: addressData.city_id || null,
      city_label: addressData.city_label || addressData.city || null,
      district_id: addressData.district_id || null,
      district_label: addressData.district_label || null,
      sub_district_id: addressData.sub_district_id || null,
      sub_district_label: addressData.sub_district_label || null,
    };

    let result;
    if (editingAddress.value && editingAddress.value.id !== undefined) {
      // Update existing address
      result = await updateAddress(editingAddress.value.id, payload);
    } else {
      // Create new address
      result = await createAddress(payload);
    }

    const { data, error } = result;

    if (error || !data?.success) {
      // Handle validation errors
      const errorMessage =
        error?.message || data?.message || "Gagal menyimpan alamat";
      const fieldErrors = error?.errors || {};

      // Set error in modal
      if (addressModalRef.value) {
        addressModalRef.value.setError(errorMessage, fieldErrors);
      }

      // Keep modal open
      return;
    }

    if (shippingForm.value.city_id) {
      await fetchShippingCostPerStore();
    }

    // Success - reload addresses and close modal
    await loadAddresses();
    editingAddress.value = null;
    showNewAddressModal.value = false;
  } catch (err: any) {
    console.error("Error saving address:", err);

    // Set error in modal
    const errorMessage =
      err?.data?.message ||
      err?.message ||
      "Terjadi kesalahan saat menyimpan alamat";
    const fieldErrors = err?.data?.errors || {};

    if (addressModalRef.value) {
      addressModalRef.value.setError(errorMessage, fieldErrors);
    }
  }
};

// Update shipping form from selected address
const updateShippingFormFromAddress = (index: number) => {
  if (addresses.value[index]) {
    const addr = addresses.value[index];
    const addrParts = addr.fullAddress.split(", ");
    shippingForm.value.label_place = addr.label;
    const nameParts = addr.name.split(" ");
    shippingForm.value.first_name = nameParts[0] || "";
    shippingForm.value.last_name = nameParts.slice(1).join(" ") || "";
    shippingForm.value.phone = addr.phone;
    shippingForm.value.address = addrParts[0] || "";
    shippingForm.value.city = addrParts[1] || "";
    shippingForm.value.province = addrParts[2] || "";
    shippingForm.value.postal_code = addrParts[3] || "";
    // Store province_id, city_id, district_id, and sub_district_id if available
    shippingForm.value.province_id = (addr as any).province_id || null;
    shippingForm.value.city_id = (addr as any).city_id || null;
    shippingForm.value.district_id = (addr as any).district_id || null;
    shippingForm.value.sub_district_id = (addr as any).sub_district_id || null;
  }
};

// Load address details from API for editing
const loadAddressForEdit = async (id: number) => {
  const { data, error } = await getAddress(id);
  if (error || !data?.success) {
    return null;
  }
  return data.data;
};

const openNoteModal = (item: any) => {
  currentNoteVariantId.value = item.variant_id;
  noteDraft.value = notePerItem.value[item.variant_id] || "";
  showNoteModal.value = true;
};

const saveNote = () => {
  if (currentNoteVariantId.value !== null) {
    notePerItem.value[currentNoteVariantId.value] = noteDraft.value;
  }
  showNoteModal.value = false;
  noteDraft.value = "";
  currentNoteVariantId.value = null;
};

// Watch selected address index
watch(selectedAddressIndex, (newIndex) => {
  updateShippingFormFromAddress(newIndex);
});

// Update shipping form when address is selected
const selectAddress = () => {
  updateShippingFormFromAddress(selectedAddressIndex.value);
  showAddressModal.value = false;
};

// Calculate total cart weight in grams
const totalCartWeight = computed(() => {
  if (!checkoutCart.value.length) return 1000; // Default 1kg

  const totalWeight = checkoutCart.value.reduce((sum, item) => {
    const itemWeight = item.weight || 1000;
    return sum + itemWeight * item.qty;
  }, 0);

  return totalWeight || 1000;
});

const originCityId = computed(() => {
  if (!checkoutCart.value.length) return null;

  if (editingShippingStoreId.value !== null) {
    const key = editingShippingStoreId.value;
    const storeGroup = groupedByStore.value.find(
      (g) => (g.store_id ?? "null") === key,
    );
    if (storeGroup?.items[0]?.store?.city_id) {
      return storeGroup.items[0].store.city_id;
    }
  }

  // Otherwise return first store's city
  const itemWithStore = checkoutCart.value.find((item) => item.store?.city_id);
  return itemWithStore?.store?.city_id || null;
});

const groupedByStore = computed(() => {
  const groups = new Map<number | null, StoreGroup>();

  for (const item of checkoutCart.value) {
    const storeId = item.store?.id || null;
    const storeName = item.store?.name || "Toko Tidak Diketahui";

    if (!groups.has(storeId)) {
      groups.set(storeId, {
        store_id: storeId,
        store_name: storeName,
        items: [],
        totalWeight: 0,
        subtotal: 0,
      });
    }

    const group = groups.get(storeId)!;
    group.items.push(item);
    group.totalWeight += (item.weight || 1000) * item.qty;
    group.subtotal += item.sub_total;

    // Set shipping info if exists
    const storeKey = storeId ?? "null";
    if (shippingPerStore.value[storeKey]) {
      group.shippingInfo = shippingPerStore.value[storeKey];
    }
  }

  return Array.from(groups.values());
});

const storeCityLabel = computed(() => {
  if (isReadonlyMode.value && existingOrder.value) {
    const order = existingOrder.value as any;
    if (order.origin_city_label) return order.origin_city_label;
    if (order.shipping?.origin_city_label)
      return order.shipping.origin_city_label;
  }
  if (!checkoutCart.value.length) return "–";
  const cities = [
    ...new Set(
      checkoutCart.value.map((item) => item.store?.city).filter(Boolean),
    ),
  ] as string[];
  if (cities.length === 0) return "–";
  if (cities.length === 1) return cities[0];
  return cities.join(", ");
});

const currentStoreShippingOptions = computed(() => {
  if (editingShippingStoreId.value === null) return [];
  const key = editingShippingStoreId.value;
  return shippingPerStore.value[key]?.options || [];
});

const allCouriers =
  "jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse";

const fetchShippingCostPerStore = async () => {
  const cityId = shippingForm.value.city_id;
  if (!cityId || !groupedByStore.value.length) return;
  const allStoresValid = groupedByStore.value.every((group) => {
    const key = group.store_id ?? "null";
    const ship = shippingPerStore.value[key];
    return (
      ship && ship.options?.length > 0 && ship.cost !== undefined && ship.agent
    );
  });

  if (allStoresValid) return;

  isFetchingShipping.value = true;
  shippingError.value = null;

  const next: typeof shippingPerStore.value = { ...shippingPerStore.value };

  for (const group of groupedByStore.value) {
    const storeId = group.store_id ?? "null";
    const origin = group.items[0]?.store?.city_id;

    let totalWeight = 0;
    let freeWeight = 0;
    group.items.forEach((i) => {
      const baseWeight = i.weight || 1000;
      const qty = i.qty || 1;
      const itemWeight = baseWeight * qty;

      totalWeight += itemWeight;
      if (i.is_freeshiping === "ACTIVE") freeWeight += itemWeight;
    });

    const weightTotal = Math.max(Math.ceil(totalWeight), 1000);
    const weightFree = Math.max(Math.ceil(freeWeight), 1000);

    const { data, error } = await getShippingCost(
      cityId,
      weightTotal,
      allCouriers,
      origin,
      "lowest",
    );

    if (error || !data?.success || !data.data?.length) {
      next[storeId] = { ...next[storeId], options: [] };
      continue;
    }

    const options = data.data.map((item: any) => ({
      agent: item.code || item.name || "jne",
      service: item.service || "REG",
      service_desc: item.description || "",
      etd: item.etd || "",
      cost: Number(item.cost || item.price || 0),
    }));

    let freeShippingDiscount = 0;
    if (freeWeight > 0) {
      const { data: freeData } = await getShippingCost(
        cityId,
        weightFree,
        allCouriers,
        origin,
        "lowest",
      );

      if (freeData?.success && freeData.data?.length) {
        const freeCosts = freeData.data.map((item: any) =>
          Number(item.cost || item.price || 0),
        );
        freeShippingDiscount = Math.min(...freeCosts);
      }
    }

    if (freeShippingDiscount > 0) {
      const cheapestIndex = options.reduce(
        (minIdx, curr, idx) =>
          curr.cost < options[minIdx].cost ? idx : minIdx,
        0,
      );

      const cheapest = options[cheapestIndex];
      const discountedCost = Math.max(0, cheapest.cost - freeShippingDiscount);

      options[cheapestIndex] = {
        ...cheapest,
        original_cost: cheapest.cost,
        cost: discountedCost,
        is_free_applied: true,
        discount_amount: freeShippingDiscount,
      };
    }

    const cheapest = options.reduce(
      (prev, curr) => (prev.cost < curr.cost ? prev : curr),
      options[0],
    );

    next[storeId] = {
      ...cheapest,
      options,
    };
  }

  shippingPerStore.value = next;
  isFetchingShipping.value = false;
};

const totalShippingCost = computed(() => {
  let total = 0;
  for (const storeGroup of groupedByStore.value) {
    const storeId = storeGroup.store_id ?? "null";
    const c = shippingPerStore.value[storeId];
    if (c?.cost) total += c.cost;
  }
  return total;
});

const totalProtectionCost = computed(() => {
  let total = 0;
  for (const item of checkoutCart.value) {
    if (protectionPerItem.value[item.variant_id]) {
      total +=
        ((item.purchase_price * globalProtectionPercent.value) / 100) *
        item.qty;
    }
  }
  return total;
});

const maxPointUsed = computed(() => {
  if (!userPoint.value?.points || !userPoint.value.can_use_points) return 0;

  const subtotal = checkoutCalculation.value.sub_total || 0;
  const voucher = discountAmount.value || 0;

  const afterVoucher = Math.max(0, subtotal - voucher);
  const max10Percent = Math.floor(afterVoucher * 0.1);

  return Math.min(userPoint.value.points, max10Percent);
});

const remainingPoint = computed(() => {
  if (!userPoint.value?.points) return 0;
  return userPoint.value.points - maxPointUsed.value;
});

const openShippingModalForStore = (storeId: number | null) => {
  editingShippingStoreId.value = storeId ?? "null";
  showShippingModal.value = true;
};

const toggleProtectionForItem = (variantId: number) => {
  protectionPerItem.value = {
    ...protectionPerItem.value,
    [variantId]: !protectionPerItem.value[variantId],
  };
};

const updateCourierFromModal = (courier, storeKey?: number | string | null) => {
  const key = String(storeKey ?? "null");

  shippingPerStore.value = {
    ...shippingPerStore.value,
    [key]: {
      ...shippingPerStore.value[key],
      ...courier,
    },
  };
};

const shippingModalCartItems = computed(() => {
  if (editingShippingStoreId.value != null) {
    const key = editingShippingStoreId.value;
    return (
      groupedByStore.value.find((g) => (g.store_id ?? "null") === key)?.items ||
      []
    );
  }
  return checkoutCart.value;
});

const shippingModalCartWeight = computed(() => {
  if (editingShippingStoreId.value != null) {
    const key = editingShippingStoreId.value;
    const group = groupedByStore.value.find(
      (g) => (g.store_id ?? "null") === key,
    );
    if (group) return Math.max(group.totalWeight, 1000);
  }
  return totalCartWeight.value;
});

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const totalBill = computed(() => {
  if (isReadonlyMode.value && existingOrder.value) {
    return existingOrder.value.total_amount.toLocaleString("id-ID");
  }

  if (!checkoutCart.value.length) return "0";

  const subtotal = checkoutCalculation.value.sub_total || 0;
  const voucher = discountAmount.value || 0;
  const shipping = totalShippingCost.value || 0;
  const protection = totalProtectionCost.value || 0;

  const point = usePoints.value ? maxPointUsed.value : 0;

  const total = subtotal - voucher - point + shipping + protection;

  return Math.max(0, total).toLocaleString("id-ID");
});

const canSubmit = computed(() => {
  if (
    !checkoutCart.value.length ||
    !shippingForm.value.first_name ||
    !shippingForm.value.email ||
    !shippingForm.value.phone ||
    !shippingForm.value.address ||
    !shippingForm.value.city ||
    !shippingForm.value.province ||
    !shippingForm.value.postal_code
  )
    return false;
  for (const storeGroup of groupedByStore.value) {
    const storeId = storeGroup.store_id ?? "null";
    const c = shippingPerStore.value[storeId];
    if (!c?.agent) return false;
  }
  return true;
});

const totalAmount = computed<number>(() => {
  if (!checkoutCart.value.length) return 0;

  return checkoutCalculation.value.sub_total - discountAmount.value;
});

const payWithMidtrans = async (orderId: number) => {
  try {
    await loadMidtransSnap();

    const { snap_token } = await getSnapToken(orderId);
    (window as any).snap.pay(snap_token, {
      onSuccess: async () => {
        await loadCart();
        await navigateTo("/account/orders?tab=paid");
      },
      onPending: async () => {
        await loadCart();
        await navigateTo("/account/orders?tab=unpaid");
      },
      onError: (err: any) => {
        console.error("Midtrans error:", err);
        alert("Pembayaran gagal. Silakan coba lagi.");
      },
      onClose: () => {
        alert("Pembayaran dibatalkan");
      },
    });
  } catch (err) {
    console.error(err);
    alert("Gagal memulai pembayaran");
  }
};

const payWithMidtransWithCart = async (
  orderId: number,
  variantIdsToRemove: number[],
) => {
  try {
    await loadMidtransSnap();

    const { snap_token } = await getSnapToken(orderId);

    (window as any).snap.pay(snap_token, {
      onSuccess: async () => {
        for (const variantId of variantIdsToRemove) {
          await removeFromCart(variantId);
        }
        await loadCart();
        await navigateTo("/account/orders?tab=paid");
      },
      onPending: async () => {
        for (const variantId of variantIdsToRemove) {
          await removeFromCart(variantId);
        }
        await loadCart();
        await navigateTo("/account/orders?tab=unpaid");
      },
      onError: (err: any) => {
        console.error("Midtrans error:", err);
        alert("Pembayaran gagal. Silakan coba lagi.");
      },
      onClose: () => {
        alert("Pembayaran dibatalkan");
      },
    });
  } catch (err) {
    console.error(err);
    alert("Gagal memulai pembayaran");
  }
};

const handlePayment = async () => {
  if (isReadonlyMode.value) {
    alert(
      'Pesanan ini sudah memiliki token pembayaran dan tidak dapat diubah. Silakan gunakan tombol "Bayar Sekarang" untuk melanjutkan pembayaran.',
    );
    return;
  }

  await loadCart();

  if (!checkoutCart.value.length) {
    alert(
      cartData.value?.cart?.length
        ? "Tidak ada item dipilih untuk checkout. Silakan pilih item di halaman keranjang."
        : "Keranjang kosong. Silakan tambahkan produk terlebih dahulu.",
    );
    return;
  }

  if (!canSubmit.value) {
    alert("Mohon lengkapi semua field yang wajib diisi.");
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";

  try {
    if (orderIdFromQuery.value) {
      if (existingOrder.value?.payment?.snap_token) {
        alert(
          'Pesanan ini sudah memiliki token pembayaran dan tidak dapat diubah. Silakan gunakan tombol "Bayar Sekarang" untuk melanjutkan pembayaran.',
        );
        isSubmitting.value = false;
        return;
      }
      // For existing order, pay immediately
      isSubmitting.value = false;
      await payWithMidtrans(orderIdFromQuery.value);
      return;
    }

    // Create orders for each store group
    const createdOrderIds: number[] = [];
    const variantIdsToRemove: number[] = [];

    for (const storeGroup of groupedByStore.value) {
      const storeId = storeGroup.store_id ?? "null";
      const storeShipping = shippingPerStore.value[storeId];

      if (!storeShipping?.agent) {
        errorMessage.value = `Pilih ongkos kirim untuk toko: ${storeGroup.store_name}`;
        isSubmitting.value = false;
        alert(errorMessage.value);
        return;
      }

      // Calculate total for this store (subtotal + shipping + protection)
      let storeSubtotal = storeGroup.subtotal;
      let storeProtectionCost = 0;

      // Add protection cost for items in this store
      for (const item of storeGroup.items) {
        if (protectionPerItem.value[item.variant_id]) {
          storeProtectionCost +=
            ((item.purchase_price * globalProtectionPercent) / 100) * item.qty;
        }
      }

      const payload: CheckoutPayload = {
        shipping: shippingForm.value,
        billing: {
          ...shippingForm.value,
          same_as_shipping: true,
        },
        courier: {
          agent: storeShipping.agent,
          service: storeShipping.service,
          service_desc: storeShipping.service_desc,
          etd: storeShipping.etd,
          cost: storeShipping.cost,
        },
        products: storeGroup.items.map((item) => ({
          variant_id: item.variant_id,
          qty: item.qty,
          note: notePerItem.value[item.variant_id] || null,
          is_protected: !!protectionPerItem.value[item.variant_id],
        })),
        payment_method: null,
        voucher_id: selectedVoucher.value?.id || null,
        voucher_discount: Math.round(
          (discountAmount.value * storeSubtotal) /
            checkoutCalculation.value.sub_total,
        ),
        use_points: usePoints.value,
        invoice_note: null,
        delivery_order_note: null,
      };

      const { data, error } = await createOrder(payload);

      if (error || !data?.success) {
        errorMessage.value =
          error?.message ||
          `Gagal membuat pesanan untuk ${storeGroup.store_name}. Silakan coba lagi.`;
        isSubmitting.value = false;
        alert(errorMessage.value);
        return;
      }

      if (!data?.data?.order?.id) {
        errorMessage.value = `Gagal mendapatkan ID pesanan untuk ${storeGroup.store_name}.`;
        isSubmitting.value = false;
        alert(errorMessage.value);
        return;
      }

      createdOrderIds.push(data.data.order.id);

      // Collect variant IDs to remove after all orders succeed
      for (const item of storeGroup.items) {
        variantIdsToRemove.push(item.variant_id);
      }
    }

    isSubmitting.value = false;

    // If multiple orders, create a payment group so user pays once
    if (createdOrderIds.length > 1) {
      try {
        const { snap_token } = await createPaymentGroup(createdOrderIds);
        await loadMidtransSnap();
        (window as any).snap.pay(snap_token, {
          onSuccess: async () => {
            for (const variantId of variantIdsToRemove) {
              await removeFromCart(variantId);
            }
            await loadCart();
            await navigateTo("/account/orders?tab=paid");
          },
          onPending: async () => {
            for (const variantId of variantIdsToRemove) {
              await removeFromCart(variantId);
            }
            await loadCart();
            await navigateTo("/account/orders?tab=unpaid");
          },
          onError: (err: any) => {
            console.error("Midtrans error:", err);
            alert("Pembayaran gagal. Silakan coba lagi.");
          },
          onClose: () => {
            alert("Pembayaran dibatalkan");
          },
        });
      } catch (err) {
        console.error(err);
        alert("Gagal memulai pembayaran grup. Silakan coba lagi.");
      }
      return;
    }

    // Single order: proceed to payment for first order
    if (createdOrderIds.length > 0) {
      const firstOrderId: number = createdOrderIds[0];
      // Pass variant IDs to remove after payment succeeds
      await payWithMidtransWithCart(firstOrderId, variantIdsToRemove);
    }
  } catch (err) {
    errorMessage.value =
      err instanceof Error
        ? err.message
        : "Terjadi kesalahan. Silakan coba lagi.";
    isSubmitting.value = false;
    alert(errorMessage.value);
  }
};
</script>
