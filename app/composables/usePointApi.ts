import type { PointResponse, PointTransactionsResponse } from '~/types/point'

export const usePointApi = () => {
  const { baseURL, getHeaders } = useApiBase()

  /**
   * Get user's point balance
   */
  const getPoints = async () => {
    try {
      const response = await $fetch<PointResponse>(`${baseURL}/points`, {
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
   * Get user's point transaction history
   */
  const getPointTransactions = async (params?: {
    per_page?: number
    transaction_type?: 'EARNED' | 'USED' | 'EXPIRED' | 'ADJUSTMENT'
  }) => {
    try {
      const queryParams = new URLSearchParams()
      if (params?.per_page) {
        queryParams.append('per_page', params.per_page.toString())
      }
      if (params?.transaction_type) {
        queryParams.append('transaction_type', params.transaction_type)
      }

      const url = `${baseURL}/points/transactions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
      const response = await $fetch<PointTransactionsResponse>(url, {
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

  return {
    getPoints,
    getPointTransactions,
  }
}

