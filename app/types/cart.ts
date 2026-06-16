/**
 * Cart types
 */

export interface CartItem {
  variant_id: number;
  qty: number;
  note?: string | null;
  store_id?: number | null;
  is_protected?: boolean;
}

export interface CartItemResponse {
  variant_id: number;
  product_id: number | null;
  product_slug: string | null;
  product_name: string;
  variant_name: string;
  variant_description: string;
  sku: string;
  image: string | null;
  qty: number;
  actual_price: number;
  discount_price: number;
  purchase_price: number;
  product_protection_percent: number;
  sub_total: number;
  weight: number;
  is_freeshiping: "ACTIVE" | "INACTIVE";
  note: string | null;
  in_stock: boolean;
  available_stock: number;
  store?: {
    id: number;
    name: string;
    city_id: number | null;
    city: string | null;
    province: string | null;
  } | null;
}

export interface CartCalculation {
  sub_total: number;
  total_cart: number;
  total_weight: number;
  discount?: number;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cart: CartItemResponse[];
    out_of_stock: CartItemResponse[];
    calculation: CartCalculation;
  };
}
