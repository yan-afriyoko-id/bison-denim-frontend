/**
 * Shipping Address API composable
 * Handles shipping address-related API calls
 */
import type { ShippingAddress } from '~/types/checkout'

export interface ShippingAddressResponse {
  id: number
  user_id: number
  first_name: string
  last_name: string | null
  phone: string
  email: string | null
  label_place: string | null
  address: string
  city: string
  province: string
  postal_code: string
  note_address: string | null
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface ShippingAddressPayload {
  first_name: string
  last_name?: string | null
  phone: string
  email?: string | null
  label_place?: string | null
  address: string
  city: string
  province: string
  postal_code: string
  note_address?: string | null
  is_primary?: boolean
}

export const useShippingAddressApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  /**
   * Get all shipping addresses for authenticated user
   */
  const getAddresses = async () => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data: ShippingAddressResponse[]
      }>(`${baseURL}/shipping-addresses`, {
        method: 'GET',
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
   * Get a specific shipping address
   */
  const getAddress = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
        data: ShippingAddressResponse
      }>(`${baseURL}/shipping-addresses/${id}`, {
        method: 'GET',
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
   * Create a new shipping address
   */
  const createAddress = async (payload: ShippingAddressPayload) => {
    try {
      const url = `${baseURL}/shipping-addresses`
      const response = await $fetch<{
        success: boolean
        message: string
        data: ShippingAddressResponse
      }>(url, {
        method: 'POST',
        body: payload,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || error?.statusMessage || 'An error occurred'
      const errorData = error?.data || {}
      
      return {
        data: null,
        error: {
          message: errorMessage,
          errors: errorData.errors || {},
        },
      }
    }
  }

  /**
   * Update a shipping address
   */
  const updateAddress = async (id: number, payload: Partial<ShippingAddressPayload>) => {
    try {
      const url = `${baseURL}/shipping-addresses/${id}`
      const response = await $fetch<{
        success: boolean
        message: string
        data: ShippingAddressResponse
      }>(url, {
        method: 'PUT',
        body: payload,
        headers: getHeaders(),
      })
      return { data: response, error: null }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || error?.statusMessage || 'An error occurred'
      const errorData = error?.data || {}
      
      return {
        data: null,
        error: {
          message: errorMessage,
          errors: errorData.errors || {},
        },
      }
    }
  }

  /**
   * Delete a shipping address
   */
  const deleteAddress = async (id: number) => {
    try {
      const response = await $fetch<{
        success: boolean
        message: string
      }>(`${baseURL}/shipping-addresses/${id}`, {
        method: 'DELETE',
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
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
  }
}

