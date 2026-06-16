<template>
  <main class="bg-white">
    <Header />
    <!-- Review Modal -->
    <div
      v-if="showReviewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
      @click.self="showReviewModal = false"
    >
      <div
        class="bg-white rounded-[10px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-4 sm:mb-5">
          <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
            Beri Ulasan
          </h2>

          <button
            @click="showReviewModal = false"
            class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full transition shrink-0"
          >
            <div class="w-5 h-5 sm:w-6 sm:h-6">
              <svg class="w-full h-full" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="black"
                />
              </svg>
            </div>
          </button>
        </div>

        <!-- Modal Content -->
        <div
          v-if="!isLoadingReviewData"
          class="space-y-4 sm:space-y-5 mb-5 sm:mb-6"
        >
          <div>
            <label
              class="block text-sm sm:text-base font-medium text-[#1A1919] mb-2"
            >
              Rating
            </label>
            <div class="flex gap-1 sm:gap-2">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="reviewForm.rating = star"
                class="focus:outline-none transition"
              >
                <svg
                  class="w-8 h-8 sm:w-10 sm:h-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    :fill="star <= reviewForm.rating ? '#E9322B' : '#E6E9F0'"
                  />
                </svg>
              </button>
            </div>
            <input type="hidden" v-model.number="reviewForm.rating" />
          </div>

          <!-- Comment -->
          <div>
            <label
              class="block text-sm sm:text-base font-medium text-[#1A1919] mb-2"
            >
              Komentar (Opsional)
            </label>
            <textarea
              v-model="reviewForm.comment"
              rows="4"
              class="w-full border border-[#E6E9F0] rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:border-[#E9322B]"
            ></textarea>
          </div>

          <!-- Info batas waktu edit -->
          <p class="text-xs sm:text-sm text-[#7B7B7B]">
            {{
              isEditReviewMode
                ? "Anda hanya dapat mengedit ulasan dalam 1 jam setelah dibuat."
                : "Anda hanya dapat mengirim satu ulasan per item pesanan."
            }}
          </p>

          <!-- Error -->
          <p v-if="reviewError" class="text-sm text-[#E9322B]">
            {{ reviewError }}
          </p>
        </div>
        <div
          v-else
          class="mb-5 sm:mb-6 py-4 sm:py-6 text-center text-sm sm:text-base text-[#7B7B7B]"
        >
          Memuat data ulasan...
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-[#E6E9F0]">
          <button
            @click="showReviewModal = false"
            class="flex-1 bg-[#F8F8F8] text-[#7B7B7B] py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base hover:bg-[#E6E9F0] transition"
          >
            Batal
          </button>

          <button
            @click="submitReview"
            :disabled="isSubmittingReview"
            class="flex-1 bg-[#E9322B] text-white py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base hover:bg-[#C4282B] transition disabled:opacity-50"
          >
            {{
              isSubmittingReview
                ? isEditReviewMode
                  ? "Menyimpan..."
                  : "Mengirim..."
                : isEditReviewMode
                  ? "Simpan Perubahan"
                  : "Kirim Ulasan"
            }}
          </button>
        </div>
      </div>
    </div>
    <div class="min-h-screen flex flex-col">
      <div
        class="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-[31px] py-6 sm:py-8 md:py-10 flex-1"
      >
        <div v-if="isLoadingOrder" class="text-center py-10">
          <p class="text-sm sm:text-base text-[#7B7B7B]">
            Memuat data pesanan...
          </p>
        </div>

        <div v-else-if="orderError" class="text-center py-10 sm:py-16">
          <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-2">
            Gagal Memuat Data
          </h2>
          <p class="text-sm sm:text-base text-[#7B7B7B] mb-6">
            {{ orderError }}
          </p>
          <NuxtLink
            to="/account/orders"
            class="inline-block px-6 py-3 bg-[#E9322B] text-white rounded-lg font-medium hover:bg-[#C4282B] transition cursor-pointer"
          >
            Kembali ke Daftar Pesanan
          </NuxtLink>
        </div>

        <div
          v-else-if="order"
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-11.5"
        >
          <div class="lg:col-span-2 space-y-5 sm:space-y-6 md:space-y-7.5">
            <NuxtLink
              to="/account/orders"
              class="flex items-center gap-2 w-max sm:text-lg md:text-xl text-[#1A1919] font-medium hover:underline cursor-pointer"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.115 24.885L16.245 18L23.115 11.115L21 9L12 18L21 27L23.115 24.885Z"
                  fill="#292929"
                />
              </svg>
              <p>Lihat Semua Pesanan</p>
            </NuxtLink>

            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Informasi Pesanan
              </h2>
              <div class="space-y-3 sm:space-y-4">
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                >
                  <span
                    class="text-sm sm:text-base text-[#7B7B7B] font-medium min-w-[120px]"
                    >Nomor Pesanan:</span
                  >
                  <span
                    class="text-sm sm:text-base text-[#1A1919] font-semibold"
                    >{{ order.order_number }}</span
                  >
                </div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                >
                  <span
                    class="text-sm sm:text-base text-[#7B7B7B] font-medium min-w-[120px]"
                    >Tanggal Pesanan:</span
                  >
                  <span class="text-sm sm:text-base text-[#1A1919]">{{
                    formatDate(order.created_at)
                  }}</span>
                </div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                >
                  <span
                    class="text-sm sm:text-base text-[#7B7B7B] font-medium min-w-[120px]"
                    >Status Pembayaran:</span
                  >
                  <span
                    :class="[
                      'text-sm sm:text-base font-semibold px-3 py-1 rounded border',
                      paymentStatusClass,
                    ]"
                  >
                    {{ formatPaymentStatus(order.payment.status) }}
                  </span>
                </div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"
                >
                  <span
                    class="text-sm sm:text-base text-[#7B7B7B] font-medium min-w-[120px]"
                    >Status Pesanan:</span
                  >
                  <span
                    :class="[
                      'text-sm sm:text-base font-semibold px-3 py-1 rounded border',
                      orderStatusClass,
                    ]"
                  >
                    {{ formatOrderStatus(order.status) }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Alamat Pengiriman
              </h2>
              <div class="space-y-2">
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
                          d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 15.4 11.05 21.5 11.35 21.76C11.5311 21.9149 11.7616 22.0001 12 22.0001C12.2384 22.0001 12.4689 21.9149 12.65 21.76C13 21.5 20 15.4 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2ZM12 19.65C9.87 17.65 6 13.34 6 10C6 8.4087 6.63214 6.88258 7.75736 5.75736C8.88258 4.63214 10.4087 4 12 4C13.5913 4 15.1174 4.63214 16.2426 5.75736C17.3679 6.88258 18 8.4087 18 10C18 13.34 14.13 17.66 12 19.65Z"
                          fill="#8A8A8A"
                        />
                      </svg>
                    </div>
                    <span
                      class="text-sm sm:text-base font-semibold text-[#1A1919]"
                      >{{ order.shipping.label_place || "Alamat" }}</span
                    >
                  </div>
                </div>
                <div class="mb-1 flex gap-1 items-center flex-wrap">
                  <p class="text-sm sm:text-base text-[#1A1919] font-medium">
                    {{ order.shipping.first_name }}
                    {{ order.shipping.last_name || "" }}
                  </p>
                  <p
                    v-if="order.contact_phone"
                    class="text-xs sm:text-sm text-[#7B7B7B]"
                  >
                    {{ order.contact_phone }}
                  </p>
                </div>
                <p class="text-xs sm:text-sm text-[#7B7B7B]">
                  {{ order.shipping.address
                  }}{{ order.shipping.city ? `, ${order.shipping.city}` : ""
                  }}{{
                    order.shipping.province
                      ? `, ${order.shipping.province}`
                      : ""
                  }}{{
                    order.shipping.postal_code
                      ? `, ${order.shipping.postal_code}`
                      : ""
                  }}
                </p>
              </div>
            </div>

            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Produk Dipesan
              </h2>
              <div class="space-y-4 sm:space-y-5">
                <div
                  v-for="item in order.order_items || []"
                  :key="item.id"
                  class="flex gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[#E6E9F0] last:border-0 last:pb-0"
                >
                  <NuxtImg
                    :src="item.product_image || '/assets/img/placeholder.png'"
                    :alt="item.product_name"
                    width="80"
                    height="80"
                    class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h3
                        class="text-sm sm:text-base font-semibold text-[#1A1919] mb-1 line-clamp-2"
                      >
                        {{ item.product_name }}
                      </h3>
                    </div>
                    <p
                      v-if="item.variant_description"
                      class="text-xs sm:text-sm text-[#7B7B7B] mb-2"
                    >
                      {{ item.variant_description }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-xs sm:text-sm text-[#7B7B7B]"
                        >Qty: {{ item.qty }}</span
                      >
                    </div>
                    <div
                      v-if="
                        item.product_protection_amount &&
                        item.product_protection_amount > 0
                      "
                      class="flex items-center justify-between mt-2"
                    >
                      <span class="text-xs sm:text-sm text-[#7B7B7B]"
                        >Proteksi:
                        {{
                          formatPrice(
                            (item.product_protection_percent *
                              item.purchase_price) /
                              100,
                          )
                        }}
                        x
                        {{ item.qty }}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end">
                    <span
                      class="text-sm sm:text-base font-semibold text-[#1A1919]"
                    >
                      {{ formatPrice(item.purchase_price * item.qty) }}
                    </span>
                    <div class="mt-3 flex items-center justify-between">
                      <button
                        v-if="
                          order.status === 'COMPLETED' &&
                          !item.review_id &&
                          !item.review
                        "
                        @click="openReviewModal(item.id, item.product_id)"
                        class="px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-[#E9322B] text-white rounded-lg hover:bg-[#C4282B] transition"
                      >
                        Beri Ulasan
                      </button>
                      <template v-else-if="item.review_id || item.review">
                        <button
                          v-if="item.review?.can_edit"
                          @click="
                            openReviewModal(
                              item.id,
                              item.product_id,
                              item.review_id || item.review?.id,
                            )
                          "
                          class="px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-[#E9322B] text-[#E9322B] rounded-lg hover:bg-[#E9322B] hover:text-white transition"
                        >
                          Edit Ulasan
                        </button>
                        <span
                          v-else
                          class="text-sm sm:text-base text-[#E9322B]"
                        >
                          Sudah diulas
                        </span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="order.courier"
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Informasi Pengiriman
              </h2>
              <div class="space-y-2">
                <div class="flex items-center gap-2 sm:gap-2.5 mb-1.5">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                    <svg
                      class="w-full h-full"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 19C8.53043 19 9.03914 18.7893 9.41421 18.4142C9.78929 18.0391 10 17.5304 10 17C10 16.4696 9.78929 15.9609 9.41421 15.5858C9.03914 15.2107 8.53043 15 8 15C7.46957 15 6.96086 15.2107 6.58579 15.5858C6.21071 15.9609 6 16.4696 6 17C6 17.5304 6.21071 18.0391 6.58579 18.4142C6.96086 18.7893 7.46957 19 8 19Z"
                        stroke="#8A8A8A"
                        stroke-width="1.5"
                        stroke-miterlimit="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    class="text-sm sm:text-base font-semibold text-[#1A1919]"
                  >
                    {{
                      order.courier.agent
                        ? order.courier.agent.toUpperCase()
                        : ""
                    }}
                    {{
                      order.courier.service_desc
                        ? ` - ${order.courier.service_desc}`
                        : ""
                    }}
                  </span>
                </div>
                <p
                  v-if="order.courier.estimate_delivered"
                  class="text-xs sm:text-sm text-[#7B7B7B]"
                >
                  Estimasi tiba: {{ order.courier.estimate_delivered }}
                </p>
                <p
                  v-if="order.courier.resi_number"
                  class="text-xs sm:text-sm text-[#7B7B7B]"
                >
                  Nomor Resi: {{ order.courier.resi_number }}
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div
              class="bg-white border border-[#E6E9F0] rounded-[10px] p-4 sm:p-5 md:p-7.5"
            >
              <h2
                class="text-xl sm:text-2xl font-semibold text-[#1A1919] mb-4 sm:mb-5"
              >
                Ringkasan Pembayaran
              </h2>
              <div class="space-y-1.5 mb-3 sm:mb-4">
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Subtotal</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                    >{{ formatPrice(order.subtotal) }}</span
                  >
                </div>
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Ongkos Kirim</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                    >{{ formatPrice(order.shipping_cost) }}</span
                  >
                </div>
                <div
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Proteksi</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                    >{{ formatPrice(order.product_protection_amount) }}</span
                  >
                </div>
                <div
                  v-if="order.discount_amount > 0"
                  class="flex justify-between text-sm sm:text-base text-[#7B7B7B]"
                >
                  <span>Diskon</span>
                  <span
                    class="text-base sm:text-lg text-[#1A1919] font-semibold"
                    >-{{ formatPrice(order.discount_amount) }}</span
                  >
                </div>
              </div>
              <div
                class="border-t border-[#E6E9F0] pt-4 sm:pt-5 mb-5 sm:mb-7.5"
              >
                <div class="flex justify-between items-center">
                  <span class="text-sm sm:text-base text-[#7B7B7B]"
                    >Total Tagihan</span
                  >
                  <span
                    class="text-lg sm:text-xl md:text-[22px] font-semibold text-[#1A1919]"
                  >
                    {{ formatPrice(order.total_amount) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useOrder } from "~/composables/useOrder";
import type { Order } from "~/types/order";
import { useProductReviewApi } from "~/composables/useProductReviewApi";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

useHead({
  title: "Detail Pembayaran",
});

const route = useRoute();
const { fetchOrder, formatPaymentStatus, formatOrderStatus } = useOrder();
const { createReview, updateReview, getReviews } = useProductReviewApi();

const order = ref<Order | null>(null);
const isLoadingOrder = ref(false);
const orderError = ref<string | null>(null);
const showReviewModal = ref(false);
const selectedProductId = ref<number | null>(null);
const selectedOrderItemId = ref<number | null>(null);

const reviewForm = reactive({
  rating: 0,
  comment: "",
});

const reviewError = ref<string | null>(null);
const isSubmittingReview = ref(false);
const isEditReviewMode = ref(false);
const editingReviewId = ref<number | null>(null);
const isLoadingReviewData = ref(false);

const orderId = computed(() => {
  const id = route.params.id;
  return id ? parseInt(id as string) : null;
});

const loadOrder = async () => {
  if (!orderId.value) {
    orderError.value = "Order ID tidak ditemukan";
    return;
  }

  isLoadingOrder.value = true;
  orderError.value = null;

  const result = await fetchOrder(orderId.value);

  if (result.success && result.data) {
    order.value = result.data;
  } else {
    orderError.value = result.error?.message || "Gagal memuat data pesanan";
  }

  isLoadingOrder.value = false;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const paymentStatusClass = computed(() => {
  if (!order.value) return "";
  const status = order.value.payment.status;
  if (status === "PAID") return "border-success text-success bg-success/10";
  if (status === "PENDING") return "border-warning text-warning bg-warning/10";
  if (status === "FAILED") return "border-danger text-danger bg-danger/10";
  if (status === "CANCELLED") return "border-danger text-danger bg-danger/10";
  return "border-gray-300 text-gray-600 bg-gray-100";
});

const orderStatusClass = computed(() => {
  if (!order.value) return "";
  const status = order.value.status;
  switch (status) {
    case "PENDING":
      return "border-warning text-warning bg-warning/10";
    case "PACKING":
      return "border-info text-info bg-info/10";
    case "DELIVERING":
      return "border-info text-info bg-info/10";
    case "DELIVERED":
      return "border-success text-success bg-success/10";
    case "COMPLETED":
      return "border-success text-success bg-success/10";
    case "CANCELLED":
      return "border-danger text-danger bg-danger/10";
    default:
      return "border-gray-300 text-gray-600 bg-gray-100";
  }
});

const openReviewModal = async (
  orderItemId: number,
  productId: number,
  reviewId?: number | null,
) => {
  selectedProductId.value = productId;
  selectedOrderItemId.value = orderItemId;
  reviewError.value = null;

  if (reviewId) {
    isEditReviewMode.value = true;
    editingReviewId.value = reviewId;
    isLoadingReviewData.value = true;

    const { data, error } = await getReviews(productId);

    isLoadingReviewData.value = false;

    if (error) {
      reviewError.value = error.message || "Gagal memuat ulasan";
      return;
    }

    // Cari ulasan berdasarkan ID untuk prefilling
    const reviews: any[] = (data as any)?.data || [];
    const existing = reviews.find((r) => r.id === reviewId);

    if (existing) {
      reviewForm.rating = existing.rating ?? 0;
      reviewForm.comment = existing.comment ?? "";
    } else {
      reviewForm.rating = 0;
      reviewForm.comment = "";
    }
  } else {
    isEditReviewMode.value = false;
    editingReviewId.value = null;
    reviewForm.rating = 0;
    reviewForm.comment = "";
  }

  showReviewModal.value = true;
};

const submitReview = async () => {
  if (!selectedProductId.value || !selectedOrderItemId.value) return;

  if (reviewForm.rating < 1 || reviewForm.rating > 5) {
    reviewError.value = "Rating harus antara 1 sampai 5";
    return;
  }

  isSubmittingReview.value = true;
  reviewError.value = null;

  try {
    if (isEditReviewMode.value && editingReviewId.value) {
      const { data, error } = await updateReview(editingReviewId.value, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });

      if (error) {
        reviewError.value = error.message || "Gagal memperbarui ulasan";
        return;
      }

      if ((data as any)?.success || data) {
        showReviewModal.value = false;
        await loadOrder();
      }
    } else {
      const { data, error } = await createReview(selectedProductId.value, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        order_item_id: selectedOrderItemId.value,
      });

      if (error) {
        reviewError.value = error.message || "Gagal mengirim ulasan";
        return;
      }

      if ((data as any)?.success || data) {
        showReviewModal.value = false;
        await loadOrder();
      }
    }
  } finally {
    isSubmittingReview.value = false;
  }
};

onMounted(() => {
  if (orderId.value) {
    loadOrder();
  } else {
    orderError.value = "Order ID tidak ditemukan";
  }
});
</script>
