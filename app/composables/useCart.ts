import type { CartItemResponse, CartCalculation } from "~/types/cart";

export const useCart = () => {
  const { baseURL, getHeaders } = useApiBase();
  const auth = useAuth();
  const { showToast } = useToast();

  const cartData = useState<{
    cart: CartItemResponse[];
    outOfStock: CartItemResponse[];
    calculation: CartCalculation;
  } | null>("cart:data", () => null);

  const isLoading = useState("cart:isLoading", () => false);
  const showPopupCart = useState("cart:showPopupCart", () => false);
  const selectedForCheckout = useCookie<number[]>(
    "cart_selected_for_checkout",
    {
      default: () => [],
    },
  );

  const loadCart = async () => {
    if (!auth.isAuthenticated.value) {
      cartData.value = null;
      return;
    }

    isLoading.value = true;
    try {
      const response = await $fetch(`${baseURL}/cart`, {
        headers: getHeaders(),
      });

      if (!response.success)
        throw new Error(response.message || "Gagal load cart");

      cartData.value = response.data;
    } catch (err) {
      console.error("Load cart error:", err);
      showToast("Gagal memuat keranjang", "error");
      cartData.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const addToCart = async (
    variantId: number,
    qty: number = 1,
    note: string | null = null,
    storeId: number | null = null,
    is_protected: boolean = false,
  ) => {
    if (!auth.isAuthenticated.value) {
      showToast("Silahkan login terlebih dahulu", "error");
      return navigateTo("/login");
    }

    isLoading.value = true;
    try {
      const response = await $fetch(`${baseURL}/cart/items`, {
        method: "POST",
        body: {
          variant_id: variantId,
          qty,
          note,
          store_id: storeId,
          is_protected,
        },
        headers: getHeaders(),
      });

      if (!response.success)
        throw new Error(response.message || "Gagal tambah item");

      await loadCart();
      showToast("Produk ditambahkan ke keranjang", "success");
    } catch (err) {
      showToast("Gagal menambah ke keranjang", "error");
    } finally {
      isLoading.value = false;
    }
  };

  const updateCartItem = async (
    variantId: number,
    qty: number,
    note: string | null = null,
  ) => {
    if (!auth.isAuthenticated.value) return;

    isLoading.value = true;
    try {
      const response = await $fetch(`${baseURL}/cart/items/${variantId}`, {
        method: "PUT",
        body: { qty, note },
        headers: getHeaders(),
      });

      if (!response.success) throw new Error(response.message);

      await loadCart();
    } catch (err) {
      showToast("Gagal update item", "error");
    } finally {
      isLoading.value = false;
    }
  };

  const removeFromCart = async (variantId: number) => {
    if (!auth.isAuthenticated.value) return;

    isLoading.value = true;
    try {
      const response = await $fetch(`${baseURL}/cart/items/${variantId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.success) throw new Error(response.message);

      await loadCart();
    } catch (err) {
      showToast("Gagal hapus item", "error");
    } finally {
      isLoading.value = false;
    }
  };

  const clearCart = async () => {
    if (!auth.isAuthenticated.value) return;

    isLoading.value = true;
    try {
      const response = await $fetch(`${baseURL}/cart`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.success) throw new Error(response.message);

      await loadCart();
      showToast("Keranjang dikosongkan", "success");
    } catch (err) {
      showToast("Gagal kosongkan keranjang", "error");
    } finally {
      isLoading.value = false;
    }
  };

  const togglePopupCart = () => {
    if (!auth.isAuthenticated.value) {
      showToast("Login terlebih dahulu", "warning");
      return navigateTo("/login");
    }

    showPopupCart.value = !showPopupCart.value;

    if (showPopupCart.value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const closePopupCart = () => {
    showPopupCart.value = false;
    document.body.classList.remove("overflow-hidden");
  };

  const checkoutCart = computed(() => {
    if (!cartData.value?.cart?.length) return [];
    const ids = selectedForCheckout.value;
    if (ids.length === 0) return [];
    return cartData.value.cart.filter((item) => ids.includes(item.variant_id));
  });

  /** Calculation for selected checkout items only. */
  const checkoutCalculation = computed((): CartCalculation => {
    const items = checkoutCart.value;
    if (items.length === 0) {
      return { sub_total: 0, total_cart: 0, total_weight: 0, discount: 0 };
    }
    const sub_total = items.reduce((sum, i) => sum + i.sub_total, 0);
    const total_cart = items.reduce((sum, i) => sum + i.qty, 0);
    const total_weight = items.reduce(
      (sum, i) => sum + (i.weight || 1000) * i.qty,
      0,
    );
    return { sub_total, total_cart, total_weight, discount: 0 };
  });

  const setSelectedForCheckout = (variantIds: number[]) => {
    selectedForCheckout.value = variantIds;
  };

  const toggleSelectedForCheckout = (variantId: number) => {
    const ids = [...selectedForCheckout.value];
    const idx = ids.indexOf(variantId);
    if (idx >= 0) ids.splice(idx, 1);
    else ids.push(variantId);
    selectedForCheckout.value = ids;
  };

  const isSelectedForCheckout = (variantId: number) => {
    return selectedForCheckout.value.includes(variantId);
  };

  const selectAllForCheckout = () => {
    if (!cartData.value?.cart?.length) {
      selectedForCheckout.value = [];
      return;
    }
    selectedForCheckout.value = cartData.value.cart.map((i) => i.variant_id);
  };

  const clearSelectionForCheckout = () => {
    selectedForCheckout.value = [];
  };

  const hasSelectionForCheckout = computed(
    () => selectedForCheckout.value.length > 0,
  );

  const getCartItemCount = computed(() => {
    return cartData.value?.cart?.reduce((sum, item) => sum + item.qty, 0) || 0;
  });

  const isCartEmpty = computed(() => {
    return !cartData.value?.cart?.length;
  });

  watch(
    () => auth.isAuthenticated.value,
    (isAuth) => {
      if (isAuth) {
        loadCart();
      } else {
        cartData.value = null;
        selectedForCheckout.value = [];
      }
    },
    { immediate: true },
  );

  return {
    cartData: readonly(cartData),
    isLoading: readonly(isLoading),
    showPopupCart,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    togglePopupCart,
    closePopupCart,
    getCartItemCount,
    isCartEmpty,
    selectedForCheckout: readonly(selectedForCheckout),
    checkoutCart,
    checkoutCalculation,
    setSelectedForCheckout,
    toggleSelectedForCheckout,
    isSelectedForCheckout,
    selectAllForCheckout,
    clearSelectionForCheckout,
    hasSelectionForCheckout,
  };
};
