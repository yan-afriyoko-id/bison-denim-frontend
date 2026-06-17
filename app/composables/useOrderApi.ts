/**
 * Order API composable
 * Handles all order-related API calls
 */
import type { OrdersResponse, OrderResponse } from "~/types/order";

export const useOrderApi = () => {
  const { baseURL, getHeaders } = useApiBase();

  /**
   * Get user's orders
   */
  const getOrders = async (params?: {
    per_page?: number;
    status?: string;
    search?: string;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.per_page)
        queryParams.append("per_page", params.per_page.toString());
      if (params?.status) queryParams.append("status", params.status);
      if (params?.search) queryParams.append("search", params.search);

      const url = `${baseURL}/orders${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
      const response = await $fetch<OrdersResponse>(url, {
        method: "GET",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  /**
   * Get single order by ID
   */
  const getOrder = async (id: number) => {
    try {
      const response = await $fetch<OrderResponse>(`${baseURL}/orders/${id}`, {
        method: "GET",
        headers: getHeaders(),
      });
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  /**
   * Get order by order number
   */
  const getOrderByOrderNumber = async (orderNumber: string) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/order-number/${orderNumber}`,
        {
          method: "GET",
          headers: getHeaders(),
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  /**
   * Cancel order (for PENDING orders only)
   */
  const cancelOrder = async (id: number) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/${id}/cancel`,
        {
          method: "POST",
          headers: getHeaders(),
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  /**
   * complete order (for DELIVERED orders only)
   */
  const completeOrder = async (id: number) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/${id}/complete`,
        {
          method: "POST",
          headers: getHeaders(),
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  const checkPaymentStatus = async (id: number) => {
    try {
      const response = await $fetch<OrderResponse>(
        `${baseURL}/orders/${id}/check-payment`,
        {
          method: "POST",
          headers: getHeaders(),
        },
      );
      return { data: response, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || "An error occurred",
        },
      };
    }
  };

  return {
    getOrders,
    getOrder,
    getOrderByOrderNumber,
    cancelOrder,
    completeOrder,
    checkPaymentStatus,
  };
};
