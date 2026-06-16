export interface UserPoint {
  id: number
  user_id: number
  points: number
  earned_points: number
  used_points: number
  cumulative_total: number
  minimum_usable_points: number
  is_active: boolean
  can_use_points: boolean
  created_at: string
  updated_at: string
}

export interface UserPointTransaction {
  id: number
  user_id: number
  order_id: number | null
  transaction_type: 'EARNED' | 'USED' | 'EXPIRED' | 'ADJUSTMENT'
  points: number
  description: string | null
  reference_id: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

export interface PointResponse {
  success: boolean
  message: string
  data: UserPoint
}

export interface PointTransactionsResponse {
  success: boolean
  message: string
  data: {
    transactions: UserPointTransaction[]
    pagination: {
      current_page: number
      last_page: number
      per_page: number
      total: number
    }
  }
}

