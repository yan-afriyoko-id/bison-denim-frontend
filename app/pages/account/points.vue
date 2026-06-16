<template>
  <main class="bg-white">
    <Header />
    <div class="min-h-screen flex flex-col">
      <div class="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-10 flex-1">
        <div class="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12.5">
          <!-- Left Sidebar: Account Navigation -->
          <AccountSidebar />

          <!-- Right Content: Points -->
          <div class="flex-1 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-5">
            <h1
              class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919] mb-6 sm:mb-8"
            >
              Poin Saya
            </h1>

            <!-- Loading State -->
            <div v-if="isLoadingPoints" class="text-center py-10">
              <p class="text-sm sm:text-base text-[#7B7B7B]">
                Memuat data poin...
              </p>
            </div>

            <!-- Points Balance Card -->
            <div
              v-else-if="userPoint"
              class="bg-white border border-[#E6E9F0] rounded-lg p-3 sm:p-4 md:p-5 mb-6 sm:mb-8"
            >
              <div class="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-[#E6E9F0]">
                <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">Total Poin</p>
                <p
                  class="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1A1919]"
                >
                  {{ formatNumber(userPoint.points) }}
                </p>
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5"
              >
                <div>
                  <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                    Total Pembelian Kumulatif
                  </p>
                  <p
                    class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]"
                  >
                    {{ formatPrice(userPoint.cumulative_total) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs sm:text-sm text-[#7B7B7B] mb-1">
                    Poin yang Dapat Digunakan
                  </p>
                  <p
                    class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]"
                  >
                    {{ formatNumber(userPoint.minimum_usable_points) }}
                  </p>
                </div>
              </div>

              <!-- Status Badge -->
              <div class="pt-3 sm:pt-4 border-t border-[#E6E9F0]">
                <span
                  v-if="!userPoint.can_use_points"
                  class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-warning/10 text-warning border border-warning rounded-lg text-xs sm:text-sm font-medium"
                >
                  Kumpulkan
                  {{
                    formatNumber(
                      userPoint.minimum_usable_points - userPoint.points,
                    )
                  }}
                  poin lagi agar bisa digunakan
                </span>
                <span
                  v-else
                  class="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-success/10 text-success border border-success rounded-lg text-xs sm:text-sm font-medium"
                >
                  Poin dapat digunakan
                </span>
                <p class="text-sm text-[#7B7B7B] mt-2">
                  *Beli
                  {{
                    formatPrice(
                      userPoint.million_threshold -
                        (userPoint.cumulative_total %
                          userPoint.million_threshold),
                    )
                  }}
                  lagi untuk dapat
                  {{ formatNumber(userPoint.points_per_million) }} poin
                </p>
              </div>
            </div>

            <!-- Transaction History -->
            <div
              class="bg-white border border-[#E6E9F0] rounded-lg p-3 sm:p-4 md:p-5"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5"
              >
                <h2
                  class="text-base sm:text-lg md:text-xl font-semibold text-[#1A1919]"
                >
                  Riwayat Transaksi Poin
                </h2>
                <div class="flex gap-2">
                  <button
                    v-for="tab in tabs"
                    :key="tab.value"
                    @click="activeTransactionTab = tab.value"
                    :class="[
                      'px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base md:text-lg font-medium transition hover:cursor-pointer',
                      activeTransactionTab === tab.value
                        ? 'bg-[#E9322B] text-white'
                        : 'bg-[#F8F8F8] text-[#7B7B7B] hover:bg-[#7B7B7B]/9',
                    ]"
                  >
                    {{ tab.label }}
                  </button>
                </div>
              </div>

              <!-- Loading Transactions -->
              <div v-if="isLoadingTransactions" class="text-center py-10">
                <p class="text-sm sm:text-base text-[#7B7B7B]">
                  Memuat riwayat transaksi...
                </p>
              </div>

              <!-- Transaction List -->
              <div v-else class="space-y-4 sm:space-y-5">
                <div
                  v-for="transaction in displayedTransactions"
                  :key="transaction.id"
                  class="bg-white border border-[#E6E9F0] rounded-lg p-3 sm:p-4 md:p-5"
                >
                  <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                  >
                    <div class="flex-1">
                      <div
                        class="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap"
                      >
                        <span
                          :class="[
                            'px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-medium',
                            transaction.transaction_type === 'EARNED'
                              ? 'bg-success/10 text-success border border-success'
                              : transaction.transaction_type === 'USED'
                                ? 'bg-danger/10 text-danger border border-danger'
                                : 'bg-gray-100 text-gray-600 border border-gray-300',
                          ]"
                        >
                          {{
                            formatTransactionType(transaction.transaction_type)
                          }}
                        </span>
                        <span class="text-xs sm:text-sm text-[#7B7B7B]">
                          {{ formatDate(transaction.created_at) }}
                        </span>
                      </div>
                      <p class="text-sm sm:text-base text-[#1A1919] mb-1">
                        {{ transaction.description || "Transaksi poin" }}
                      </p>
                    </div>
                    <div class="text-right sm:text-left sm:ml-auto">
                      <p
                        :class="[
                          'text-base sm:text-lg md:text-xl font-semibold',
                          transaction.transaction_type === 'EARNED'
                            ? 'text-green-600'
                            : transaction.transaction_type === 'USED'
                              ? 'text-[#E9322B]'
                              : 'text-[#7B7B7B]',
                        ]"
                      >
                        {{ transaction.points > 0 ? "+" : "-"
                        }}{{ formatNumber(Math.abs(transaction.points)) }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  v-if="displayedTransactions.length === 0"
                  class="text-center py-8 sm:py-12"
                >
                  <p class="text-sm sm:text-base text-[#7B7B7B] py-20 sm:py-30">
                    Belum ada riwayat transaksi poin
                  </p>
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
import { usePointApi } from "~/composables/usePointApi";
import type { UserPoint, UserPointTransaction } from "~/types/point";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

useHead({
  title: "Poin Saya",
});

const { getPoints, getPointTransactions } = usePointApi();

const userPoint = ref<UserPoint | null>(null);
const transactions = ref<UserPointTransaction[]>([]);
const isLoadingPoints = ref(true);
const isLoadingTransactions = ref(true);
const activeTransactionTab = ref<"all" | "EARNED" | "USED">("all");
const tabs = [
  { value: "all", label: "Semua" },
  { value: "EARNED", label: "Diterima" },
  { value: "USED", label: "Digunakan" },
];

// Load points balance
const loadPoints = async () => {
  isLoadingPoints.value = true;
  const result = await getPoints();
  if (result.data?.success && result.data.data) {
    userPoint.value = result.data.data;
  }
  isLoadingPoints.value = false;
};

// Load transactions
const loadTransactions = async () => {
  isLoadingTransactions.value = true;
  const result = await getPointTransactions({
    per_page: 50,
  });
  if (result.data?.success && result.data.data) {
    transactions.value = result.data.data.transactions || [];
  }
  isLoadingTransactions.value = false;
};

onMounted(() => {
  loadPoints();
  loadTransactions();
});

// Filter transactions
const displayedTransactions = computed(() => {
  if (activeTransactionTab.value === "all") {
    return transactions.value;
  }
  return transactions.value.filter(
    (t) => t.transaction_type === activeTransactionTab.value,
  );
});

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("id-ID").format(num);
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
  }).format(date);
};

const formatTransactionType = (type: string) => {
  const types: Record<string, string> = {
    EARNED: "Diterima",
    USED: "Digunakan",
    EXPIRED: "Kadaluarsa",
    ADJUSTMENT: "Penyesuaian",
  };
  return types[type] || type;
};
</script>
