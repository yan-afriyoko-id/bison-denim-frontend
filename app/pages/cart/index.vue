<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div
        class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-[31px] py-6 sm:py-8 md:py-10 flex-1"
      >
        <h1
          class="text-xl sm:text-2xl md:text-[32px] font-semibold text-[#1A1919] mb-4 sm:mb-5 md:mb-6"
        >
          Keranjang Belanja
        </h1>

        <!-- Loading State -->
        <div v-if="isLoading || !cartData" class="text-center py-10 sm:py-12">
          <p class="text-sm sm:text-base text-[#7B7B7B]">Memuat keranjang...</p>
        </div>

        <!-- Empty Cart -->
        <div
          v-else-if="isCartEmpty || !cartData || cartData.cart.length === 0"
          class="text-center py-10 sm:py-12 md:py-16"
        >
          <div class="mb-4 sm:mb-6">
            <svg
              class="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto text-[#E6E9F0]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2
            class="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A1919] mb-1.5 sm:mb-2"
          >
            Keranjang Anda Kosong
          </h2>
          <p
            class="text-xs sm:text-sm md:text-base text-[#7B7B7B] mb-4 sm:mb-6"
          >
            Mulai berbelanja dan tambahkan produk ke keranjang
          </p>
          <NuxtLink
            to="/products"
            class="inline-block px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#C4282B] transition cursor-pointer"
          >
            Mulai Berbelanja
          </NuxtLink>
        </div>

        <!-- Cart Content -->
        <div
          v-else
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-11.5"
        >
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-5 sm:space-y-6 md:space-y-7.5">
            <!-- Select All -->
            <div
              class="flex items-center justify-between bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5"
            >
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate.prop="isIndeterminate"
                  @change="toggleSelectAll"
                  class="w-4 h-4 sm:w-5 sm:h-5 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer text-[#E9322B]"
                />
                <span class="text-sm sm:text-base font-medium text-[#1A1919]"
                  >Pilih semua untuk checkout</span
                >
              </label>
              <span class="text-xs sm:text-sm text-[#7B7B7B]"
                >{{ selectedCount }} item dipilih</span
              >
            </div>

            <!-- Cart Items List -->
            <div class="space-y-5 sm:space-y-6 md:space-y-7.5">
              <div
                v-for="item in allCartItems"
                :key="item.variant_id"
                class="bg-white border rounded-[10px] p-4 sm:p-5 md:p-7.5 transition"
                :class="[
                  item.isOutOfStock
                    ? ' bg-gray-50 border-gray-300 cursor-not-allowed'
                    : isSelectedForCheckout(item.variant_id)
                      ? 'border-[#E9322B] ring-1 ring-[#E9322B]/20'
                      : 'border-[#E6E9F0]',
                ]"
              >
                <!-- Badge Out of Stock -->
                <div v-if="item.isOutOfStock" class="mb-3">
                  <span
                    class="inline-block px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full"
                  >
                    Tidak Tersedia (Stok: {{ item.available_stock || 0 }})
                  </span>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <!-- Checkbox -->
                  <div class="flex items-start sm:items-center shrink-0">
                    <label class="flex items-center gap-2">
                      <input
                        type="checkbox"
                        :checked="isSelectedForCheckout(item.variant_id)"
                        @change="toggleSelectedForCheckout(item.variant_id)"
                        :disabled="item.isOutOfStock"
                        class="w-4 h-4 sm:w-5 sm:h-5 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer text-[#E9322B] disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span class="text-xs sm:text-sm text-[#7B7B7B] sm:sr-only"
                        >Pilih</span
                      >
                    </label>
                  </div>

                  <!-- Image -->
                  <NuxtLink
                    :to="`/products/${item.product_slug || item.product_id}`"
                    :aria-disabled="item.isOutOfStock"
                    :tabindex="item.isOutOfStock ? -1 : 0"
                    class="w-full sm:w-[80px] md:w-[100px] lg:w-[120px] h-[80px] sm:h-[100px] md:h-[120px] rounded-lg overflow-hidden bg-[#F8F8F8] shrink-0"
                    :class="[
                      item.isOutOfStock
                        ? 'cursor-not-allowed opacity-70 pointer-events-none'
                        : 'hover:text-[#E9322B] transition cursor-pointer',
                    ]"
                  >
                    <NuxtImg
                      :src="item.image || '/placeholder.png'"
                      :alt="item.product_name"
                      class="w-full h-full object-cover"
                      width="128"
                      height="128"
                    />
                  </NuxtLink>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <NuxtLink
                      :to="`/products/${item.product_slug || item.product_id}`"
                      :aria-disabled="item.isOutOfStock"
                      :tabindex="item.isOutOfStock ? -1 : 0"
                      class="block mb-1.5 sm:mb-2"
                      :class="[
                        item.isOutOfStock
                          ? 'cursor-not-allowed opacity-70 pointer-events-none'
                          : 'hover:text-[#E9322B] transition cursor-pointer',
                      ]"
                    >
                      <h3
                        class="text-sm sm:text-base md:text-lg font-medium text-[#1A1919] line-clamp-2"
                      >
                        {{ item.product_name }}
                      </h3>
                    </NuxtLink>
                    <p class="text-xs sm:text-sm text-[#7B7B7B] mb-2 sm:mb-2.5">
                      {{ item.variant_description }}
                    </p>

                    <!-- Price -->
                    <div class="mb-3 sm:mb-4">
                      <span
                        class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]"
                      >
                        {{ formatPrice(item.purchase_price) }}
                      </span>
                    </div>

                    <!-- Quantity (disabled kalau out of stock) -->
                    <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <label class="text-xs sm:text-sm text-[#808080]"
                        >Jumlah:</label
                      >

                      <div
                        class="flex items-center gap-3 sm:gap-5 border border-[#D9D9D9] rounded-sm py-1.5 sm:py-2 px-2 sm:px-2.5"
                      >
                        <button
                          @click="decreaseQty(item.variant_id)"
                          :disabled="item.qty <= 1"
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
                          item.qty
                        }}</span>
                        <button
                          @click="increaseQty(item.variant_id)"
                          :disabled="item.qty >= item.available_stock"
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
                                item.qty >= item.available_stock
                                  ? '#C1C1C1'
                                  : '#E9322B'
                              "
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- Subtotal & Hapus -->
                    <div
                      class="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#E6E9F0]"
                    >
                      <div>
                        <p class="text-xs sm:text-sm text-[#808080]">
                          Subtotal:
                        </p>
                        <p
                          class="text-base sm:text-lg font-semibold text-[#1A1919]"
                        >
                          {{ formatPrice(item.sub_total) }}
                        </p>
                      </div>
                      <button
                        @click="removeItem(item.variant_id)"
                        class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-[#E9322B] hover:bg-red-50 rounded-md transition cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1 space-y-5 sm:space-y-6 md:space-y-7.5">
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5 sticky top-4"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Ringkasan Pesanan
              </h2>

              <div class="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Subtotal (dipilih)</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                  >
                    {{ formatPrice(checkoutCalculation.sub_total) }}
                  </span>
                </div>
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Total Item</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                  >
                    {{ checkoutCalculation.total_cart }} item
                  </span>
                </div>
              </div>

              <div
                class="border-t border-[#E6E9F0] pt-4 sm:pt-5 mb-5 sm:mb-7.5"
              >
                <div class="flex justify-between items-center mb-2 sm:mb-4">
                  <span class="text-sm sm:text-base text-[#7B7B7B]"
                    >Total Tagihan</span
                  >
                  <span
                    class="text-lg sm:text-xl md:text-[22px] font-semibold text-[#1A1919]"
                  >
                    {{ formatPrice(checkoutCalculation.sub_total) }}
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-[#7B7B7B]">
                  * Belum termasuk ongkos kirim
                </p>
              </div>

              <button
                type="button"
                :disabled="checkoutCart.length === 0"
                @click="goToPayment"
                class="block w-full py-2 sm:py-2.5 bg-[#E9322B] text-white text-center rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#C4282B] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Lanjut ke Pembayaran ({{ checkoutCart.length }} item)
              </button>

              <NuxtLink
                to="/products"
                class="block w-full mt-3 py-2 sm:py-2.5 text-center text-sm sm:text-base text-[#7B7B7B] hover:text-[#1A1919] transition cursor-pointer"
              >
                Lanjutkan Belanja
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Keranjang Belanja",
});

const {
  cartData,
  isLoading,
  loadCart,
  updateCartItem,
  removeFromCart,
  checkoutCart,
  checkoutCalculation,
  toggleSelectedForCheckout,
  isSelectedForCheckout,
  selectAllForCheckout,
  clearSelectionForCheckout,
  setSelectedForCheckout,
  selectedForCheckout,
} = useCart();

const auth = useAuth();
const router = useRouter();

const allCartItems = computed(() => {
  if (!cartData.value) return [];

  const normal = (cartData.value.cart || []).map((item) => ({
    ...item,
    isOutOfStock: false,
  }));

  const outOfStock = (cartData.value.outOfStock || []).map((item) => ({
    ...item,
    isOutOfStock: true,
  }));

  return [...normal, ...outOfStock];
});

const selectedCount = computed(() => checkoutCart.value.length);

const isAllSelected = computed(() => {
  if (!cartData.value?.cart?.length) return false;
  const ids = selectedForCheckout.value;
  return ids.length === cartData.value.cart.length;
});

const isIndeterminate = computed(() => {
  if (!cartData.value?.cart?.length) return false;
  const ids = selectedForCheckout.value;
  return ids.length > 0 && ids.length < cartData.value.cart.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) clearSelectionForCheckout();
  else selectAllForCheckout();
};

const goToPayment = () => {
  if (checkoutCart.value.length === 0) {
    toast.warning("Pilih minimal satu item untuk checkout");
    return;
  }

  setSelectedForCheckout(checkoutCart.value.map((i) => i.variant_id));
  router.push("/payment");
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

onMounted(async () => {
  if (!auth.isAuthenticated.value) {
    return navigateTo("/login?redirect=/cart");
  }

  await loadCart();

  if (cartData.value?.cart?.length && selectedForCheckout.value.length === 0) {
    selectAllForCheckout();
  }
});

const increaseQty = async (variantId: number) => {
  const item = cartData.value?.cart.find((i) => i.variant_id === variantId);
  if (item && item.qty < item.available_stock) {
    await updateCartItem(variantId, item.qty + 1);
  } else if (item) {
    toast.warning("Stok tidak cukup");
  }
};

const decreaseQty = async (variantId: number) => {
  const item = cartData.value?.cart.find((i) => i.variant_id === variantId);
  if (item && item.qty > 1) {
    await updateCartItem(variantId, item.qty - 1);
  }
};

const updateNote = async (variantId: number, event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const note = target.value.trim() || null;
  const item = cartData.value?.cart.find((i) => i.variant_id === variantId);

  if (item) {
    await updateCartItem(variantId, item.qty, note);
  }
};

const removeItem = async (variantId: number) => {
  await removeFromCart(variantId);
};

const isCartEmpty = computed(() => {
  return !cartData.value || cartData.value.cart.length === 0;
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
