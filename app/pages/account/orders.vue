<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
        <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
          <!-- Left Sidebar: Account Navigation -->
          <AccountSidebar />

          <!-- Right Content: Orders -->
          <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
            <!-- Order Status Tabs -->
            <div class="flex flex-wrap gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
              <button
                @click="setTab('unpaid')"
                :class="[
                  'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:cursor-pointer',
                  activeTab === 'unpaid'
                    ? 'bg-[#E9322B] text-white'
                    : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
                ]"
              >
                Belum Bayar ({{ unpaidOrders.length }})
              </button>
              <button
                @click="setTab('paid')"
                :class="[
                  'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:cursor-pointer',
                  activeTab === 'paid'
                    ? 'bg-[#E9322B] text-white'
                    : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
                ]"
              >
                Sudah Bayar ({{ paidOrders.length }})
              </button>
              <button
                @click="setTab('cancelled')"
                :class="[
                  'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:cursor-pointer',
                  activeTab === 'cancelled'
                    ? 'bg-[#E9322B] text-white'
                    : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
                ]"
              >
                Dibatalkan ({{ cancelledOrders.length }})
              </button>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading && !isPolling" class="text-center py-10">
              <p class="text-sm sm:text-base text-[#7B7B7B]">
                Memuat data pesanan...
              </p>
            </div>

            <!-- Polling State -->
            <div v-if="isPolling" class="text-center py-10">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9322B] mb-3"></div>
              <p class="text-sm sm:text-base text-[#7B7B7B]">
                Menunggu konfirmasi pembayaran...
              </p>
              <p class="text-xs text-[#ACACAC] mt-1">
                Halaman akan diperbarui secara otomatis
              </p>
            </div>

            <!-- Order List -->
            <div v-else class="space-y-4 sm:space-y-5">
              <div
                v-for="order in displayedOrders"
                :key="order.id"
                class="bg-white border border-[#E6E9F0] rounded-lg p-3 sm:p-4 md:p-5"
              >
                <!-- Order Header -->
                <div
                  class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 pb-3 border-b border-[#E6E9F0]"
                >
                  <div>
                    <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                      Nomor Pesanan
                    </p>
                    <p
                      class="text-sm sm:text-base font-semibold text-[#1A1919]"
                    >
                      {{ order.order_number }}
                    </p>
                  </div>
                  <div class="flex flex-col items-end gap-2">
                    <div class="text-right">
                      <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                        Tanggal
                      </p>
                      <p class="text-sm sm:text-base text-[#1A1919]">
                        {{ formatDate(order.created_at) }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                        Status Pesanan
                      </p>
                      <span
                        :class="orderStatusClass(order.status)"
                        class="inline-block px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium"
                      >
                        {{ formatOrderStatus(order.status) }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Order Items -->
                <div class="space-y-3 sm:space-y-4 mb-4">
                  <div
                    v-for="item in order.order_items || []"
                    :key="item.id"
                    class="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <!-- Product Image -->
                    <NuxtImg
                      :src="item.product_image || '/assets/img/placeholder.png'"
                      :alt="item.product_name"
                      width="120"
                      height="120"
                      class="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-lg shrink-0"
                      fit="cover"
                    />

                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h3
                        class="text-sm sm:text-base font-medium text-[#1A1919] mb-1 line-clamp-2"
                      >
                        {{ item.product_name }}
                      </h3>
                      <p
                        v-if="item.variant_description"
                        class="text-xs sm:text-sm text-[#7B7B7B] mb-2"
                      >
                        {{ item.variant_description }}
                      </p>
                      <div class="flex items-center justify-between">
                        <p class="text-sm sm:text-base text-[#7B7B7B]">
                          Qty: {{ item.qty }}
                        </p>
                        <p
                          class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]"
                        >
                          {{ formatPrice(item.purchase_price * item.qty) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Summary -->
                <div
                  class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-[#E6E9F0]"
                >
                  <div>
                    <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                      Total Pesanan
                    </p>
                    <p
                      class="text-lg sm:text-xl md:text-2xl font-semibold text-[#1A1919]"
                    >
                      {{ formatPrice(order.total_amount) }}
                    </p>
                    <p class="text-xs sm:text-sm text-[#7B7B7B] mt-1">
                      Status:
                      <span :class="paymentStatusClass(order.payment.status)">
                        {{ formatPaymentStatus(order.payment.status) }}
                      </span>
                    </p>
                    <p
                      v-if="order.courier?.resi_number"
                      class="text-xs sm:text-sm text-[#7B7B7B] mt-1"
                    >
                      Nomor Resi:
                      <span class="font-medium text-[#1A1919]">{{
                        order.courier.resi_number
                      }}</span>
                    </p>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
                    <button
                      v-if="
                        order.payment.status === 'PAID' &&
                        order.status === 'DELIVERED'
                      "
                      @click="handleCompleted(order.id)"
                      class="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#D32A24] transition hover:cursor-pointer"
                    >
                      Selesai
                    </button>
                    <NuxtLink
                      :to="`/payment/${order.id}`"
                      class="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#C4282B] transition text-center hover:cursor-pointer"
                    >
                      Detail
                    </NuxtLink>
                    <button
                      v-if="
                        order.payment.status === 'PENDING' &&
                        order.status !== 'CANCELLED'
                      "
                      :disabled="isOrderPaying(order.id)"
                      @click="openPaymentModal(order)"
                      class="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-[#E9322B] text-white rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#D32A24] transition hover:cursor-pointer"
                    >
                      {{ isOrderPaying(order.id) ? "Memproses..." : "Bayar" }}
                    </button>
                    <button
                      v-if="
                        order.payment.status === 'PENDING' &&
                        order.status !== 'CANCELLED'
                      "
                      @click="handleCancel(order.id)"
                      class="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border border-[#7B7B7B] text-[#7B7B7B] rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-[#7B7B7B]/10 transition hover:cursor-pointer"
                    >
                      Batalkan
                    </button>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div
                v-if="displayedOrders.length === 0"
                class="text-center py-8 sm:py-12"
              >
                <p class="text-sm sm:text-base text-[#7B7B7B] py-20 sm:py-30">
                  {{
                    activeTab === "unpaid"
                      ? "Tidak ada pesanan yang belum dibayar"
                      : activeTab === "paid"
                        ? "Tidak ada pesanan yang sudah dibayar"
                        : "Tidak ada pesanan yang dibatalkan"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <!-- Payment Method Selection Modal -->
    <Teleport to="body">
      <div
        v-if="showPaymentModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="showPaymentModal = false"
      >
        <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
          <h3 class="text-lg font-semibold text-[#1A1919] mb-2">Pilih Metode Pembayaran</h3>
          <p class="text-sm text-[#7B7B7B] mb-4">Pilih metode pembayaran untuk melanjutkan</p>
          <div class="space-y-3">
            <label
              v-for="gw in paymentMethods"
              :key="gw.key"
              class="flex items-center gap-3 p-4 border rounded-lg transition"
              :class="[
                selectedPaymentMethod === gw.key ? 'border-[#E9322B] bg-[#E9322B14]' : 'border-[#E6E9F0]',
                gw.active ? 'cursor-pointer hover:border-[#E9322B]' : 'opacity-50'
              ]"
            >
              <input
                type="radio"
                name="paymentMethod"
                :value="gw.key"
                v-model="selectedPaymentMethod"
                :disabled="!gw.active"
                class="accent-[#E9322B]"
              />
              <div>
                <span class="text-sm font-medium text-[#1A1919] capitalize">{{ gw.label }}</span>
                <p class="text-xs text-[#ACACAC]">{{ gw.description }}</p>
              </div>
            </label>
          </div>
          <div class="flex gap-3 mt-6">
            <button
              @click="showPaymentModal = false"
              class="flex-1 px-4 py-2.5 border border-[#E6E9F0] text-[#7B7B7B] rounded-lg text-sm font-medium hover:bg-gray-50 transition hover:cursor-pointer"
            >
              Batal
            </button>
            <button
              @click="proceedPayment"
              :disabled="!selectedPaymentMethod"
              class="flex-1 px-4 py-2.5 bg-[#E9322B] text-white rounded-lg text-sm font-medium hover:bg-[#C4282B] transition hover:cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Cancel Order Confirmation Modal -->
    <ConfirmModal
      v-model="showCancelConfirmModal"
      title="Batalkan Pesanan?"
      message="Kamu akan membatalkan pesanan ini."
      confirmText="Batalkan"
      @confirm="confirmCancelOrder"
    />
  </main>
</template>

<script setup lang="ts">
import { useOrder } from "~/composables/useOrder";
import { useOrderApi } from "~/composables/useOrderApi";
import { usePaymentApi } from "~/composables/usePaymentApi";
import type { Order } from "~/types/order";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

useHead({
  title: "Daftar Pesanan",
});

const {
  fetchOrders,
  fetchOrder,
  formatPaymentStatus,
  formatOrderStatus,
  isLoading,
} = useOrder();
const { cancelOrder, completeOrder, confirmPayment } = useOrderApi();
const { getSnapToken, getXenditInvoice, getActivePaymentGateways } = usePaymentApi();

const route = useRoute();
const router = useRouter();

const validTabs = new Set(["unpaid", "paid", "cancelled"]);
const initialTabRaw = route.query.tab;
const initialTab = initialTabRaw ? String(initialTabRaw) : "unpaid";
const activeTab = ref<"unpaid" | "paid" | "cancelled">(
  validTabs.has(initialTab) ? (initialTab as any) : "unpaid",
);
const processingPaymentOrderId = ref<number | null>(null);
const isPolling = ref(false);

const allPaymentMethods = [
  { key: "midtrans", label: "Midtrans", description: "Kartu Kredit / Transfer / E-Wallet" },
  { key: "xendit", label: "Xendit", description: "Virtual Account / Retail / E-Wallet" },
];
const showPaymentModal = ref(false);
const payingOrderId = ref<number | null>(null);
const activeGateways = ref<string[]>([]);
const selectedPaymentMethod = ref<string>("");

const paymentMethods = computed(() =>
  allPaymentMethods.map((m) => ({
    ...m,
    active: activeGateways.value.includes(m.key),
  })),
);

const isXenditInvoiceUrl = (value?: string | null) => {
  return typeof value === "string" && /^https?:\/\/.+xendit\.co/i.test(value);
};

const getOrderPaymentGateway = (order: any) => {
  if (order?.payment?.method === "xendit" || isXenditInvoiceUrl(order?.payment?.snap_token)) {
    return "xendit";
  }

  if (order?.payment?.method === "midtrans") {
    return "midtrans";
  }

  return null;
};

const isOrderPaying = (orderId: number) => processingPaymentOrderId.value === orderId;

const openPaymentModal = async (order: any) => {
  const gateway = getOrderPaymentGateway(order);
  payingOrderId.value = order.id;
  try {
    const gateways = await getActivePaymentGateways();
    activeGateways.value = gateways;
  } catch {
    activeGateways.value = ["midtrans"];
  }

  const gatewayStillActive = gateway && activeGateways.value.includes(gateway);
  selectedPaymentMethod.value = gatewayStillActive
    ? gateway
    : activeGateways.value[0] || "";
  showPaymentModal.value = true;
};

const proceedPayment = async () => {
  if (!payingOrderId.value || !selectedPaymentMethod.value) return;
  const orderId = payingOrderId.value;
  const paymentMethod = selectedPaymentMethod.value;

  showPaymentModal.value = false;
  if (paymentMethod === "xendit") {
    await handlePayXendit(orderId);
  } else {
    await handlePay(orderId, paymentMethod);
  }
  payingOrderId.value = null;
};

// Keep activeTab in sync with the URL query param
watch(
  () => route.query.tab,
  (newVal) => {
    const t = newVal ? String(newVal) : "unpaid";
    if (validTabs.has(t)) activeTab.value = t as any;
  },
);

const setTab = (tab: "unpaid" | "paid" | "cancelled") => {
  if (activeTab.value === tab) return;
  activeTab.value = tab;
  // Update URL query param without navigating away
  router.replace({ query: { ...route.query, tab } });
};
const showCancelConfirmModal = ref(false);
const orderToCancelId = ref<number | null>(null);
const orders = ref<Order[]>([]);

// Fetch orders on mount
const loadOrders = async () => {
  const result = await fetchOrders({
    per_page: 50,
  });

  if (result.success && result.data) {
    orders.value = result.data.orders || [];
  }
};

const isXenditSuccessReturn = () => {
  return route.query.xendit_return === "success" || route.query.status === "PAID";
};

const syncPendingXenditOrders = async () => {
  const returnedOrderId = Number(route.query.order_id);
  const hasReturnedOrderId = Number.isFinite(returnedOrderId) && returnedOrderId > 0;

  const candidates = orders.value.filter((order) => {
    if (order.payment.status !== "PENDING") return false;
    if (hasReturnedOrderId) return order.id === returnedOrderId;

    return order.payment.method === "xendit";
  });

  await Promise.all(candidates.map((order) => confirmPayment(order.id)));
};

onMounted(async () => {
  const shouldSyncXendit = isXenditSuccessReturn();

  await loadOrders();

  if (shouldSyncXendit) {
    await syncPendingXenditOrders();
    await loadOrders();
  }

  if (activeTab.value !== "paid" || paidOrders.value.length > 0) return;

  isPolling.value = true;
  let retries = 0;
  const maxRetries = 5;

  const poll = async () => {
    retries++;

    if (shouldSyncXendit) {
      await syncPendingXenditOrders();
    }

    await loadOrders();

    if (paidOrders.value.length > 0 || retries >= maxRetries) {
      isPolling.value = false;
      return;
    }

    setTimeout(poll, 3000);
  };

  setTimeout(poll, 3000);
});

// Filter orders by payment status
const unpaidOrders = computed(() => {
  return orders.value.filter((order) => order.payment.status === "PENDING");
});

const paidOrders = computed(() => {
  return orders.value.filter((order) => order.payment.status === "PAID");
});

const cancelledOrders = computed(() => {
  return orders.value.filter(
    (order) =>
      order.status === "CANCELLED" ||
      order.payment.status === "FAILED" ||
      order.payment.status === "CANCELLED",
  );
});

const displayedOrders = computed(() => {
  if (activeTab.value === "unpaid") {
    return unpaidOrders.value;
  } else if (activeTab.value === "paid") {
    return paidOrders.value;
  } else {
    return cancelledOrders.value;
  }
});

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
  }).format(date);
};

const paymentStatusClass = (status: string) => {
  if (status === "PAID") return "text-success";
  if (status === "PENDING") return "text-warning";
  if (status === "FAILED" || status === "CANCELLED") return "text-danger";
  return "text-gray-600";
};

const orderStatusClass = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-warning/10 text-warning border border-warning";
    case "PACKING":
      return "bg-info/10 text-info border border-info";
    case "DELIVERING":
      return "bg-primary/10 text-primary border border-primary";
    case "DELIVERED":
      return "bg-success/10 text-success border border-success";
    case "COMPLETED":
      return "bg-success/10 text-success border border-success";
    case "CANCELLED":
      return "bg-danger/10 text-danger border border-danger";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-300";
  }
};

const handleCompleted = async (orderId: number) => {
  const result = await completeOrder(orderId);
  console.log(result);
  if (result.data.success) {
    await navigateTo(`/payment/${orderId}`);
  }
};

const handlePay = async (orderId: number, paymentMethod = "midtrans") => {
  try {
    processingPaymentOrderId.value = orderId;
    const { snap_token } = await getSnapToken(orderId, paymentMethod);

    if (!snap_token) {
      processingPaymentOrderId.value = null;
      alert("Gagal mendapatkan token pembayaran");
      return;
    }

    if (isXenditInvoiceUrl(snap_token)) {
      processingPaymentOrderId.value = null;
      window.location.href = snap_token;
      return;
    }

    await loadMidtransSnap();
    processingPaymentOrderId.value = null;
    (window as any).snap.pay(snap_token, {
      onSuccess: async (result: any) => {
        await confirmPayment(orderId, {
          transaction_status: result?.transaction_status,
          transaction_id: result?.transaction_id,
          payment_type: result?.payment_type,
          gross_amount: result?.gross_amount,
        });
        await loadOrders();
        await navigateTo("/account/orders?tab=paid");
      },
      onPending: async () => {
        await loadOrders();
        await navigateTo("/account/orders?tab=unpaid");
      },
      onError: (err: any) => {
        processingPaymentOrderId.value = null;
        alert("Pembayaran gagal. Silakan coba lagi.");
      },
      onClose: () => {
        processingPaymentOrderId.value = null;
        loadOrders();
        navigateTo("/account/orders?tab=unpaid");
      },
    });
  } catch (error: any) {
    processingPaymentOrderId.value = null;
    console.error("Error processing payment:", error);
    alert(error?.data?.message || "Gagal memproses pembayaran");
  }
};

const handlePayXendit = async (orderId: number) => {
  try {
    processingPaymentOrderId.value = orderId;
    const redirectUrl = window.location.origin + "/account/orders?tab=paid";
    const { invoice_url } = await getXenditInvoice(orderId, redirectUrl);
    processingPaymentOrderId.value = null;
    if (!invoice_url) {
      alert("Gagal mendapatkan invoice pembayaran");
      return;
    }
    window.location.href = invoice_url;
  } catch (error) {
    processingPaymentOrderId.value = null;
    console.error("Error processing Xendit payment:", error);
    alert("Gagal memproses pembayaran Xendit");
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

const handleCancel = (orderId: number) => {
  orderToCancelId.value = orderId;
  showCancelConfirmModal.value = true;
};

const confirmCancelOrder = async () => {
  if (orderToCancelId.value !== null) {
    try {
      const result = await cancelOrder(orderToCancelId.value);

      if (result.error || !result.data?.success) {
        alert(result.error?.message || "Gagal membatalkan pesanan");
        return;
      }

      // Reload orders to get updated list
      await loadOrders();

      showCancelConfirmModal.value = false;
      orderToCancelId.value = null;
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Terjadi kesalahan saat membatalkan pesanan");
    }
  }
};
</script>
