<template>
  <div
    :class="[
      'fixed top-0 left-0 w-full h-full z-9999 transition-all duration-300 ease-out',
      showPopupCart ? 'visible opacity-100' : 'invisible opacity-0',
    ]"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-black/70"
      @click="closePopupCart"
    ></div>
    <div
      :class="[
        'fixed right-0 top-0 h-full w-full max-w-[85%] md:max-w-[45%] lg:max-w-[35%] bg-white z-[1] flex flex-col transition-transform duration-300',
        showPopupCart ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div
        class="flex justify-between items-center h-20 px-5 bg-white border-b border-[#E6E9F0]"
      >
        <div class="w-[170px]">
          <h4 class="mb-1 text-base font-semibold text-[#1A1919]">
            SHOPPING CART
          </h4>
          <p class="text-sm text-[#808080] mb-0">
            Total item ({{ cartData?.calculation?.total_cart || 0 }} item)
          </p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-[#7B7B7B]"
            >{{ selectedCount }}/{{ cartData?.cart?.length || 0 }}</span
          >
          <button
            class="relative cursor-pointer h-10 w-10 flex-shrink-0 bg-transparent border-none group"
            @click="closePopupCart"
          >
            <div
              class="absolute top-[19px] left-2 w-6 h-[3px] bg-[#222] origin-center transition-all duration-300 group-hover:rotate-0 -rotate-45"
            ></div>
            <div
              class="absolute top-[19px] left-2 w-6 h-[3px] bg-[#222] origin-center transition-all duration-300 group-hover:rotate-0 rotate-45"
            ></div>
          </button>
        </div>
      </div>
      <div
        class="h-[calc(100vh-80px-140px)] px-5 py-5 overflow-y-auto bg-white flex-1"
      >
        <!-- Loading State -->
        <template v-if="isLoading">
          <div class="mb-4">
            <div
              class="border border-[#E6E9F0] rounded-lg p-3 mb-3"
              v-for="i in 3"
              :key="'cartSkeleton' + i"
            >
              <div class="flex flex-col">
                <div class="flex mb-3">
                  <div class="w-[78px] h-[78px] mr-3 flex-shrink-0">
                    <div
                      class="w-full h-full aspect-square rounded-lg bg-gray-200 animate-pulse"
                    ></div>
                  </div>
                  <div class="flex-1">
                    <div
                      class="w-[150px] h-4 bg-gray-200 rounded mb-2 animate-pulse"
                    ></div>
                    <div
                      class="w-[120px] h-3 bg-gray-200 rounded mb-2 animate-pulse"
                    ></div>
                    <div
                      class="w-[100px] h-3 bg-gray-200 rounded animate-pulse"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Cart Content -->
        <template v-else>
          <!-- Has Items -->
          <template
            v-if="
              (cartData?.cart && cartData.cart.length > 0) ||
              (cartData?.outOfStock && cartData.outOfStock.length > 0)
            "
          >
            <div class="mb-4">
              <div
                v-if="cartData.cart && cartData.cart.length > 0"
                class="border border-[#E6E9F0] rounded-lg p-3 mb-3 bg-white flex items-center gap-2 cursor-pointer"
                @click="toggleSelectAll"
              >
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  class="w-4 h-4 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer text-[#E9322B]"
                />
                <span class="text-sm font-medium text-[#1A1919]"
                  >Pilih semua</span
                >
              </div>

              <!-- Semua item (normal + invalid) -->
              <div
                v-for="item in allCartItems"
                :key="item.variant_id"
                class="border rounded-lg p-3 mb-3 bg-white transition"
                :class="[
                  item.isInvalid
                    ? ' bg-gray-50 border-gray-300 cursor-not-allowed'
                    : isSelectedForCheckout(item.variant_id)
                      ? 'border-[#E9322B] ring-1 ring-[#E9322B]/20'
                      : 'border-[#E6E9F0]',
                ]"
              >
                <!-- Badge invalid -->
                <div v-if="item.isInvalid" class="mb-2">
                  <span
                    class="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded"
                  >
                    Tidak Tersedia (Stok: {{ item.available_stock || 0 }})
                  </span>
                </div>

                <div class="flex flex-col">
                  <div class="flex mb-3">
                    <!-- Checkbox -->
                    <label
                      class="flex items-center cursor-pointer mr-2 flex-shrink-0"
                    >
                      <input
                        type="checkbox"
                        :checked="isSelectedForCheckout(item.variant_id)"
                        @change="toggleSelectedForCheckout(item.variant_id)"
                        :disabled="item.isInvalid"
                        class="w-4 h-4 border-[#C1C1C1] rounded focus:ring-[#E9322B] focus:ring-2 cursor-pointer text-[#E9322B] disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <component
                      :is="item.isInvalid ? 'div' : 'NuxtLink'"
                      :to="
                        !item.isInvalid
                          ? `/products/${item.product_slug || item.product_id}`
                          : undefined
                      "
                      class="aspect-square w-[78px] h-[78px] border border-[#E6E9F0] rounded-lg mr-3 overflow-hidden flex-shrink-0"
                      :class="{ 'cursor-not-allowed': item.isInvalid }"
                      @click="!item.isInvalid && closePopupCart()"
                    >
                      <NuxtImg
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.product_name"
                        class="w-full h-full object-cover"
                        fit="cover"
                      />
                      <div
                        v-else
                        class="w-full h-full flex items-center justify-center bg-gray-100"
                      >
                        <svg
                          class="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </component>

                    <!-- Info -->
                    <div class="flex-1">
                      <component
                        :is="item.isInvalid ? 'p' : 'NuxtLink'"
                        :to="
                          !item.isInvalid
                            ? `/products/${item.product_slug || item.product_id}`
                            : undefined
                        "
                        class="font-semibold mb-1 text-sm"
                        :class="[
                          item.isInvalid
                            ? 'text-[#1A1919] opacity-70 cursor-not-allowed'
                            : 'text-[#1A1919] hover:text-[#E9322B] transition cursor-pointer',
                        ]"
                        @click="!item.isInvalid && closePopupCart()"
                      >
                        {{ item.product_name }}
                      </component>

                      <!-- Harga -->
                      <p class="font-semibold mb-1 text-sm text-[#1A1919]">
                        <span
                          v-if="
                            item.actual_price &&
                            item.actual_price > item.purchase_price
                          "
                          class="line-through text-sm font-normal mr-1 text-[#808080]"
                        >
                          {{ formatPrice(item.actual_price) }}
                        </span>
                        {{ formatPrice(item.purchase_price) }}
                      </p>

                      <!-- Variant -->
                      <p class="text-xs mb-0 text-[#808080]">
                        {{ item.variant_description }}
                      </p>
                    </div>
                  </div>

                  <!-- Qty & Note -->
                  <div class="flex flex-col mt-3">
                    <!-- Note -->
                    <div class="mb-3">
                      <p class="text-[#1A1919] text-sm font-medium mb-1">
                        Notes
                      </p>
                      <textarea
                        class="w-full px-3 py-2 border border-[#E6E9F0] rounded-lg text-sm outline-none transition-colors focus:border-[#E9322B] text-[#1A1919]"
                        :class="{
                          'bg-gray-100 cursor-not-allowed opacity-70':
                            item.isInvalid,
                        }"
                        rows="2"
                        :value="item.note || ''"
                        @blur="onChangeNote($event, item.variant_id)"
                        :disabled="item.isInvalid"
                        placeholder="Tambahkan catatan..."
                      ></textarea>
                    </div>

                    <!-- Qty & Hapus -->
                    <div class="flex items-center justify-between">
                      <!-- Qty -->
                      <div
                        class="flex items-center gap-3 sm:gap-5 border border-[#D9D9D9] rounded-sm py-1.5 sm:py-2 px-2 sm:px-2.5"
                        :class="{
                          'opacity-70 cursor-not-allowed': item.isInvalid,
                        }"
                      >
                        <button
                          @click="minQty(item.variant_id)"
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
                          @click="plusQty(item.variant_id)"
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

                      <!-- Hapus tetap aktif -->
                      <button
                        class="p-0 hover:text-red-600 transition hover:cursor-pointer"
                        @click="removeCartItem(item.variant_id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Empty Cart -->
          <template v-else>
            <div
              class="flex flex-col items-center justify-center text-center h-[300px]"
            >
              <h3 class="text-base font-semibold text-[#1A1919] mb-4">
                Your Cart is empty
              </h3>
              <NuxtLink to="/products">
                <button
                  class="px-5 py-3 bg-[#E9322B] text-white rounded-lg font-medium text-base hover:bg-[#C4282B] transition cursor-pointer"
                  @click="closePopupCart"
                >
                  Start Shopping
                </button>
              </NuxtLink>
            </div>
          </template>
        </template>
      </div>
      <div
        class="h-[140px] w-full px-5 py-5 border-t border-[#E6E9F0] bg-white"
        v-if="cartData?.cart && cartData.cart.length > 0"
      >
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium mb-0 text-[#1A1919]">Total :</p>
          <h5 class="mb-0 text-base font-semibold text-[#1A1919]">
            {{ formatPrice(selectedSubtotal) }}
          </h5>
        </div>
        <div class="flex gap-2">
          <NuxtLink
            to="/cart"
            @click="closePopupCart"
            class="flex-1 bg-white text-[#E9322B] border-2 border-[#E9322B] px-5 py-3 rounded-lg font-medium text-base transition-all hover:bg-[#F8F8F8] hover:border-[#C4282B] hover:text-[#C4282B] flex items-center justify-center"
          >
            Lihat Keranjang
          </NuxtLink>
          <button
            class="flex-1 bg-[#E9322B] text-white px-5 py-3 rounded-lg font-medium text-base transition-all hover:bg-[#C4282B] cursor-pointer"
            @click="checkoutAndRefreshCart"
          >
            Pembayaran
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  cartData,
  isLoading,
  showPopupCart,
  updateCartItem,
  removeFromCart,
  loadCart,
  closePopupCart,
  toggleSelectedForCheckout,
  isSelectedForCheckout,
  selectAllForCheckout,
  clearSelectionForCheckout,
  selectedForCheckout,
  checkoutCart,
} = useCart();

const router = useRouter();

const allCartItems = computed(() => {
  if (!cartData.value) return [];

  const normal = (cartData.value.cart || []).map((item) => ({
    ...item,
    isInvalid: false,
  }));

  const invalid = (cartData.value.outOfStock || []).map((item) => ({
    ...item,
    isInvalid: true,
  }));

  return [...normal, ...invalid];
});

const selectedCount = computed(() => checkoutCart.value.length);

const isAllSelected = computed(() => {
  if (!cartData.value?.cart?.length) return false;
  const ids = selectedForCheckout.value;
  return ids.length === cartData.value.cart.length;
});

const selectedSubtotal = computed(() => {
  if (!checkoutCart.value.length) return 0;

  return checkoutCart.value.reduce((sum, item) => {
    const price = item.purchase_price || item.actual_price || 0;
    return sum + price * item.qty;
  }, 0);
});

const toggleSelectAll = () => {
  if (isAllSelected.value) clearSelectionForCheckout();
  else selectAllForCheckout();
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const onChangeNote = async (event: Event, variantId: number) => {
  const target = event.target as HTMLTextAreaElement;
  const note = target.value.trim() || null;
  await updateCartItem(variantId, 0, note);
};

const removeCartItem = async (variantId: number) => {
  await removeFromCart(variantId);
  if (process.client) {
    console.log("Produk berhasil dihapus");
  }
};

const plusQty = async (variantId: number) => {
  const item = cartData.value?.cart.find((i) => i.variant_id === variantId);
  if (item && item.qty < item.available_stock) {
    await updateCartItem(variantId, item.qty + 1);
  }
};

const minQty = async (variantId: number) => {
  const item = cartData.value?.cart.find((i) => i.variant_id === variantId);
  if (item && item.qty > 1) {
    await updateCartItem(variantId, item.qty - 1);
  }
};

const checkoutAndRefreshCart = async () => {
  if (checkoutCart.value.length === 0) {
    alert("Silakan pilih minimal satu item untuk checkout");
    return;
  }
  await loadCart();
  closePopupCart();

  setTimeout(() => {
    router.push("/payment");
  }, 500);
};

watch(showPopupCart, (newValue) => {
  if (process.client) {
    if (newValue) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
});
</script>
