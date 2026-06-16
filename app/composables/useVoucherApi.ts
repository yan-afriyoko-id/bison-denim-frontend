import { ref, computed } from "vue";
import type { Voucher } from "~/types/voucher";
import { useCart } from "~/composables/useCart";

export const useVoucher = () => {
  const token = useCookie("auth_token");
  const { checkoutCalculation, checkoutCart } = useCart();
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  const vouchers = ref<Voucher[]>([]);
  const selectedVoucher = ref<Voucher | null>(null);
  const discountAmount = ref<number>(0);

  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getSubTotal = () => {
    return checkoutCalculation.value.sub_total;
  };

  const getProductIds = () => {
    return checkoutCart.value.map((i) => i.product_id);
  };

  const fetchApplicableVouchers = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const res: any = await $fetch(`${apiBase}/vouchers/applicable`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          product_ids: getProductIds(),
          sub_total: getSubTotal(),
        },
      });

      vouchers.value = res.data ?? [];
    } catch (err: any) {
      error.value = err?.data?.message ?? "Gagal mengambil voucher";
    } finally {
      isLoading.value = false;
    }
  };

  const validateVoucherCode = async (code: string) => {
    try {
      isLoading.value = true;
      error.value = null;

      const res: any = await $fetch(`${apiBase}/vouchers/validate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: {
          code,
          product_ids: getProductIds(),
          sub_total: getSubTotal(),
        },
      });

      selectedVoucher.value = res.data.voucher;
      discountAmount.value = res.data.discount_amount;

      console.log("validated voucher:", res.data.voucher);

      return true;
    } catch (err: any) {
      selectedVoucher.value = null;
      discountAmount.value = 0;
      error.value = err?.data?.message ?? "Voucher tidak valid";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const applyVoucher = (voucher: Voucher, discount: number) => {
    selectedVoucher.value = voucher;
    discountAmount.value = discount;
  };

  const removeVoucher = () => {
    selectedVoucher.value = null;
    discountAmount.value = 0;
  };

  const applicableVouchers = computed(() => vouchers.value);

  return {
    vouchers,
    selectedVoucher,
    discountAmount,
    applicableVouchers,
    isLoading,
    errorVoucher: error,
    fetchApplicableVouchers,
    validateVoucherCode,
    applyVoucher,
    removeVoucher,
  };
};
