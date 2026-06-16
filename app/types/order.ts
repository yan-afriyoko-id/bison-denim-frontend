/**
 * Order types
 */

export interface OrderShipping {
  country: string;
  first_name: string;
  last_name: string | null;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  label_place: string | null;
  note_address: string | null;
}

export interface OrderBilling {
  country: string;
  first_name: string;
  last_name: string | null;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  label_place: string | null;
  note_address: string | null;
}

export interface OrderCourier {
  agent: string | null;
  service: string | null;
  service_desc: string | null;
  estimate_delivered: string | null;
  resi_number: string | null;
  cost: number;
}

export interface OrderPayment {
  method: string | null;
  reference_code: string | null;
  snap_token: string | null;
  status: string;
}

export interface OrderItem {
  id: number;
  product_id: number | null;
  variant_id: number | null;
  product_name: string;
  product_image: string | null;
  sku: string;
  variant_description: string | null;
  qty: number;
  actual_price: number;
  discount_price: number | null;
  purchase_price: number;
  product_protection_percent: number | 0;
  product_protection_amount: number | null;
  subtotal: number;
  note: string | null;
  review_id: number | null;
  review?: {
    id: number;
    rating: number;
    comment: string | null;
    created_at: string;
    can_edit: boolean;
  } | null;
}

export interface Order {
  id: number;
  uuid: string;
  queue_number: number | null;
  order_number: string;
  contact_email: string;
  contact_phone: string;
  shipping: OrderShipping;
  billing: OrderBilling;
  courier: OrderCourier;
  payment: OrderPayment;
  subtotal: number;
  discount_amount: number;
  product_protection_amount: number | null;
  shipping_cost: number;
  total_amount: number;
  invoice_note: string | null;
  delivery_order_note: string | null;
  status:
    | "PENDING"
    | "PACKING"
    | "DELIVERING"
    | "DELIVERED"
    | "COMPLETED"
    | "CANCELLED";
  user?: {
    id: number;
    name: string;
    email: string;
  };
  order_items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
  };
}
