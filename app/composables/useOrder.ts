/**
 * Order composable
 * Manages order state and operations
 */
import { useOrderApi } from './useOrderApi'
import type { Order } from '~/types/order'

export const useOrder = () => {
  const { getOrders, getOrder, getOrderByOrderNumber } = useOrderApi()

  const orders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const isLoading = ref(false)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  })

  /**
   * Fetch user's orders
   */
  const fetchOrders = async (params?: {
    per_page?: number
    status?: string
    search?: string
  }) => {
    isLoading.value = true
    try {
      const { data, error } = await getOrders(params)

      if (error || !data?.success) {
        isLoading.value = false
        return { success: false, error }
      }

      orders.value = data.data.orders || []
      pagination.value = data.data.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
      }

      isLoading.value = false
      return { success: true, data: data.data }
    } catch (error) {
      isLoading.value = false
      return { success: false, error }
    }
  }

  /**
   * Fetch single order by ID
   */
  const fetchOrder = async (id: number) => {
    isLoading.value = true
    try {
      const { data, error } = await getOrder(id)

      if (error || !data?.success) {
        isLoading.value = false
        return { success: false, error }
      }

      currentOrder.value = data.data.order
      isLoading.value = false
      return { success: true, data: data.data.order }
    } catch (error) {
      isLoading.value = false
      return { success: false, error }
    }
  }

  /**
   * Fetch order by order number
   */
  const fetchOrderByOrderNumber = async (orderNumber: string) => {
    isLoading.value = true
    try {
      const { data, error } = await getOrderByOrderNumber(orderNumber)

      if (error || !data?.success) {
        isLoading.value = false
        return { success: false, error }
      }

      currentOrder.value = data.data.order
      isLoading.value = false
      return { success: true, data: data.data.order }
    } catch (error) {
      isLoading.value = false
      return { success: false, error }
    }
  }

  /**
   * Get orders by status
   */
  const getOrdersByStatus = (status: string) => {
    return orders.value.filter(order => {
      if (status === 'unpaid') {
        return order.payment.status === 'PENDING'
      } else if (status === 'paid') {
        return order.payment.status === 'PAID'
      }
      return order.status === status
    })
  }

  /**
   * Format order status
   */
  const formatOrderStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Menunggu Pembayaran',
      PACKING: 'Dikemas',
      DELIVERING: 'Sedang Dikirim',
      DELIVERED: 'Telah Diterima',
      COMPLETED: 'Selesai',
      CANCELLED: 'Dibatalkan',
    }
    return statusMap[status] || status
  }

  /**
   * Format payment status
   */
  const formatPaymentStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: 'Menunggu Pembayaran',
      PAID: 'Sudah Dibayar',
      FAILED: 'Dibatalkan',
      CANCELLED: 'Dibatalkan',
      REFUNDED: 'Dikembalikan',
    }
    return statusMap[status] || status
  }

  return {
    orders: readonly(orders),
    currentOrder: readonly(currentOrder),
    isLoading: readonly(isLoading),
    pagination: readonly(pagination),
    fetchOrders,
    fetchOrder,
    fetchOrderByOrderNumber,
    getOrdersByStatus,
    formatOrderStatus,
    formatPaymentStatus,
  }
}
