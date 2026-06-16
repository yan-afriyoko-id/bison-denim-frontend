// composables/useProductReviewApi.ts
export const useProductReviewApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  // Helper fetch dengan error handling standar
  const fetchWithHandling = async <T>(
    url: string,
    options: any = {},
  ): Promise<{
    data: T | null;
    error: any | null;
  }> => {
    try {
      const response = await $fetch<T>(url, {
        ...options,
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (err: any) {
      const errorData = err.data || {
        message: err.message || "Terjadi kesalahan",
      };
      return { data: null, error: errorData };
    }
  };

  /**
   * Ambil semua ulasan yang sudah disetujui untuk satu produk
   */
  const getReviews = async (productId: number | string) => {
    return fetchWithHandling(`${baseURL}/products/${productId}/reviews`);
  };

  /**
   * Buat ulasan baru
   * @param productId - ID produk yang di-review
   * @param payload - rating wajib, comment opsional, order_item_id wajib jika pakai validasi per item
   */
  const createReview = async (
    productId: number | string,
    payload: {
      rating: number;
      comment?: string;
      order_item_id?: number; // opsional sekarang, tapi sangat disarankan
    },
  ) => {
    return fetchWithHandling(`${baseURL}/products/${productId}/reviews`, {
      method: "POST",
      body: payload,
    });
  };

  /**
   * Update ulasan (hanya dalam 1 jam setelah dibuat)
   * @param reviewId - ID ulasan yang akan diupdate
   * @param payload - hanya rating dan comment yang boleh diubah
   */
  const updateReview = async (
    reviewId: number | string,
    payload: {
      rating: number;
      comment?: string;
    },
  ) => {
    return fetchWithHandling(`${baseURL}/reviews/${reviewId}`, {
      method: "PUT",
      body: payload,
    });
  };

  return {
    getReviews,
    createReview,
    updateReview,
  };
};
