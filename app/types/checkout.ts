/**
 * Checkout types
 */

export interface ShippingAddress {
  first_name: string;
  last_name?: string | null;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  label_place?: string | null;
  note_address?: string | null;
}

export interface BillingAddress extends ShippingAddress {
  same_as_shipping?: boolean;
}

export interface CourierInfo {
  agent: string;
  service: string;
  service_desc?: string | null;
  etd?: string | null;
  cost: number;
}

export interface CheckoutProduct {
  variant_id: number;
  qty: number;
  note?: string | null;
}

export interface CheckoutPayload {
  shipping: ShippingAddress;
  billing?: BillingAddress;
  courier: CourierInfo;
  products: CheckoutProduct[];
  payment_method?: string | null;
  voucher_id?: number | null;
  voucher_discount?: number;
  invoice_note?: string | null;
  delivery_order_note?: string | null;
}

export interface Order {
  id: number;
  uuid: string;
  order_number: string;
  contact_email: string;
  contact_phone: string;
  shipping_first_name: string;
  shipping_last_name: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_province: string;
  shipping_postal_code: string;
  courier_agent: string | null;
  courier_agent_service: string | null;
  courier_cost: number;
  payment_method: string | null;
  payment_status: string;
  status: string;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
  };
}
