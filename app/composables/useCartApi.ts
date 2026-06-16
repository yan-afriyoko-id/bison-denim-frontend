export const useCartApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  const getCart = async () => {
    try {
      const response = await $fetch(`${baseURL}/cart`, {
        method: "GET",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message } };
    }
  };

  const addCartItem = async (data: {
    variant_id: number;
    qty: number;
    note?: string | null;
    store_id?: number | null;
    is_protected: boolean;
  }) => {
    try {
      const response = await $fetch(`${baseURL}/cart/items`, {
        method: "POST",
        body: data,
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message } };
    }
  };

  const updateCartItemApi = async (
    variantId: number,
    data: { qty: number; note?: string | null },
  ) => {
    try {
      const response = await $fetch(`${baseURL}/cart/items/${variantId}`, {
        method: "PUT",
        body: data,
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message } };
    }
  };

  const removeCartItemApi = async (variantId: number) => {
    try {
      const response = await $fetch(`${baseURL}/cart/items/${variantId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message } };
    }
  };

  const clearCartApi = async () => {
    try {
      const response = await $fetch(`${baseURL}/cart`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return { data: null, error: error.data || { message: error.message } };
    }
  };

  return {
    getCart,
    addCartItem,
    updateCartItemApi,
    removeCartItemApi,
    clearCartApi,
  };
};
