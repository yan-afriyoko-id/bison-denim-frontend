<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4"
    @click.self="handleClose"
  >
    <div
      class="bg-white rounded-[10px] w-full max-w-[766px] max-h-[90vh] overflow-y-auto px-4 sm:px-5 md:px-6 py-5 sm:py-6 md:py-8"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 sm:mb-5">
        <h2 class="text-xl sm:text-2xl font-semibold text-[#1A1919]">
          Pilih Opsi Pengiriman
        </h2>
        <button
          @click="handleClose"
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
      <div class="space-y-4 sm:space-y-5">
        <!-- Loading -->
        <div v-if="loadingShippingCost" class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9322B]"
          ></div>
          <p class="mt-3 text-sm text-[#7B7B7B]">Menghitung ongkir...</p>
        </div>

        <!-- Error -->
        <div
          v-else-if="shippingError"
          class="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {{ shippingError }}
        </div>

        <!-- Shipping Options -->
        <div
          v-else-if="shippingCosts.length > 0"
          class="space-y-2 sm:space-y-2.5"
        >
          <div
            v-for="(cost, index) in shippingCosts"
            :key="index"
            @click="selectedShippingCost = cost"
            class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-md cursor-pointer hover:border-[#E9322B] hover:bg-[#E9322B14] transition"
            :class="{
              'border-[#E9322B] bg-[#E9322B14]':
                selectedShippingCost?.agent === cost.agent &&
                selectedShippingCost?.service === cost.service,
              'border-[#E6E9F0]':
                selectedShippingCost?.agent !== cost.agent ||
                selectedShippingCost?.service !== cost.service,
            }"
          >
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2 mb-1">
                <div class="flex-1 min-w-0">
                  <span
                    class="text-sm sm:text-base font-semibold text-[#1A1919]"
                  >
                    {{ cost.agent.toUpperCase() }} - {{ cost.service }}
                  </span>
                </div>
                <span
                  class="text-sm sm:text-base md:text-lg font-semibold text-[#1A1919] whitespace-nowrap"
                >
                  {{ formatPrice(cost.cost) }}
                </span>
              </div>
              <p class="text-xs sm:text-sm text-[#7B7B7B]">
                Estimasi tiba {{ cost.etd }} hari
              </p>
            </div>
          </div>
        </div>

        <!-- No options -->
        <div
          v-else-if="!loadingShippingCost && !shippingError"
          class="text-center py-8"
        >
          <p class="text-sm text-[#7B7B7B]">
            Tidak ada opsi pengiriman tersedia untuk alamat ini
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ShippingCost {
  agent: string; // ← ubah dari courier ke agent
  service: string;
  cost: number;
  etd: string;
  storeName?: string;
  storeId?: number;
}

const props = defineProps<{
  modelValue: boolean;
  shippingCosts: ShippingCost[];
  loadingShippingCost: boolean;
  shippingError: string | null;
  storeKey: number | string | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [boolean];
  "update:courier": [
    {
      agent: string;
      service: string;
      service_desc: string;
      etd: string;
      cost: number;
    },
    storeKey?: number | string | null,
  ];
}>();

const selectedShippingCost = ref<ShippingCost | null>(null);

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);

const emitCourierUpdate = (
  cost: ShippingCost | null,
  storeKey?: number | string | null,
) => {
  if (!cost) return;
  emit(
    "update:courier",
    {
      agent: cost.agent,
      service: cost.service,
      service_desc: `${cost.agent.toUpperCase()} ${cost.service}`,
      etd: cost.etd,
      cost: cost.cost,
    },
    storeKey,
  );
};

watch(selectedShippingCost, (newCost) => {
  emitCourierUpdate(newCost, props.storeKey);
});

const handleClose = () => emit("update:modelValue", false);
</script>
