/**
 * Checkout API composable
 * Handles checkout-related API calls
 */
import type { CheckoutPayload, CheckoutResponse } from '~/types/checkout'

export const useCheckoutApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  /**
   * Create order from checkout
   */
  const createOrder = async (payload: CheckoutPayload) => {
    try {
      const response = await $fetch<CheckoutResponse>(`${baseURL}/checkout/create`, {
        method: 'POST',
        body: {
          data: payload,
        },
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  /**
   * Update order payment status
   */
  const updateOrderPaymentStatus = async (orderId: number, paymentStatus: string, paymentMethod?: string, paymentReferenceCode?: string) => {
    try {
      // Build body, only include fields that are provided
      const body: Record<string, any> = {
        payment_status: paymentStatus,
      }
      
      if (paymentMethod !== undefined && paymentMethod !== null) {
        body.payment_method = paymentMethod
      }
      
      if (paymentReferenceCode !== undefined && paymentReferenceCode !== null) {
        body.payment_reference_code = paymentReferenceCode
      }
      
      const response = await $fetch<CheckoutResponse>(`${baseURL}/orders/${orderId}/payment-status`, {
        method: 'PUT',
        body,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      return {
        data: null,
        error: error.data || {
          message: error.message || 'An error occurred',
        },
      }
    }
  }

  return {
    createOrder,
    updateOrderPaymentStatus,
  }
}


